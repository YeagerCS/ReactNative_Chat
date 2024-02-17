import { getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react"
import { auth } from "../../components/Firebase";
import * as SecureStore from "expo-secure-store"
export const PREFIX = "the-v-chat-"

export const useAuth = () => {
    const [user, setUser] = useState(() => {
        const storedUser = SecureStore.getItem(PREFIX + "user")
        return storedUser ? JSON.parse(storedUser) : null;
    })

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            if(user){
                SecureStore.setItem(PREFIX + "user", JSON.stringify(user))
                setUser(user)
            } else{
                await SecureStore.deleteItemAsync(PREFIX + "user");
                setUser(null)
            }
        })

        return () => unsub();
    }, [])

    return user;
}