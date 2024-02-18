import React, { useRef, useEffect, useState } from 'react';
import { View, ScrollView, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import { addDoc, arrayUnion, collection, getDocs, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { styles } from '../../styles/styles';
import { firestore } from '../Firebase';
import { useAuth } from '../../hooks/FirebaseUser/useAuth';
import uuid from "react-native-uuid"
import { useRoute } from '@react-navigation/native';

const Chat = ({ navigation }) => {
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [usernames, setUsernames] = useState({})
  const user = useAuth();

  const route = useRoute()
  const { chatId, contact, contactUid } = route.params;

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollToEnd({animated: true})
    }
  };

  const getUserById = async (uid) => {
    const snapshot = await getDocs(
        query(collection(firestore, "users"), where("uid", "==", uid))
    )

    const user = snapshot.docs.map(doc => doc.data())[0]
    return user.displayName ?? ""
  }

  useEffect(() => {
    if(!user){
        navigation.navigate("Login")
    }
  }, [user])

  useEffect(() => {
    if(chatId){
        try{
            const q = query(
                collection(firestore, "chats"),
                where("id", "==", chatId),
            );
        
            console.log(contact);
            const unsub = onSnapshot(q, async snapshot => {
                const data = snapshot.docs.map(doc => doc.data())[0]
                if(data){
                    const messages = data.messages ?? [];
                    const sortedMessages = messages.sort((a, b) => a.date - b.date)
                    setMessages(sortedMessages ?? [])
            
                    // const userPromises = data.map(async message => {
                    //     if(!usernames[message.uid]){
                    //         const username = await getUserById(message.uid);
                    //         setUsernames(prevUsernames => ({...prevUsernames, [message.uid]: username}))
                    //     }
                    // })
            
                    // await Promise.all(userPromises);
                }
            })
            scrollToBottom();
            return () => unsub();
        } catch(e){

        }
    }
  }, [chatId])

  const sendMessage = async () => {
    if(newMessage.trim() !== ""){
        setNewMessage('');

        const chatSnapshot = await getDocs(
            query(collection(firestore, "chats"), where("id", "==", chatId))
        )

        chatSnapshot.docs.forEach(async doc => {
            await updateDoc(doc.ref, {
                messages: arrayUnion({
                    id: uuid.v4(),
                    text: newMessage,
                    sender: user.uid,
                    recipient: contactUid,
                    date: new Date()
                })
            })
        })
    }
  };

  if(user){
    return (
        <>
            <View style={styles.header}>
                <Text style={styles.headerText}>{contact && contact.name}</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.chatContainer}>
                    <ScrollView style={{padding:10}} ref={messagesEndRef}>
                        {messages && messages.map((message) => (
                        <View key={message.id} style={{ flexDirection: 'column', alignItems: user.uid === message.sender ? 'flex-end' : 'flex-start', marginBottom: 10 }}>
                            <Text>{user.uid === message.sender ? "You" : contact.name}</Text>
                            <View style={{ backgroundColor: user.uid === message.sender ? '#2ecc71' : '#3498db', borderRadius: 10, padding: 10, maxWidth: '70%' }}>
                            <Text>{message.text}</Text>
                            </View>
                        </View>
                        ))}
                    </ScrollView>
                    <View style={{flexDirection: 'row', alignItems: 'center', padding: 10, gap: 5, width: '100%' }}>
                        <TextInput
                        placeholder="Type your message..."
                        value={newMessage}
                        onChangeText={(text) => setNewMessage(text)}
                        style={{...styles.formControl, flex: 1}}
                        onPressIn={scrollToBottom}
                        />
                        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                            <Text style={styles.sendButtonText}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    );
  }

  return (
    <View>
        <Text>Here</Text>
    </View>
  )
};

export default Chat;
