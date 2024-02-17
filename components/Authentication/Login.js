import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/styles';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';
import { Link } from '@react-navigation/native';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password);
    setPassword(""); setEmail("");
    navigation.navigate("Home")
  };

  useEffect(() => {
  }, [])

  return (
    <View style={styles.registerContainer}>
      <Text style={styles.heading}>Login</Text>
      <View style={styles.form}>
        <View style={styles.formGroup}>
          <Text>Email address</Text>
          <TextInput
            style={styles.formControl}
            placeholder="Enter email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text>Password</Text>
          <TextInput
            style={styles.formControl}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.authFormText}>No Account yet? <Link style={styles.anchor} to={"/Register"}>Register</Link></Text>
      </View>
    </View>
  );
};

export default Login;
