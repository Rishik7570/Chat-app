// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { toast } from "react-toastify";
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
        await setDoc(doc(db,"users",user.uid),{
          id:user.uid,
          username:username.toLowerCase(),
          email,
          name:"",
          avatar:"",
          bio:"Hey there, I am using Chatapp",
          lastseen:Date.now()
        })
        await setDoc(doc(db,'chats',user.uid),{
          chatsdata:[]
        })
    } catch (error) {
        console.error(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const login = async(email:string,password:string)=>{
    try {
      await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
      console.error(error)
      toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const logout = async()=>{
  try {
    await signOut(auth)
  } catch (error) {
    toast.error(error.code.split('/')[1].split('-').join(" "))
  }
}

const resetpass = async(email:string)=>{
  if(!email){
    toast.error("Enter your email")
    return null
  }
  try {
    const userRef = collection(db,"users")
    const q = query(userRef,where("email","==",email))
    const querySnap = await getDocs(q)
    if(!querySnap.empty){
      await sendPasswordResetEmail(auth,email)
      toast.success("Reset Email Sent")
    }
    else{
      toast.error("Email does not exist")
    }

  } catch (error) {
    console.error(error)
  }
}

export {signup, login, logout,resetpass, auth, db}