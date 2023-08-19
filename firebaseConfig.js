import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import {
    getFirestore, collection, addDoc, setDoc, doc, query, where, orderBy, getDocs, getDoc, deleteDoc, updateDoc, serverTimestamp 
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAXF_Ir8UtixTsy0ioa0WK-qJyZX2l79ho",
    authDomain: "mini-hackathon-ba799.firebaseapp.com",
    projectId: "mini-hackathon-ba799",
    storageBucket: "mini-hackathon-ba799.appspot.com",
    messagingSenderId: "19783936855",
    appId: "1:19783936855:web:a263d637b8e58cef37ec12"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export {
    auth,
    app,
    db,
    getFirestore,
    collection,
    addDoc,
    setDoc,
    doc,
    getDoc,
    getAuth,
    createUserWithEmailAndPassword,
    query,
    where,
    getDocs,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    storage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    deleteDoc,
    updateDoc,
    orderBy,
    serverTimestamp,
};