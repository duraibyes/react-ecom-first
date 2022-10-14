import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    signInWithRedirect,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

import { getFirestore, doc, getDoc,setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBUtr4ROgC_kQFgE80symWdfpwmKyW1ve0",
  authDomain: "bytesdb-react.firebaseapp.com",
  projectId: "bytesdb-react",
  storageBucket: "bytesdb-react.appspot.com",
  messagingSenderId: "909188084484",
  appId: "1:909188084484:web:3ce460c786b6bdd9575651"
};

const fireBaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt : 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth, additionalInformation = {}) => {
  if( !userAuth ) return;

  const userDocRef = doc(db,'users', userAuth.uid);
  const userSnapshot  = await getDoc(userDocRef);
 
  if( !userSnapshot.exists()) {
    const { displayName, email, phoneNumber, photoURL } = userAuth;
    const createAt = new Date();

    try {
      
      await setDoc( userDocRef, {
        displayName,
        email,
        phoneNumber,
        photoURL,
        createAt,
        ...additionalInformation
      });

    } catch (error) {
      console.log( 'error creating the user', error.message );
    }
  }
  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if( !email || !password) return;

  return createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthWithEmailAndPassword = async (email, password) => {
  if( !email || !password) return;

  return signInWithEmailAndPassword(auth, email, password);
}

export const authSignOut = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};