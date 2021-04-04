import React from 'react'
import { useContext } from 'react';
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import '../Components/home.css'
import signInWithGoogle  from "../providers/UserProvider";
import firebase from "firebase/app";
import auth from "../firebase.js"
import { UserContext } from "../providers/UserProvider";
import './instructions.css'

function footer() {



    return(


        <>
        <div className="mt-5 pt-5"></div>
<div className="mt-5 pt-5"></div>
<div className="mt-5 pt-5"></div>
<div className="footer">
    

</div>


<div className="footerstyle mt-0 pt-2  mx-0">
                <div className=" row justify-content-center mt-3">
                <h6 className="whitefont"> Site Designed and Developed by SAITEJA PILLUTLA</h6>
                </div>
                <div className="row justify-content-center">
                
            <div className="m-3"><a href='https://www.instagram.com/saitejapillutla/' target='_blank'>
                <img src="https://www.instagram.com/csi_vitap/?igshid=1pzq2vodwm02y"/>
                CSI-VITAP</a>
            </div>
             <div className="m-3"><a href='https://in.linkedin.com/in/saiteja-pillutla-52670616b' target='_blank'>
             <img src="https://www.linkedin.com/in/csi-vit-ap-a244361ba/"/>
                 CSI-VITAP</a>
            </div>
             <div className="m-3"><a href='https://in.linkedin.com/in/saiteja-pillutla-52670616b' target='_blank'><img src="https://img.icons8.com/material-outlined/30/ffffff/important-mail.png"/>csiclubofficial@csivitap.co.in</a>
            </div>
            </div>
            <div className=" row justify-content-center mt-3">
                <h5><img src="https://img.icons8.com/metro/15/ffffff/copyright.png"/>
                 &nbsp;2021 all rights reserved to CSI-VITAP </h5>
                </div>

            
</div>

        </>
    )
}

export default footer