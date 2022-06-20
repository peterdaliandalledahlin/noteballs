import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../js/firebase'
import { useStoreNotes } from './storeNotes'
 
export const useStoreAuth = defineStore('storeAuth', {
    state: () => {
        return {
            user: {}
        }
    },
    actions: {
        init() {
            const storeNotes = useStoreNotes()

            onAuthStateChanged(auth, (user) => {
                if (user) {
                  //console.log(user)
                  //const uid = user.uid
                  this.user.id = user.uid
                  this.user.email = user.email
                  this.router.push('/')
                  storeNotes.init()
                } else {
                    this.user = {}
                    this.router.replace('/auth')
                    storeNotes.clearNotes()
                    //console.log('user logged out', user)
                }
              })
        },
        registerUser (credentials) {
            createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
            .then((userCredential) => {
                
                const user = userCredential.user
                //console.log(user)
                
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log(errorCode, errorMessage)
                
            })
        },
        loginUser(credentials) {
            signInWithEmailAndPassword(auth, credentials.email, credentials.password)
                .then((userCredential) => {
                    const user = userCredential.user
                    //console.log(user)
                })
                .catch((error) => {
                    const errorCode = error.code
                    const errorMessage = error.message
                    console.log(errorCode, errorMessage)
            });
        },
        logoutUser() {
            signOut(auth).then(() => {
                //console.log('User signed out')
              }).catch((error) => {
                console.log(error.message)
              })
        },
        
    }
})