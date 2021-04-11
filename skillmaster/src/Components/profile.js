import React, { Component, createContext } from "react";
import { useContext } from 'react';
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { UserContext } from "../providers/UserProvider";
import { auth } from "../firebase";
import "../Components/home.css"
import "../Components/profilecss.css"



const ProfilePage = () => {

  const user = useContext(UserContext);
  //const {photoURL, displayName, email} = user;

  //console.log(user)
  if (user != null) {
    return (
      <>
        <section className=" mt-5 ">
          <div className="row justify-content-center">

            <div className="mainSec">
              <div>
                <img src={user.photoURL}></img>
              </div>
            </div>

          </div>
          <div className="mt-4 pt-4 row justify-content-center whitefont">

            {user.displayName}
          </div><div className="mt-4 pt-4 row justify-content-center whitefont">

            {user.email}
          </div>
          <div className="mt-4 pt-4 row justify-content-center">
            <Link to='/' className="btn effect01" onClick={() => { auth.signOut() }}><span>SignOut From CSI</span>
            </Link>


{/* 
            <Link to='/Creator'><div className="boxs" >Create Test</div></Link> */}

            <Link to='/Modifier'><div className="boxs" >Tests</div></Link>

          </div>

          <div className="mt-4 pt-4 row justify-content-center whitefont">
            Please Stay Tuned Based on Remaining Coins and Your Answers We will Declare Winners.
                 </div>

        </section>








      </>
    )




  } else {

    return <Redirect to="/" />

  }
};
export default ProfilePage;
