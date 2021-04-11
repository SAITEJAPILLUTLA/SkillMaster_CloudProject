import React from 'react'
import { useContext } from 'react';
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import '../Components/home.css'
import signInWithGoogle  from "../providers/UserProvider";

import firebase from "firebase/app";
import auth from "../firebase.js"
import "../Components/home.css"
import { UserContext } from "../providers/UserProvider";
function LoginCSI() {
const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();
 const firestore = firebase.firestore();
    const InWithGoogle = () => {
        auth.signInWithPopup(provider).then(()=>{
          auth.onAuthStateChanged(userAuth => {
            firebase.database().ref('/users/'+userAuth.uid+'/').update({
                name : userAuth.displayName,
                email : userAuth.email,
                profileImageURL :userAuth.photoURL,
                lastLogin :Date.now()
            })
          })
        });
        
      };


    
const user = useContext(UserContext);
console.log(user)
if(user!=null){
    
  return <Redirect to="/" />
}
else{
    return (
        <>
        <section className=" mt-5 ">
            <div className="row justify-content-center">

   <div className="mainSec">
                

                <div className="w-11/12 dog">
                  
                </div>
            </div>
            </div>
            <div className="mt-4 pt-4 row justify-content-center">
            <Link to='/' className="btn effect01" onClick={InWithGoogle}><span>SignIn with Google</span>
                </Link>     
               
                    
        </div>
        
          </section>
       
       
       
       
        </>
    )}
}

export default LoginCSI
