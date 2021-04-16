import React, { Component, createContext } from "react";
import { useContext } from 'react';
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { UserContext } from "../providers/UserProvider";

import Footer from "../Components/footer"
import { CircularProgressbar } from 'react-circular-progressbar';
import "../Components/home.css"
import "../Components/profilecss.css"
import { auth } from "../firebase";
import firebase from "firebase/app";
require('firebase/auth');
require('firebase/database');




const ProfilePage = () => {

  const user = useContext(UserContext);
  //const {photoURL, displayName, email} = user;

  //console.log(user)
  if (user != null) {

    
    return (
      <>
        <section className=" mt-5 wf">
          <div className="row justify-content-center">

            <div className="mainSec wf">
              <div>
                <img src={user.photoURL}></img>
              </div>
            </div>

          </div>
          <div className=" mx-5 mt-4 pt-3  p-3 row justify-content-center barbox">
          <div className="wf  px-5"><strong>{user.displayName}</strong></div>
          <div className="wf px-5"><strong>{user.email}</strong> </div>
          
          </div>
          <div className=" mt-5 row justify-content-center">
          <Link to='/Modifier'><div className= "wf p-4 px-5 boxs barbox" >Your Tests</div></Link></div>
          

          <div className=  "wf mt-5 mx-5 p-4 boxs barbox row justify-content-center" >
            
            <Boxes/></div>
          
          <div className="mt-4 pt-4 row justify-content-center">
            <Link to='/' className="btn effect01" onClick={() => { auth.signOut() }}><span>SignOut From CSI</span>
            </Link>


{/* 
            <Link to='/Creator'><div className="boxs" >Create Test</div></Link> */}


          </div>


        </section>






<Footer/>

      </>
    )




  } else {

    return <Redirect to="/" />

  }
};
export default ProfilePage;



export class Boxes extends Component {
  constructor(props) {
    super(props);
    this.state = {
        authName:'',
        attended :[],
        showattended :false,
        num:0,
        
    }
}

  componentDidMount(){
    let attended=[];
    let num =0
    auth.onAuthStateChanged(auth=>{
        this.setState({authName :auth.displayName})
        this.setState({authid :auth.uid})
        let userref = firebase.database().ref('/users/'+auth.uid+'/attempted/')
        userref.once("value").then(function (snapshot) {
          num =snapshot.numChildren()
          snapshot.forEach(snap =>{
              attended.push(snap.val())
              console.log(snap.val())
          })

        }).then(()=>{
          
          this.setState({num :num})
          this.setState({attended :attended})
          this.setState({showattended :true})
        })
           
    })
  }
  render(){
    return(
    
    <>
              {this.state.showattended ?<div>


                <div  className=" mt-5 row justify-content-center"><div className=" h-50 p-3 py-3 graph"  style={{ width: 200, height: 200 }}>
                    <h5 className="ml-4">Your Progress</h5>
                        <div  className="" >
                        <CircularProgressbar styles={{
                                path: {
                                    stroke: `rgb(255, 38, 38)`,
                                    strokeWidth:3.5,
                                    background:true,
                                    backgroundColor: 'rgb(255, 38, 38)',
                                    strokeLinecap: 'round',
                                    transformOrigin: 'center center',
                                    
                                  },
                                  trail: {
                                    // Trail color
                                    stroke: '#ffffff',
                                    strokeWidth:3.5,
                                  },
    }} value={this.state.num} maxValue={this.state.num+10}  /></div>
                        </div></div>



                        <div className="wf mt-4">
                  <h3>Tasks Attended by You</h3>   </div>
                <div className=" mt-5 row justify-content-center">
                
                 
                 
                              
                  {this.state.attended.map(data=>{
                    console.log(data)
                    return(
                    <div className="  p-3 px-5 boxm">

                      <h1>{data.quizName}</h1>
                      <div className="mx-4 mt-4 row justify-content-center" style={{ width: 85, height: 85}}>
                      <CircularProgressbar styles={{
                                path: {
                                    stroke: `rgb(255, 38, 38)`,
                                    strokeWidth:3.8,
                                    background:false,
                                    backgroundColor: 'rgb(255, 38, 38)',
                                    strokeLinecap: 'round',
                                    transformOrigin: 'center center',
                                    
                                  },
                                  trail: {
                                    // Trail color
                                    stroke: '#ffffff',
                                    strokeWidth:3.5,
                                  },
                                  
    }} value={data.corrects} maxValue={data.maxcorrects} text={` ${data.corrects} / ${data.maxcorrects}`}  />
    
                        <h4> </h4>
    </div>

                      
                      
                       
                    </div>
                    
                    )
                  })}
                   </div>
              </div>:null}
          

    </>
    
    
    
    )
  }
}
