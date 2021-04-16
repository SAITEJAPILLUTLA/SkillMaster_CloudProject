import React, { Component } from 'react'
import { useContext } from 'react';
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { RadioGroup, Radio } from 'react-radio-group'
import Footer from "../Components/footer"
import '../Components/question.css'
import '../Components/creatorcss.css'
import '../Components/profilecss.css'
import { UserContext } from "../providers/UserProvider";
import firebase from "firebase/app";
import { auth } from "../firebase"
require('firebase/auth');
require('firebase/database');

class Question extends Component {

    constructor(props) {
        super(props);
        this.state = {

            username: '',
            rendernow: false,
            questions: [],
            numberofquestions: 0,
            cquestion: 0,
            selectedValue: '0',
            value: "",
            corrects:0,
        }
    }


    componentDidMount() {

        let username = ""

        auth.onAuthStateChanged(user => {



            username = user.uid
            this.setState({ username: username })
            let questionref = firebase.database().ref('/quizes/' + this.props.match.params.id + '/q/')
            questionref.on("value", snap => {
                let questions = []
                let numberofquestions = 0
                snap.forEach(data => {

                    questions.push(data.val())
                    this.setState({ questions: questions })

                    numberofquestions++
                    this.setState({ numberofquestions: numberofquestions })

                    console.log(data.val())
                    this.setState({ rendernow: true })

                })

            })
        })
    }

    nextQuestion() {
        
        console.log(this.state.cquestion+2 + " and " + (this.state.numberofquestions))

            if(this.state.questions[this.state.cquestion].answer==this.state.selectedValue){
                    let corrects =(this.state.corrects) +1
                    this.setState({corrects :corrects})
                    
        console.log('corrects')
                }



        if (this.state.cquestion+2 < this.state.numberofquestions) {
            let cquestion = this.state.cquestion
            cquestion = cquestion + 1;

            this.setState({ cquestion: cquestion })
            this.setState({selectedValue :'0'})
            
            console.log(cquestion)
        } else {

            
            let cquestion = this.state.cquestion
            cquestion = cquestion + 1;

            this.setState({selectedValue :'0'}) 
            this.setState({ cquestion: cquestion })
            
            this.setState({ finished: true })
    
       
    
    }
    }

    finishup(){
        let userref =firebase.database().ref('/users/'+this.state.username+'/attempted/')
        console.log(this.state.corrects)
        userref.child('/'+this.props.match.params.id+'/').update({
            quizName :this.props.match.params.id,
            corrects :this.state.corrects,
            maxcorrects :this.state.numberofquestions,
        }).then(()=>{
            this.setState({uploaded :true})
        })
    }

    render() {

        if (this.state.rendernow) {
            if (this.state.username != '') {
                return (
                    <>
                        <section className=" mt-5 mx-5  ">
                            <div className="row justify-content-center">
                                <div className="whiteFont italic">

                                    <h1> Task {this.props.match.params.id}</h1>
                                </div>
                            </div>

                           
                            <div className="glass p-4 my-4">
                                <h3>Procedure of Exams</h3>
                                <div className="px-5">

                                    <div className="graph p-4">
                                        <h3>Question is {this.state.questions[this.state.cquestion].question}</h3>

                                        <img style={{borderRadius:20}} src={this.state.questions[this.state.cquestion].questionImageURL} />
                                        <div className=" p-4 my-4" >
                                            <RadioGroup name="option" selectedValue={this.state.selectedValue} onChange={(e) => { this.setState({ selectedValue: e }) }}>
                                                <label style={{minWidth:1000,}} ><div  class="graph m-2 px-5 py-3 "><Radio value="1" />{this.state.questions[this.state.cquestion].optionOne}
                                               </div> </label>


                                                <label style={{minWidth:1000,}}  ><div class="graph m-2 px-5 py-3 "><Radio value="2" />{this.state.questions[this.state.cquestion].optionTwo}
                                               </div>  </label>

                                             <label style={{minWidth:1000,}} >   <div class="graph m-2 px-5 py-3 " ><Radio value="3" />{this.state.questions[this.state.cquestion].optionThree}
                                                </div> </label> 
                                                <label style={{minWidth:1000,}} >
                                                <div class="graph m-2 px-5 py-3 " ><Radio value="4" />{this.state.questions[this.state.cquestion].optionFour}
                                              </div>   </label>
                                           </RadioGroup>
                                        </div>
                                    </div>



                                </div>
                                <h6 style={{ color: 'whitesmoke' }}>By Clicking button below you are agreeing to our above rules.</h6>
                            <div className="my-5 py-5 row justify-content-center">

                                {this.state.finished ?
                                    <Link  onClick={() => { this.finishup() }} className=" btn effect01 " ><span>Finish {this.props.match.params.id}</span></Link>
                                    : <Link className=" btn effect01 " onClick={() => { this.nextQuestion() }} ><span>Next Question in {this.props.match.params.id}</span></Link>
                                }
                            </div>
                            </div>





                           
                        </section>

                        {this.state.uploaded ? <section class="details-modal"  >
          <div class="details-modal-title">
            <h1>Question Updated Sucessfully !!</h1>
          </div>
          <div class="details-modal-content">
            <p>
              Your Question is Updated Sucessfully as :: {this.state.questionnumber} under Quiz :: {this.state.cquizName}
            </p>
          </div>
          <Link to={`/Thanks/${this.props.match.params.id}`} class="btn effect01 ">Okay</Link>
        </section> : null}

                        <Footer />
                    </>
                )
            }
            else {

                return <Redirect to="/LoginCSI"/>
            }
        } else {
            return (<>
                <h1>Instruction</h1>
            </>)
        }


    }




}
export default Question



