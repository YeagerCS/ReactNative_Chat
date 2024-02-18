import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Modal, Touchable } from 'react-native';
import { collection, addDoc, getDocs, query, where, updateDoc, arrayUnion, onSnapshot } from 'firebase/firestore';
import { auth, firestore } from '../Firebase';
import { PREFIX, useAuth } from '../../hooks/FirebaseUser/useAuth';
import { signOut } from 'firebase/auth';
import uuid from "react-native-uuid"
import * as SecureStore from "expo-secure-store"
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from '../../contexts/ThemeContext';
import { dynamicStyles } from '../../styles/styles';

const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [newContactName, setNewContactName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selfContact, setSelfContact] = useState(null)
  const user = useAuth()
  const navigation = useNavigation()
  const { theme, toggleTheme } = useTheme()
  const styles = dynamicStyles(theme)

  const fetchContacts = async () => {
    if(user){
        const snapshot = await getDocs(
            query(collection(firestore, "users"), where("uid", "==", user.uid))
        )
    
        console.log(user);
    
        const newUser = snapshot.docs.map(doc => doc.data())[0];
        setContacts(newUser.contacts)
    }
  };

  const getSelfUser = async () => {
    const ownUserSnapShpt = await getDocs(
        query(collection(firestore, "users"), where("uid", "==", user.uid))
    )
    const ownUserContact = ownUserSnapShpt.docs.map(doc => doc.data())[0];
    setSelfContact(ownUserContact)
  }

  useEffect(() => {
    if(!user){
        navigation.navigate("Login")
        return;
    }
    fetchContacts();
  }, [user]);

  useEffect(() => {
    if(user){
        getSelfUser();
    }
  }, [])

  useEffect(() => {
    if(user){
        try{
            const q = query(collection(firestore, "users"), where("uid", "==", user.uid))

            const unsub = onSnapshot(q, async snapshot => {
                const data = snapshot.docs.map(doc => doc.data())[0]
                setContacts(data.contacts)
            })
            return () => unsub();
        } catch(e){
            console.log(e);
        }
    }
  }, [user])

  const openModal = () => {
    setModalVisible(true)
  };

  const createChat = async (contact) => {
    const userSnapshot = await getDocs(
      query(collection(firestore, "users"), where("phn", "==", contact.phn))
    )
    const userContact = userSnapshot.docs.map(doc => doc.data())[0]
   
  
    const contactExists = userSnapshot.docs.some(doc => {
      const userData = doc.data();
      return userData.contacts.some(c => c.chatId === contact.chatId);
    });
  
    if (!contactExists) {
      userSnapshot.docs.forEach(async doc => {
        await updateDoc(doc.ref, {
          contacts: arrayUnion({
            name: selfContact.displayName,
            phn: selfContact.phn,
            id: uuid.v4(),
            chatId: contact.chatId
          })
        })
      });
  
    } 
    navigation.navigate("Chat", { chatId: contact.chatId, contact: contact, contactUid: userContact.uid })
  }
  

  const addContact = async () => {
    const snapshot = await getDocs(
        query(collection(firestore, "users"), where("uid", "==", user.uid))
    )

    const chatId = uuid.v4();


    snapshot.docs.forEach(async doc => {
        await updateDoc(doc.ref, {
            contacts: arrayUnion({
                name: newContactName,
                phn: newPhoneNumber,
                id: uuid.v4(),
                chatId: chatId
            })
        })
    })

    const userSnapshot = await getDocs(
        query(collection(firestore, "users"), where("phn", "==", newPhoneNumber))
    )
    const userContact = userSnapshot.docs.map(doc => doc.data())[0]

    console.log(userContact);

    await addDoc(collection(firestore, "chats"),{
        id: chatId,
        members: [user.uid, userContact.uid],
        messages: []
    })

    setModalVisible(false)
  }

  const handleLogout = async () => {
    await signOut(auth)
    await SecureStore.deleteItemAsync(PREFIX + "user");

    navigation.navigate("Login")
  }

  return (
    <>
        <View style={{...styles.header, paddingBottom: 15}}>
            <View>
                <Text style={styles.headerText}>Contacts</Text>
                <Text style={styles.contactPhn}>{selfContact && selfContact.phn}</Text>
            </View>
            <View style={{display: 'flex', flexDirection: "row", gap: 25}}>
                <TouchableOpacity onPress={toggleTheme}>
                    <Text style={styles.headerText}>{theme.symbol}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={openModal}>
                    <Text style={{...styles.headerText, fontSize: 25}}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout} style={{...styles.sendButton, padding: 5}}>
                        <Text style={styles.sendButtonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
        <ScrollView style={styles.contactScrollView}>
            {contacts && contacts.map(contact => (
                <TouchableOpacity key={contact.id} onPress={() => createChat(contact)}>
                    <View style={styles.contactItem}>
                        <Text style={styles.contactText}>{contact.name}</Text>
                        <Text style={styles.contactPhn}>{contact.phn}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>

        <Modal animationType="slide" transparent={true} visible={isModalVisible}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalText}>Add Contact</Text>

                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>&times;</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={{color: theme.color}}>Contact Name</Text>
                        <TextInput
                            placeholder="Enter contact name"
                            value={newContactName}
                            onChangeText={(text) => setNewContactName(text)}
                            placeholderTextColor={theme.transparentColor}
                            style={styles.modalInput}
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={{color: theme.color}}>Phone Number</Text>
                        <TextInput
                            placeholder="Enter phone number"
                            value={newPhoneNumber}
                            onChangeText={(text) => setNewPhoneNumber(text)}
                            placeholderTextColor={theme.transparentColor}
                            style={styles.modalInput}
                        />
                    </View>
                    <TouchableOpacity onPress={addContact} style={styles.sendButton}>
                        <Text style={styles.sendButtonText}>Add Contact</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    </>
  );
};

export default Dashboard;
