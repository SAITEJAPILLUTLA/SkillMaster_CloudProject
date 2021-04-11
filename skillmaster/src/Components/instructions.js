import React,{Component} from 'react'
import { useContext } from 'react';
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import '../Components/home.css'
import signInWithGoogle  from "../providers/UserProvider";
import firebase from "firebase/app";
import { auth } from "../firebase"
import { UserContext } from "../providers/UserProvider";
import './instructions.css'

import IntervalExample from "../Components/timer"


import Footer from "../Components/footer"
import { render } from '@testing-library/react';



const provider = new firebase.auth.GoogleAuthProvider();
  //const user = useContext(UserContext);
class Instructions extends Component{

    constructor(props){
        super(props);
        this.state={

            username:'',
            rendernow:false,
        }}
        componentDidMount(){

            let username =""

                auth.onAuthStateChanged(user =>{
                  username=  user.displayName 
                  this.setState({rendernow :true})

        this.setState({ username: username });
        console.log(username)

                })
        }
  
      
render(){


    
      if(this.state.rendernow){
  if(this.state.name!=''){
      console.log(this.state.name)
    return (
        <>

        <section className=" mt-5 mx-5  ">
                <div className="row justify-content-center">
                    <div className="whiteFont italic">
                        
                    <h1>INSTRUCTIONS FOR SCAVENGERS</h1>
                    </div>
                </div>

                <div className="glass p-4 my-4">
                    <h3>Pattern of Exam</h3>
                    <div className="px-5">
                    <li>Based on the Points and the answer The winner will be decided</li>
                    <li>Every question is a riddle. Solving each riddle leads to next question.</li></div>
                </div>
                <div className="glass p-4 my-4">
                    <h3>Procedure of Exam</h3>
                    <div className="px-5">
                    <li>There are different question sets with different riddles included</li>
                    <li>Hints will be provided to students upon request. But each hint leads to a reduction of points.</li>
                    <li>After solving the 1st question only you can able to solve the 2nd question.After solving 2nd question you can able to crack the final riddle</li>
                    <li>Every Hint costs 10 points from total given points.</li>
                    </div>
                </div>
                <div className="glass p-4 my-4">
                    <h3>Rules to be followed during Exam</h3>
                    <div className="px-5">
                    <li>Make sure the website link will be available untill the slot time completion</li>
                    <li>If any one attempted beyond The slot time then their registration will be not considered</li>
                    <li>Wait to Load the Question!!!Don't be hurry to see the question</li>
                    <li>Don't reload the page repeatdly</li>
                    <li>Attempt the event with Good internet connectivity</li>
                    <li>For all members the different sets are given so don't try to copy from other team</li>
                    <li>Every time you click the Hint the -10 points are reduced.</li>
                    <li>Even though you seen once and want to see again the points are reduced by 10 for each clue</li>
                    </div>
                </div>

          
       
            
                <h6 style={{color:'whitesmoke'}}>By Clicking button below you are agreeing to our above rules.</h6>
            <div className="my-5 py-5 row justify-content-center">
                
        </div>
        
          </section>
          
          <Footer/>
        </>
    )
}
else{

  return <Redirect to="/LoginCSI" />}
}else{return(<>
<h1>Instruction</h1>
</>)}
}
}


export default Instructions
