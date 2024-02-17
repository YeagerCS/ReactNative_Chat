import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Modal, Touchable } from 'react-native';
import { collection, addDoc, getDocs, query, where, updateDoc, arrayUnion } from 'firebase/firestore';
import { auth, firestore } from '../Firebase';
import { styles } from '../../styles/styles';
import { useAuth } from '../../hooks/FirebaseUser/useAuth';
import { signOut } from 'firebase/auth';
import uuid from "react-native-uuid"
import * as SecureStore from "expo-secure-store"
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [newContactName, setNewContactName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const user = useAuth()

  const fetchContacts = async () => {
    const snapshot = await getDocs(
        query(collection(firestore, "users"), where("uid", "==", user.uid))
    )

    console.log(user);

    const newUser = snapshot.docs.map(doc => doc.data())[0];
    setContacts(newUser.contacts)
  };

  useEffect(() => {
    if(!user){
        navigation.navigate("Login")
    }
    fetchContacts();
  }, [user]);

  const openModal = () => {
    setModalVisible(true)
  };

  const createChat = async (contact) => {
    const userSnapshot = await getDocs(
        query(collection(firestore, "users"), where("phn", "==", contact.phn))
    )
    const userContact = userSnapshot.docs.map(doc => doc.data())[0]
    const ownUserSnapShpt = await getDocs(
        query(collection(firestore, "users"), where("uid", "==", user.uid))
    )
    const ownUserContact = ownUserSnapShpt.docs.map(doc => doc.data())[0];


    userSnapshot.docs.forEach(async doc => {
        await updateDoc(doc.ref, {
            contacts: arrayUnion({
                name: ownUserContact.displayName,
                phn: ownUserContact.phn,
                id: uuid.v4()
            })
        })
    })

    const chatId = uuid.v4();

    await addDoc(collection(firestore, "chats", {
        id: chatId,
        members: [user.uid, userContact.uid],
        messages: []
    }))

    const navigation = useNavigation()
    navigation.navigate("Chat", { chatId: chatId, contact: userContact })
  }

  const addContact = async () => {
    const snapshot = await getDocs(
        query(collection(firestore, "users"), where("uid", "==", user.uid))
    )

    snapshot.docs.forEach(async doc => {
        await updateDoc(doc.ref, {
            contacts: arrayUnion({
                name: newContactName,
                phn: newPhoneNumber,
                id: uuid.v4()
            })
        })
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
            <Text style={styles.headerText}>Contacts</Text>
            <View style={{display: 'flex', flexDirection: "row"}}>
                <TouchableOpacity style={{width: 40, height: 40}} onPress={openModal}>
                    <Text style={{...styles.headerText, fontSize: 25}}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerButton} onPress={handleLogout}>
                    <Text style={{color: 'white'}}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View>
            {contacts && contacts.map(contact => (
                <TouchableOpacity key={contact.id}>
                    <View style={styles.contactItem}>
                        <Text style={styles.contactText}>{contact.name}</Text>
                        <Text style={styles.contactPhn}>{contact.phn}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>

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
                        <Text>Contact Name</Text>
                        <TextInput
                            placeholder="Enter contact name"
                            value={newContactName}
                            onChangeText={(text) => setNewContactName(text)}
                            style={styles.modalInput}
                        />
                    </View>
                    <View style={styles.formGroup}>
                        <Text>Phone Number</Text>
                        <TextInput
                            placeholder="Enter phone number"
                            value={newPhoneNumber}
                            onChangeText={(text) => setNewPhoneNumber(text)}
                            style={styles.modalInput}
                        />
                    </View>
                    <Button title="Add Contact" onPress={addContact}/>
                </View>
            </View>
        </Modal>
    </>
  );
};

export default Dashboard;
