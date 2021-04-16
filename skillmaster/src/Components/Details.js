import React,{Component} from 'react'
import { useContext } from 'react';
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Footer from "./footer"
import  { useState, useEffect } from 'react';
import '../Components/question.css'
import '../Components/creatorcss.css'
import '../Components/profilecss.css'

import { UserContext } from "../providers/UserProvider";
import firebase from "firebase/app";
import { auth } from "../firebase"
require('firebase/auth');
require('firebase/database');



const percentage = 66;
class Details extends Component{



    static contextType = UserContext;
    
    constructor(props){
        super(props);
        this.state={


            publicquizlist:[],








            question:'',
            imgUrl:'',
            hint1:'',
            hint2:'',
            hint01:'',
            hint02:'',
            hintO:false,
            hintT:false,
            uid:'',
            email:'',
            subject:'',
            name:'',
            user:'',
            key:'',
            set:'',
            hntbtn:"Let's see a hint",
            questionUrl:'',
            applied:true,
            coins:'100',
            time:'',
            loadq:true,
            log:"Fecthing Email Data from Google API's -19%"
        }
        
    }

componentDidMount(){
    let names =""
    let question=""
    let imgUrl=""
    let key=""
    auth.onAuthStateChanged(userAuth => {

        names=userAuth.displayName
        this.setState({ user: userAuth });
        this.setState({ name: names });
        this.setState({ email: userAuth.email });
        this.setState({ key: "0" });


        const interval = setInterval(() => {
             
            if(this.state.loadq){
                
            this.loadques()
            console.log("hellos")
            }
            
        }, 4000);
       
        
      });
}



    


    timer=()=>{
     

        
    
        let time =parseInt( this.state.time)
        const interval = setInterval(() => {
            time=time-20
            const ferr=firebase.database().ref('scavanger/RegisteredTeam/'+this.state.key)
            ferr.update({
                    time:time
            })
            console.log("hello")
        }, 20000);
        }

loadques=()=>{
    const ferr=firebase.database().ref('scavanger/RegisteredTeam/').orderByChild('LeadEmail').equalTo(this.state.email)
    ferr.once("child_added").then((snapshot)=>{
        
        this.setState({ key: snapshot.key });
        if(snapshot.val().Status!="Applied"){


            this.setState({ applied: false });
            console.log("error :: Not Applied")

        }else{       this.setState({ log: "Assigning You a Set of Questions and Coins -23%" });
            const sett=firebase.database().ref('scavanger/RegisteredTeam/'+snapshot.key+'/')
            sett.once("value").then((setno)=>{
                if(setno.val().set!=null){
                let set=setno.val().set
                this.setState({ set: set });
                let coins=setno.val().coins
                this.setState({ coins: coins });
                let time=setno.val().time
                this.setState({ time: time });
                this.setState({ loadq: false });
                
            this.setState({ log: "Assigning You a Set of Questions and Coins -23%" });


                const Questio =firebase.database().ref('questions/set'+set+'/')
                Questio.once("value").then((ques)=>{
                    
                    this.setState({ question: ques.val().questionOne });
                    this.setState({ questionUrl: ques.val().questionOneimageURL });
                    this.setState({ hint01: ques.val().hintOneOne });
                    this.setState({ hint02: ques.val().hintOneTwo });
                    this.setState({ loadq: false });
                    this.timer()
                })


                }else{
                    const rand = parseInt(1 + Math.random() * (40 - 1));
            const setUp=firebase.database().ref('scavanger/RegisteredTeam/'+snapshot.key+'/')
            setUp.update(
                        {
                            set:rand,
                            coins:100,
                            time:2700
                        }
                        
                        ).then((error)=>{
                                if(!error){
                            this.setState({ set: rand });
                            const Questio =firebase.database().ref('questions/set'+rand+'/')
                            Questio.once("value").then((ques)=>{
                                this.setState({ question: ques.val().questionOne });
                                this.setState({ questionUrl: ques.val().questionOneimageURL });
                                this.setState({ hint01: ques.val().hintOneOne });
                                this.setState({ hint02: ques.val().hintOneTwo });
                            })                                
                        }})
                }
            })
                   

                    
                    
            }
    })
    








}

