



import React, { Component } from 'react'
import { useContext } from 'react';
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Footer from "../Components/footer"
import { useState, useEffect } from 'react';
import '../Components/question.css'
import '../Components/creatorcss.css'
import { UserContext } from "../providers/UserProvider";
import firebase from "firebase/app";
import { auth } from "../firebase"

require('firebase/auth');
require('firebase/database');
require('firebase/storage');

const storage = firebase.storage();
const timeStamp = Date.now()
class Creator extends Component {


  static contextType = UserContext;
  constructor(props) {
    super(props)
    this.state = {
      quiz: '',
      optionOne: '',
      optionTwo: '',
      optionThree: '',
      optionFour: '',
      question: '',
      image: null,
      url: "",
      progress: 0,
      status :'',
      uploaded: false,
      public: false,
      currentQ: 0,
      showQuizes:false
    }
  }
  handleQuestionChange = (event) => {
    this.setState({
      question: event.target.value
    });

  }

  handleoptionOneChange = (event) => {
    this.setState({
      optionOne: event.target.value
    });

  }

  handleoptionTwoChange = (event) => {
    this.setState({
      optionTwo: event.target.value
    });

  }

  handleoptionThreeChange = (event) => {
    this.setState({
      optionThree: event.target.value
    });

  }

  handleoptionFourChange = (event) => {
    this.setState({
      optionFour: event.target.value
    });

  }
  handleQuestionImageChange = e => {
    
    this.setState({ status: "Image Linked !" });
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  };
  handleQuestionImageUpload = (event) => {
    
    this.setState({ status: "preparing image to upload Image !" });
    this.setState({ progress: 30 });
    event.preventDefault();
    const { image } = this.state;
    const uploadTask = storage.ref(`/images/${timeStamp}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      error => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL);
          
        this.setState({ status: "ImageURL created !" });
          this.setState({ url: downloadURL });
          this.handleQuestionUpload()
        });
      }
    );
  };
  handleQuestionUpload = (event) => {

    let quiz = ""
    quiz = this.state.quiz
    let question = ""
    question = this.state.question
    let url = ""
    url = this.state.url
    let optionOne = ""
    optionOne = this.state.optionOne
    let optionTwo = ""
    optionTwo = this.state.optionTwo
    let optionThree = ""
    optionThree = this.state.optionThree
    let optionFour = ""
    optionFour = this.state.optionFour
    
    this.setState({ status: "Preparing Question to Upload !" });
    this.setState({ progress: 15 });
    auth.onAuthStateChanged(userAuth => {
      this.setState({ progress: 30 });
      let number = 0,quiz=this.state.quiz;
      let userref = firebase.database().ref('/users/' + userAuth.uid + '/public/' + this.state.quiz + '/')
      let userQref = firebase.database().ref('/users/' + userAuth.uid + '/public/' + this.state.quiz + '/q/')
      if (this.state.public) {
        
    this.setState({ status: "Question being Uploaded !" });
        this.setState({ progress: 40 });
        console.log("public")
        let publicref = firebase.database().ref('/public/' + this.state.quiz + '/')
        let publicQref = firebase.database().ref('/public/' + this.state.quiz + '/q')
        publicQref.once("value").then(function (snapshot) {

          number = snapshot.numChildren() + 1
          publicref.update({
            by: userAuth.displayName,
            contactMail: userAuth.email,
            timeStamp: timeStamp,
            quizName :quiz
          })
        }).then(e => {

          let questionnumber ="question"+number
          publicQref.child('/question' + (number)).update({
          question: question,
          questionImageURL: url,
          optionOne: optionOne,
          optionTwo: optionTwo,
          optionThree: optionThree,
          optionFour: optionFour,
          questionnumber:questionnumber
        })
          
    this.setState({ status: "Attaching Nodes to Question !" });
          this.setState({ progress: 70 });
        })
      }
      if (!this.state.public) {
        userref = firebase.database().ref('/users/' + userAuth.uid + '/private/' + this.state.quiz + '/')
        userQref = firebase.database().ref('/users/' + userAuth.uid + '/private/' + this.state.quiz + '/q/')
      }
      userQref.once("value").then(function (snapshot) {
        console.log(snapshot.numChildren());
        number = snapshot.numChildren() + 1
        userref.update({

          by: userAuth.displayName,
          contactMail: userAuth.email,
          timeStamp: timeStamp,
          quizName :quiz
        })
      }).then(() => {
        
        let questionnumber ="question"+number
        userQref.child('question' + number).update({
          question: question,
          questionImageURL: url,
          optionOne: optionOne,
          optionTwo: optionTwo,
          optionThree: optionThree,
          optionFour: optionFour,
          questionnumber:questionnumber
        }).finally(()=>{
        
        this.setState({ status: "Question Saved !" });
        this.setState({ progress: 100 });
        this.setState({ uploaded: true });
        this.setState({ currentQ: number })
        })
        
        //console.log(error)
      });

    });
  }
  handleQuizChange = (event) => {
    let vs = ""
    vs = event.target.value
    vs = vs.trim();
    vs = vs.replace(/[^a-zA-Z ]/g, "")
    this.setState({
      quiz: vs
    });
  }
  handlePublicAssignment = (event) => {
    if (this.state.public) {
      this.setState({
        public: false
      });
    } else {
      this.setState({
        public: true
      });
    }
  }
  handlepopup = () => {
    this.setState({
      uploaded: false
    });
  }



  

  componentDidMount(){
            


    auth.onAuthStateChanged(user => {
        this.setState({name :user.displayName})

        let quizrefer = firebase.database().ref('/quizes/')
                        let uid=user.uid
                        this.setState({auth : uid})
                quizrefer.on("value", snapshot => {
                    let publicquizlist = [];
                    snapshot.forEach(snap => {
                    // console.log(snap.val())
                    // console.log(snapshot)
                        publicquizlist.push(snap.val());
                    });
                    this.setState({ publicquizlist: publicquizlist });
                    this.setState({showQuizes :true})
                  });


    })}

    handleQuizChoose(name){
          
  
        
    }
  render() {
    return (
      <>
        <section className=" mx-4 mt-5 pt-5 ">








          <h1>Quizes Active Now ::</h1>
          {
            this.state.showQuizes?
          <section className="row">
          {this.state.publicquizlist.map(data =>{ 
                             return(
                                    <Link to={`/Details/${data.quizName}`}>
                                    <div className="boxm">
                                      <h4>{data.quizName}</h4>
                                      <h5>{data.by}</h5>
                                      </div></Link>
                             )

                         })}</section>:null}




          <form className="whitefont" onSubmit={this.handleQuestionImageUpload}>


            <div>EnterAssignmentName [Case Sensitive] ::</div>
            <input value={this.state.quiz} onChange={this.handleQuizChange} />

            <div>EnterQuestion ::</div>
            <textarea value={this.state.question} onChange={this.handleQuestionChange} />

            <div>Option 1 ::</div>
            <textarea value={this.state.optionOne} onChange={this.handleoptionOneChange} />


            <div>Option 2 ::</div>
            <textarea value={this.state.optionTwo} onChange={this.handleoptionTwoChange} />


            <div>Option 3 ::</div>
            <textarea value={this.state.optionThree} onChange={this.handleoptionThreeChange} />


            <div>Option 4 ::</div>
            <textarea value={this.state.optionFour} onChange={this.handleoptionFourChange} />


            <section>

              <div className="">

                <div className="file-field input-field">
                  <div className="btn">
                    <span>File</span>
                    <input type="file" onChange={this.handleQuestionImageChange} />
                  </div>
                </div>
                <div className="row">
                  <progress value={this.state.progress} max="100" className="progress my-4" />
                  <span>{this.state.status}</span>
                </div>
                {/* <button
                  onClick={this.handleQuestionImageUpload} className="btn effect01">
                  Upload
                  </button> */}
                <img src={this.state.url} alt="Uploaded Images" />
              </div>
            </section>

            <input type="checkbox" defaultChecked={this.state.public} onChange={this.handlePublicAssignment} />
            <label>Make this as Public</label>
            <button type="submit" class="btn effect01 ">Save Question</button>
            <Link to={this.state.uploaded}></Link>
          </form>
        </section>
        {this.state.uploaded ? <section class="details-modal"  >
          <div class="details-modal-title">
            <h1>Question Updated Sucessfully !!</h1>
          </div>
          <div class="details-modal-content">
            <p>
              Your Question is Updated Sucessfully as :: question{this.state.currentQ} under Quiz :: {this.state.quiz}
            </p>
          </div>
          <button class="btn effect01 " onClick={this.handlepopup}>Okay</button>
        </section> : null}
      </>
    )
  }


}
export default Creator