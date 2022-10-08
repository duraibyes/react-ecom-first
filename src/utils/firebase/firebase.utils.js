import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    signInWithRedirect,
    GoogleAuthProvider
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

export const createUserDocumentFromAuth = async(userAuth) => {
  console.log( userAuth );
  const userDocRef = doc(db,'users', userAuth.uid);
  console.log( userDocRef );
  const userSnapshot  = await getDoc(userDocRef);
  console.log( userSnapshot );
  console.log( userSnapshot.exists() );
  if( !userSnapshot.exists()) {
    const { displayName, email, phoneNumber, photoURL } = userAuth;
    const createAt = new Date();

    try {
      
      await setDoc( userDocRef, {
        displayName,
        email,
        phoneNumber,
        photoURL,
        createAt
      });

    } catch (error) {
      console.log( 'error creating the user', error.message );
    }
  }
  return userDocRef;
}