 reducecoin=(event)=>{
    
    
    let coi=0
    const coin=firebase.database().ref('scavanger/RegisteredTeam/'+this.state.key+'/coins')
    coin.once("value").then((ques)=>{
        coi=parseInt(ques.val())
    }).then((error)=>{
        if(coi>10){
        coi=coi-10;
        this.setState({coins : coi})
        const setUp=firebase.database().ref('scavanger/RegisteredTeam/'+this.state.key+'/')
        setUp.update(
                {
                    coins:coi
                }).then((error)=>{
                    if(!this.state.hintO){
                        
                    let vd =this.state.hint01
                    this.setState({ hint1:  vd});
                    this.setState({ hintO:  true});
                    }else {
                        
                        let vd =this.state.hint02
                        this.setState({ hint2:  vd});
                        this.setState({ hntbtn:  ""});

                        }
                })
    }}
    
    )



    
}



handleSubmit=(event)=>{
    
    event.preventDefault();
    let ans =this.state.subject

    const coini=firebase.database().ref('scavanger/RegisteredTeam/'+this.state.key+'/')
    coini.update({
        AnswerOne:ans
    }).then((error)=>{
        
        alert("Answer Updated !Please move to next Question")
    })
}
handleSubjectChange=(event)=>{
    this.setState({
        subject:event.target.value
    });
}



componentDidMount(){
    auth.onAuthStateChanged(auth =>{
        this.setState({auth :auth.displayName})
        
        const quizref =firebase.database().ref('/quizes/'+this.props.match.params.id+'/')
        quizref.on("value",snapshot=>{
            let publicquizlist = [];
                        publicquizlist.push(snapshot.val());
                        this.setState({ publicquizlist: publicquizlist });
                        this.setState({questionDetails:true})
        //})

    })
})

}



    

    render(){


            if(this.state.auth!=''){
                     return(
            <>
            <div className=" m-5 p-5   ">
                    <div className=" m-3 p-5  graph ">
                <section className="  row justify-content-center">
                   
                   <div >


                                


                            {this.state.questionDetails?<section>
                   {this.state.publicquizlist.map(obj =>{ 
                             return(

                                <>
                                
                               <div  className="row justify-content-center ">
                                   <h1>{obj.quizName}</h1></div> 


                                   <div className="mx-5 px-5 my-4">by {obj.by}</div>

                            <div className="row justify-content-center">
                                 <div className="mx-3" style={{ width: 200, height: 200 }}>     
                        <CircularProgressbar  styles={{
                                path: {
                                    stroke: `rgba(238, 34, 34, 0.7)`,
                                    strokeWidth:3.5,
                                    background:true,
                                    backgroundColor: '#161010',
                                    strokeLinecap: 'round',
                                    transformOrigin: 'center center',
                                    
                                  },
                                  trail: {
                                    // Trail color
                                    stroke: '#ffffff',
                                    strokeWidth:3.5,
                                  },
    }} value={obj.numberofquestions} maxValue={20} text={`${obj.numberofquestions} \n Qs`} />
                        </div>
                        <div className="mx-3" style={{ width: 200, height: 200 }}>
                        <CircularProgressbar styles={{
                                path: {
                                    stroke: `rgba(238, 34, 34, 0.7)`,
                                    strokeWidth:3.5,
                                    background:true,
                                    backgroundColor: '#161010',
                                    strokeLinecap: 'round',
                                    transformOrigin: 'center center',
                                    
                                  },
                                  trail: {
                                    // Trail color
                                    stroke: '#ffffff',
                                    strokeWidth:3.5,
                                  },
    }} value={obj.views} maxValue={obj.views+10} text={`${obj.views} \n Views`} />
                        </div></div>




                            
                                </>
                             )})}    
                             
                             
                             </section>:null}


<div  className="my-3 pt-5 row justify-content-center" >
<Link to={`/Instructions/${this.props.match.params.id}`} className=" btn effect01 " ><span>Participate in {this.props.match.params.id}</span></Link> 
      </div>             
                   </div>
                      
                   </section> </div></div>







<Footer/>
            </>
        )
                }else{
                    return <Redirect to="/LoginCSI" />
                }

       
}

}


export default Details