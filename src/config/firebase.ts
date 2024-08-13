// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArDjEPKQKi5cqnEK7DNhKHiaOGlJUaQXo",
  authDomain: "chat-app-22259.firebaseapp.com",
  projectId: "chat-app-22259",
  storageBucket: "chat-app-22259.appspot.com",
  messagingSenderId: "22560016322",
  appId: "1:22560016322:web:67f12c7a77a12dc6d3385b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const signup = async(username:string,email:string,password:string)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password)
        const user = res.user
    } catch (error) {
        
    }
}