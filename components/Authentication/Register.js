import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, firestore } from '../Firebase';
import { addDoc, collection } from 'firebase/firestore';
import { generatePhonenumber } from '../../utils/phoneNumber';
import { Link } from '@react-navigation/native';
import { useTheme } from '../../contexts/ThemeContext';
import { dynamicStyles } from '../../styles/styles';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { theme } = useTheme()
  const styles = dynamicStyles(theme)


  const handleSubmit = async (e) => {
    e.preventDefault();
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(credential.user, { displayName: username })

    await addDoc(collection(firestore, "users"), {
        uid: credential.user.uid,
        email: email,
        displayName: username,
        phn: generatePhonenumber(),
        contacts: []
    })

    setPassword(""); setUsername(""); setEmail("");
    navigation.navigate("Home")
  };

  useEffect(() => {
  }, [])

  return (
    <View style={styles.registerContainer}>
      <Text style={styles.heading}>Register</Text>
      <View style={styles.form}>

        <View style={styles.formGroup}>
          <Text style={{color: theme.color}}>Username</Text>
          <TextInput
            style={styles.formControl}
            placeholder="Enter username"
            value={username}
            placeholderTextColor={theme.transparentColor}
            onChangeText={(text) => setUsername(text)}
          />
        </View>


        <View style={styles.formGroup}>
          <Text style={{color: theme.color}}>Email address</Text>
          <TextInput
            style={styles.formControl}
            placeholder="Enter email"
            placeholderTextColor={theme.transparentColor}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={{color: theme.color}}>Password</Text>
          <TextInput
            style={styles.formControl}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            placeholderTextColor={theme.transparentColor}
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Register</Text>
        </TouchableOpacity>
        <Text style={styles.authFormText}>Already have an account? <Link style={styles.anchor} to={"/Login"}>Login</Link></Text>
      </View>
    </View>
  );
};

export default Register;
