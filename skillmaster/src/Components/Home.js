
import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'

import '../Components/home.css'
import signInWithGoogle  from "../providers/UserProvider";
import firebase from "firebase/app";
import Footer from "../Components/footer"
import Creator from "../Components/creator"
import { auth } from "../firebase"

import { UserContext } from "../providers/UserProvider";
import Features from "../Components/features"





function Home() {    
const provider = new firebase.auth.GoogleAuthProvider();

  
    
  const user = useContext(UserContext);

  
console.log(user)
  if(user!=null){
    return (
        <>
        <section className=" mt-5 ">
            <div className="row justify-content-center">

            <div className="mainSec ">

            <div>
                <img src={user.photoURL}></img>
                </div>
                
            </div>

            </div>
            <div className="mt-4 row justify-content-center">
            <Link to='/Instructions' className="btn effect01" ><span>Hey {user.displayName} Let's Start our Quest</span>
                </Link>


            {/* <Link to='/ProfilePage' className="btn effect01" ><span>ProfilePage</span>
                </Link>      */}          
        </div>
            <div className="whitefont mt-4 row justify-content-center">
              Helllo {user.displayName}, 
            </div>
            <Features/>
            <Creator/>
        
          </section>
          
        <Link to='/ProfilePage' className="mx-5 px-5 btn effect01 my-4" ><span>Profile</span></Link> 
          <Footer/>
        </>
    )
}
else{

  return <Redirect to="/LoginCSI" />
}}

export default Home
