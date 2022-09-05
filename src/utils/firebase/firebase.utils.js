import { initializeApp } from 'firebase/app';

import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDqI4zN87alJk2FFwKy1X8RLTwwVhfWN5U",
    authDomain: "crwn-colthing.firebaseapp.com",
    projectId: "crwn-colthing",
    storageBucket: "crwn-colthing.appspot.com",
    messagingSenderId: "1002132446735",
    appId: "1:1002132446735:web:9d768747df947763d8cd7a"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, addtionalInformation = {} ) => {
    if(!userAuth) return;
    
    const userDocRef = doc(db, 'users', userAuth.uid);


    const userSnapshot = await getDoc(userDocRef);
   
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
    
        try {
          await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
            ...additionalInformation,
          });
        } catch (error) {
          console.log('error creating the user', error.message);
        }
      }
    
      return userDocRef;
    };
    
    export const createAuthUserWithEmailAndPassword = async (email, password) => {
      if (!email || !password) return;
    
      return await createUserWithEmailAndPassword(auth, email, password);
    };
   