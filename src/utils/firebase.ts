import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'

var config = {
  apiKey: 'AIzaSyBisQPkvD8HYLmd5BKnkx1XUlUAuQjPxvc',
  authDomain: 'rock-finance.firebaseapp.com',
  projectId: 'rock-finance',
  storageBucket: 'rock-finance.appspot.com',
  messagingSenderId: '503288009',
  appId: '1:503288009:web:e6299da78dd8d6a3c6bd18',
  measurementId: 'G-KH1LPKFJEZ',
}

firebase.initializeApp(config)

export const firebaseAuth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => firebaseAuth.signInWithPopup(provider)

export default firebase
