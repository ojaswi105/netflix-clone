// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdKIQGguxpDJe-earMeAmGJA18z1tw_JE",
  authDomain: "netflix-e5c07.firebaseapp.com",
  projectId: "netflix-e5c07",
  storageBucket: "netflix-e5c07.firebasestorage.app",
  messagingSenderId: "367689123693",
  appId: "1:367689123693:web:992980a9cdb9e505da7c64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth(app)
const db=getFirestore(app)


const signup= async(name,email,password)=>{
          try{
                const res=await createUserWithEmailAndPassword(auth,email,password)
                const user=res.user;
                await addDoc(collection(db,"user"),{
                    uid:user.uid,
                    name,
                    authProvider:"local",
                    email,
                })
            }
          catch(err){
             console.log(err)
             //alert(err.code)
             toast.error(err.code)
          }
}

const login=async(email,password)=>{
      try{
         await signInWithEmailAndPassword(auth, email, password)
      }
      catch(err){
          console.log(err)
         //alert(err.code)
          toast.error(err.code)
      }
}

const logout=()=>{
    signOut(auth)
}

export {auth,db,login,signup,logout};