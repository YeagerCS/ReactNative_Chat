import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'

const firebaseConfig = {
  apiKey: "AIzaSyAksjtjdf4qEoI9fhHsl9EqNfK4ZxQ9VHk",
  authDomain: "blazorchat-6facb.firebaseapp.com",
  databaseURL: "https://blazorchat-6facb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "blazorchat-6facb",
  storageBucket: "blazorchat-6facb.appspot.com",
  messagingSenderId: "827600669803",
  appId: "1:827600669803:web:902d2203ad8de7387a752e"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})
const firestore = getFirestore(app)

export { auth, firestore }