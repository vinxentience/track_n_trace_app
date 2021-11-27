import React from 'react'
import firebase from 'firebase/app'
import { auth } from '../../firebase'
import { useHistory } from 'react-router-dom'
export default function Redirector() {
    const db = firebase.firestore()
    const userUid = auth.currentUser.uid
    const history = useHistory()
    let userRef = db.collection('users')
    
    userRef.where('user_id', '==', userUid).get().then(snapshot => {
        if(snapshot.empty){
            console.log('No matching documents')
            return
        }
        snapshot.forEach(doc => {
            // console.log(doc.id, '=>', doc.data().user_id)
            if(doc.data().role === "Individual"){
                history.push('/individual/dashboard')
            } else if(doc.data().role === "Establishment"){
                history.push('/establishment/dashboard')
            } else {
                history.push('/login')
            }
        })
    }).catch(err => {
        console.log('Error getting documents. ' + err)
    })
    
    return (
        <div>
            
        </div>
    )
}
