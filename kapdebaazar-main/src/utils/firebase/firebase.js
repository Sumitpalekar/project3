// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_KrEpEcYWQzXa1r02DcVYGfPCepMRQOI",
  authDomain: "kapde-bazaar.firebaseapp.com",
  projectId: "kapde-bazaar",
  storageBucket: "kapde-bazaar.appspot.com",
  messagingSenderId: "911909540356",
  appId: "1:911909540356:web:2d38649173d9ca30c59b51",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionkey, objectsToAdd) =>{
  const collectionRef = collection(db,collectionkey);
  const batch = writeBatch(db);
  objectsToAdd.forEach(object => {
     const docRef = doc(collectionRef,object.title.toLowerCase());
     batch.set(docRef,object);
  });

  await batch.commit();
  console.log("done");

}

export const getCategoriesAndDocuements = async () => {
    const collectionRef= collection(db,'categories');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    const cateoryMap = querySnapshot.docs.reduce((acc,docSnapshot) => {
      const {title, items} = docSnapshot.data();
      acc[title.toLowerCase()]=items;
      return acc;
    },{});
    return cateoryMap;
}

export const createUserDocumentFromAuth = async (userAuth) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userdetails = await getDoc(userDocRef);
  // if user collection does not exists
  if (!userdetails.exists()) {
    const { displayName, email } = userAuth;
    const date = new Date();
    try {
      await setDoc(userDocRef, { displayName, email, date });
    } catch (error) {
      console.log(error);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    console.log("Not enough details");
    return;
  }
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    console.log("Not enough details");
    return;
  }
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  return await signOut(auth);
};

export const onAuthStateChangedListener = (callback)=> onAuthStateChanged(auth, callback);
