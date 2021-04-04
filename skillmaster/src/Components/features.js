
import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'

import '../Components/home.css'
import signInWithGoogle  from "../providers/UserProvider";
import firebase from "firebase/app";
import Footer from "../Components/footer"

import auth from "../firebase.js"

import { UserContext } from "../providers/UserProvider";

function Features(){
    return(
        <>
                <h1 className="whitefont" >Features of Project</h1>

        </>
    )
}


export default Features