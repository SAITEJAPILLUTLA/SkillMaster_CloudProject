
import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'

import '../Components/home.css'
import '../Components/features.css'
import signInWithGoogle  from "../providers/UserProvider";
import firebase from "firebase/app";
import Footer from "../Components/footer"

import auth from "../firebase.js"

import { UserContext } from "../providers/UserProvider";

function Features(){
    return(
        <>
                <div className="barbox p-3 m-3 mx-5"> 
                <h1 className="" >Features of Project</h1>
                <div className="px-5 py-3">
                    <li>Thered</li>
                    <li>Hints will be provided to students upon request. But each hint leads to a reduction of points.</li>
                    <li>After solving the 1st question only you can able to solve the 2nd question.After solving 2nd question you can able to crack the final riddle</li>
                    <li>Every Hint costs 10 points from total given points.</li>
                    </div></div>

        </>
    )
}


export default Features