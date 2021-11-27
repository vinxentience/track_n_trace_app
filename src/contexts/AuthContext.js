import firebase from 'firebase/app'
import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    

    function signupIndiv(email, password, firstName, lastName, middleName, dob, useraddress){
        const promise = auth.createUserWithEmailAndPassword(email, password).catch(error => {
            console.log("there is an error with creating an account. " + error)
        }).then(() => {
            const userUid = auth.currentUser.uid
            const db = firebase.firestore()
            db.collection('users').doc(userUid).set({
                fname: firstName,
                lname: lastName,
                mname: middleName,
                birth_date: dob,
                address: useraddress,
                user_id: userUid,
                role: "Individual"
            })
        })
        return promise
    }

    function signupEstablish(email, password, eName, eAdd){
        const promise = auth.createUserWithEmailAndPassword(email, password).catch(error => {
            console.log("there is an error with creating an account." + error)
        }).then(() => {
            const userUid = auth.currentUser.uid
            const db = firebase.firestore()

            db.collection('users').doc(userUid).set({
                estabName: eName,
                estabAddress: eAdd,
                user_id: userUid,
                role: "Establishment"
            })
        })

        
        return promise
    }

    function login(email, password){
        const promise = auth.signInWithEmailAndPassword(email, password)
        return promise
    }


    function logout(){
        return auth.signOut()
    }

    function updateEmail(email){
        return currentUser.updateEmail(email) 
    }

    function updatePassword(password){
        return currentUser.updatePassword(password)
    }

    function resetPassword(email){
        return auth.sendPasswordResetEmail(email)
    }


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)       
        })
        return unsubscribe
    }, [])
    

    const value = {
        currentUser,
        login,
        signupIndiv,
        signupEstablish,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
