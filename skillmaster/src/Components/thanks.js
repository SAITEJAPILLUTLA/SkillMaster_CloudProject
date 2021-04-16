import React, { Component } from 'react'
import { useContext } from 'react';
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import "../Components/thanks.css"
import firebase from "firebase/app";
import { auth } from "../firebase"
require('firebase/auth');
require('firebase/database');
class Thanks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authName:'',
            
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(auth=>{
            this.setState({authName : auth.displayName})
            let userref = firebase.database().ref('/users/'+auth.uid+'/attempted/'+this.props.match.params.id+'/')
            userref.once("value").then(function (snapshot) {
                    console.log(snapshot.val())

            })
        })
    }
    render(){

    return (
        <>

        

<section className="row justify-content-center mt-5 pt-5"><h1 className="whitefont">Analysing Your Data</h1></section>
<section className="row justify-content-center mt-5 pt-5">

            <h1 className="whitefont">Thank You </h1>

            
        </section>




        <section className="row justify-content-center mt-5 pt-5">
        <Link to='/ProfilePage' className="mx-5 px-5 btn effect01 my-4" ><span>Profile</span></Link>   
        </section>
        
        </>
    )
}
}
export default Thanks