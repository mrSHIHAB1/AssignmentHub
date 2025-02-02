import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged,updateProfile, signInWithEmailAndPassword, signOut } from "firebase/auth";
import axios from 'axios';
import app from "../firebase/firebase.config.js"

export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading,setloading]=useState(true)
    console.log(user)

    const createUser = (email, password) => {
        setloading(true)

        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setloading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }
    const logout=()=>{
        setUser(null);
    signOut(auth);
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                setloading(false)
                
            } 
        });

    }, [])

    const updateUserProfile = (name, image,email) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image,
            email:email
        })

    }
    const authinfo = {
        createUser,
        signIn,
        updateUserProfile,
        user,
        logout,
        setUser,
        loading

    }

    return (
        <AuthContext.Provider value={authinfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;