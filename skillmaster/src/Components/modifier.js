
import React, { Component } from 'react'
import { useContext } from 'react';
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Footer from "../Components/footer"
import { useState, useEffect } from 'react';
import '../Components/question.css'
import '../Components/creatorcss.css'
import '../Components/profilecss.css'
import { UserContext } from "../providers/UserProvider";
import firebase from "firebase/app";
import { auth } from "../firebase"
require('firebase/auth');
require('firebase/database');
require('firebase/storage');


const storage = firebase.storage();
const timeStamp = Date.now()
class Modifier extends Component{
    constructor(props) {
    
        super(props);
       
        this.state = {
            publicquizlist : [],
            cquizName:'',
            showquestion : false,
            qes:[],
            auth:[],
            questionslist :[],
            showfullquestion:false,
            cquestion:'',
            saveChanges:true,
            uploaded:false,
            questionnumber:"k",
            createTask:false,
            selectVal:"1",
            answer:'',
            loading:true,
            showobj:false,
            choosefile:'Choose File '
        }
        }


        componentDidMount(){
            


            auth.onAuthStateChanged(userAuth => {

           let refer = firebase.database().ref('/users/' + userAuth.uid + '/quizes/')
                        let uid=userAuth.uid
                        this.setState({auth : uid})
                refer.on("value", snapshot => {
                    let publicquizlist = [];
                    snapshot.forEach(snap => {
                    // console.log(snap.val())
                    // console.log(snapshot)
                        publicquizlist.push(snap.val());
                    });
                    this.setState({showobj:true})
                    this.setState({ publicquizlist: publicquizlist });
                  });
        })}

         handleQuizChoose=(quizName)=>{
             
            this.setState({cquizName :quizName})

            console.log(this.state.cquizName)
            console.log(this.state.auth)
            let questions = firebase.database().ref('/quizes/'+quizName+'/q')
            questions.on("value", snapshot => {
                let questionslist =[];
                snapshot.forEach(snap => {                     
                    questionslist.push(snap.val());
                    });
                    this.setState({questionslist :questionslist})
            })
            
            this.setState({createTask :false})
            this.setState({showfullquestion :false})
            this.setState({showquestion :true})
        }
        handleQuestionChoose=(q)=>{

            this.setState({cquestion :q.question})
            this.setState({optionOne :q.optionOne})
            this.setState({ optionTwo  : q.optionTwo  })
            this.setState({  optionThree : q. optionThree })
            this.setState({ optionFour  : q.optionFour  })
            this.setState({ url :q.questionImageURL})
            this.setState({ questionnumber:q.questionnumber})
            this.setState({selectVal :q.answer})
            if(q.answer=='1'){
                
            this.setState({answerOne :true})
            this.setState({answerTwo :false})
            this.setState({answerThree :false})
            this.setState({answerFour :false})
            }else if(q.answer=='2'){
                            this.setState({answerOne :false})
            this.setState({answerThree :false})
            this.setState({answerFour :false})
              this.setState({answerTwo :true})
              }else if(q.answer=='3'){
                            this.setState({answerOne :false})
            this.setState({answerTwo :false})
            this.setState({answerFour :false})
                this.setState({answerThree :true})
                }else if(q.answer=='4'){
                          this.setState({answerOne :false})
            this.setState({answerTwo :false})
            this.setState({answerThree :false})
                  this.setState({answerFour :true})
                  }
                this.setState({showfullquestion :true})
                this.setState({ saveChanges :true})


        }
                handlecquestionchange=(event)=>{

            this.setState({cquestion :event.target.value})
        }
        handlecquestionOptionOnechange=(event)=>{
            this.setState({optionOne :event.target.value})
        }
        handlecquestionOptionTwochange=(event)=>{
            this.setState({optionTwo :event.target.value})
        }
        handlecquestionOptionThreechange=(event)=>{
            this.setState({optionThree :event.target.value})
        }
        handlecquestionOptionFourchange=(event)=>{
            this.setState({optionFour :event.target.value})
        }
        handleQuestionImageChange = e => {
    
            this.setState({ status: "Image Linked !" });
            if (e.target.files[0]) {
              const image = e.target.files[0];
              this.setState(() => ({ image }));
              this.setState({ choosefile :image.name})
            }
          };
  handleQuestionImageUpload = (event) => {
    
    this.setState({ status: "preparing image to upload Image !" });
    this.setState({ progress: 30 });
    const { image } = this.state;
    
    const uploadTask = storage.ref(`/images/${timeStamp}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress:progress });
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
          this.state.saveChanges ? this.UploadQuestionChanges(): this.handleAddQuestion()
        });
      }
    );
  };
  UploadQuestionChanges =()=>{
    
    this.setState({ progress: 65 });
    this.setState({ status: "Updating Changes in Question !!!" });
   let  questionReference= firebase.database().ref("/quizes/"+this.state.cquizName+"/q/"+this.state.questionnumber)
   questionReference.update({
    question: this.state.cquestion,
    questionImageURL: this.state.url,
    optionOne: this.state.optionOne,
    optionTwo: this.state.optionTwo,
    optionThree: this.state.optionThree,
    optionFour: this.state.optionFour,
    questionnumber:this.state.questionnumber
   }).then(()=>{
       
    this.setState({ progress: 100 });
    this.setState({ status: "Changes Updated !!" });
       this.setState({uploaded :true})
   })
  }
  handlepopup = () => {
    this.setState({      uploaded: false    });
  }
  handleAdd=()=>{
    this.setState({ saveChanges :false})
    this.setState({cquestion :''})
    this.setState({optionOne :''})
    this.setState({ optionTwo  : ''  })
    this.setState({  optionThree : '' })
    this.setState({ optionFour  : ''  })
    this.setState({ url :''})
    this.setState({ questionnumber:''})
        this.setState({showfullquestion :true})
  }
  handleAddQuestion=()=>{
    let questionnumber=""
   let userQref = firebase.database().ref('/users/' + this.state.auth + '/private/' + this.state.cquizName + '/q/')
   userQref.once("value").then(function (snapshot) {
    
    console.log((snapshot.numChildren()+1)+"as  questionNumber");
    questionnumber="question"+(snapshot.numChildren()+1)
    

}).then((e)=>{

    console.log("questionNumber");
    userQref.child(questionnumber).update({
        question: this.state.cquestion,
        questionImageURL: this.state.url,
        optionOne: this.state.optionOne,
        optionTwo: this.state.optionTwo,
        optionThree: this.state.optionThree,
        optionFour: this.state.optionFour,
        questionnumber:this.state.questionnumber
       }).then(()=>{
           
    this.setState({ progress: 100 });
    this.setState({ status: "Changes Updated !!" });
       this.setState({uploaded :true})
        //this.setState({ questionnumber:questionnumber})
       })

})
}
  handleAddTask(){
this.setState({createTask :true})
console.log("add task")
  }
  handleQuizChange = (event) => {
    let vs = ""
    vs = event.target.value
    vs = vs.trim();
    vs = vs.replace(/[^a-zA-Z ]/g, "")
    this.setState({
      cquizName: vs
    });
  }
  handleQuestionChange = (event) => { this.setState({  taskquestion: event.target.value}); }

  handleoptionOneChange = (event) => {
    this.setState({
      taskoptionOne: event.target.value
    });

  }
  handleoptionTwoChange = (event) => {
    this.setState({
      taskoptionTwo: event.target.value
    });

  }
  handleoptionThreeChange = (event) => {
    this.setState({
      taskoptionThree: event.target.value
    });

  }
  handleoptionFourChange = (event) => {
    this.setState({
      taskoptionFour: event.target.value
    });

  }
  handletaskQuestionImageUpload = (event) => {
    if((this.state.cquizName!='')||(this.state.taskquestion!='')||(this.state.taskoptionOne!='')){
    
    this.setState({ status: "preparing image to upload Image !" });
    this.setState({ progress: 30 });
    const { image } = this.state;
    const result = Math.random().toString(36).substring(2,7);
    console.log(result);
    const uploadTask = storage.ref(`/images/${timeStamp}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress:progress });
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
          this.handlecreateTask()
         });
      }
    );
  }else{
    
    this.setState({ status: "One of the Feilds is empty !" });
  }}; 
  handlecreateTask(){
    
    this.setState({ status: "Preparing Question to Upload !" });
    this.setState({ progress: 15 });
    auth.onAuthStateChanged(userAuth => {
      
      this.setState({ progress: 30 });
      let number = 0
      let quizesref =firebase.database().ref('/quizes/'+this.state.cquizName+'/')
      let quizesQref =firebase.database().ref('/quizes/'+this.state.cquizName+'/q/')
      let quizesuserref =firebase.database().ref('users/'+userAuth.uid+'/quizes/'+this.state.cquizName+'/')
      
    this.setState({ status: "Question being Uploaded !" });
    this.setState({ progress: 40 });
        
    let quiz = ""
    quiz = this.state.cquizName
    let question = ""
    question = this.state.taskquestion
    let url = ""
    url = this.state.url
    let optionOne = ""
    optionOne = this.state.taskoptionOne 
    let optionTwo = ""
    optionTwo = this.state.taskoptionTwo
    let optionThree = ""
    optionThree = this.state.taskoptionThree
    let optionFour = ""
    optionFour = this.state.taskoptionFour
      let answer =""
      answer =this.state.selectVal
    
      quizesQref.once("value").then(function (snapshot) {


        number = snapshot.numChildren() + 1
        quizesref.update({
          by: userAuth.displayName,
          contactMail: userAuth.email,
          timeStamp: timeStamp,
          quizName :quiz,
          uid :userAuth.uid,
          numberofquestions :number,
          views :0,
        }).then(()=>{
          quizesuserref.update({
          timeStamp: timeStamp,
          quizName :quiz,
          numberofquestions :number
        })
        })
        


      }).then((e)=>{
        
    this.setState({ status: "Question being Uploaded !" });
    this.setState({ progress: 70 });
        quizesQref.child('/question'+(number)).update({
          question: question,
          questionImageURL: url,
          optionOne: optionOne,
          optionTwo: optionTwo,
          optionThree: optionThree,
          optionFour: optionFour,
          questionnumber:number,
          answer :answer
        }).then(()=>{
          
    this.setState({ status: "Sucessfully Uploaded !" });
    this.setState({ progress: 100 });
    this.setState({ uploaded:true})


    
    this.setState({taskquestion:""})
    let url = ""
    url = this.state.url
    let optionOne = ""
    this.setState({  taskoptionOne  :""  })
    this.setState({  taskoptionTwo  :""  })
    this.setState({  taskoptionThree  :""  })
    this.setState({  taskoptionFour  :""  })
    this.setState({  selectVal  :""  })
    this.setState({ url   :""  })

        })
      })
    })
  }
  handleSelect(event){
    this.setState({selectVal:event.target.value});
    console.log(this.state.selectVal)
    
  }
  handleanswerOne(){
    let answer ="1"
    this.setState({selectVal :answer})
    this.setState({answerOne :true})
    this.setState({answerTwo :false})
    this.setState({answerThree :false})
    this.setState({answerFour :false})
  }
  handleanswerTwo(){
    this.setState({selectVal :"2"})
    this.setState({ answerTwo :true})
    this.setState({answerOne :false})
    this.setState({answerThree :false})
    this.setState({answerFour :false})
  }
  handleanswerThree(){
    this.setState({selectVal :"3"})
    this.setState({ answerThree:true})
    this.setState({answerTwo :false})
    this.setState({ answerOne:false})
    this.setState({answerFour :false})
  }
  handleanswerFour(){
    this.setState({selectVal :"4"})
    this.setState({ answerFour:true})
    this.setState({answerTwo :false})
    this.setState({answerThree :false})
    this.setState({answerOne :false})
  }
        render(){
            return(
                <>
                
                {this.state.showobj?<div className="mt-5 pt-5" >
                <div className="mx-5   row justify-content-center">
                  <div className="mx-5 px-5 wf graph">

                  <h1 className="px-5">Tasks By You</h1>
                  </div>
                </div>
<section className=" mx-4 mt-5 pt-5 ">

                <div class="mx-4 px-5 py-3 graph">
    <div className="row justify-content-center">
         {this.state.publicquizlist.map(data =>{ 
             return(
                    <div className="mx-2 p-5 boxm" onClick={()=>{  this.handleQuizChoose(data.quizName)}}><h4>{data.quizName}</h4></div>
             )

         })}
    <div className="p-5 boxm" onClick={()=>{ this.handleAddTask() }} >
 <strong>
    <img style={{height:25,}} src="plus.png"/>

      </strong></div>
    </div>

    </div>
    {this.state.createTask ?
    
    
    <section className="mt-3 py-4 px-5 graph">
<div  className=" pt-3 font-weight-bold" >EnterAssignmentName [Case Sensitive] ::</div>
<input className="myinput " style={{maxWidth:500,}} value={this.state.cquizName} onChange={this.handleQuizChange} />


<div className=" pt-3 font-weight-bold">EnterQuestion ::</div>
<textarea className="myinput " style={{height:100,}} value={this.state.taskquestion} onChange={this.handleQuestionChange} />
    

    <div className=" pt-3 font-weight-bold">Option 1 ::</div>
<textarea  className="myinput "  value={this.state.taskoptionOne} onChange={this.handleoptionOneChange} />


<div className=" pt-3 font-weight-bold">Option 2 ::</div>
<textarea className="myinput "  value={this.state.taskoptionTwo} onChange={this.handleoptionTwoChange} />
<div className=" pt-3 font-weight-bold">Option 3 ::</div>
<textarea className="myinput "  value={this.state.taskoptionThree} onChange={this.handleoptionThreeChange} />
<div className=" pt-3 font-weight-bold">Option 4 ::</div>
<textarea className="myinput "  value={this.state.taskoptionFour} onChange={this.handleoptionFourChange} />
<div className=" pt-3 font-weight-bold">If there is image Attach it else leave it :</div>
<div class="custom-file mt-3" style={{maxWidth:300,}}>
    <input type="file" accept="image/*" onChange={this.handleQuestionImageChange} class="custom-file-input" id="customFile"/>
    <label class="custom-file-label" for="customFile">{this.state.choosefile}</label>
  </div>

<img src={this.state.url} alt="  " />

<div class="ml-5 mt-5">
  
<div>Answers ::</div>
<div>
<input type="checkbox" class="form-check-input" checked={this.state.answerOne}  onChange={()=>{this.handleanswerOne()}} />
<label>Option 1</label>
</div>
<div>
<input type="checkbox" class="form-check-input"  checked={this.state.answerTwo} onChange={()=>{this.handleanswerTwo()}} />
<label>Option 2</label></div><div>
<input type="checkbox" class="form-check-input"  checked={this.state.answerThree} onChange={()=>{this.handleanswerThree()}} />
<label>Option 3</label></div><div>
<input type="checkbox" class="form-check-input"  checked={this.state.answerFour} onChange={()=>{this.handleanswerFour()}} />
<label>Option 4</label></div>
</div>
<div className="row " >
  <progress value={this.state.progress} max="100" className="progress my-4" />
  <span>{this.state.status}</span>
</div>
<div class="btn effect01 " onClick={()=>{ this.handletaskQuestionImageUpload() }}>Create Task and add Another Question</div>
</section>:null}
<div className="my-3 mx-5 py-3 graph row justify-content-center" >
   
    {this.state.showquestion ?
   
    <div className="row justify-content-center" >
          
         {this.state.questionslist.map((data) =>{    
                return(<div>
                    <div className=  "mx-3 p-5 boxm" onClick={()=>{ this.handleQuestionChoose(data) }}><h4>{data.question}</h4></div>
                    </div>) 
         })}
         <div className="p-5 boxm" onClick={()=>{ this.handleAdd() }}><strong>
    <img style={{height:25,}} src="plus.png"/>

      </strong></div>
                    
    </div> :null}
    </div>


    {this.state.showfullquestion?<section 
    className="graph">
      <div  class="px-5 p-2">
            <span className=" pt-3 font-weight-bold">  Question ::</span><div>
            <textarea  className="myinput " style={{height:100,}} value={this.state.cquestion} onChange={this.handlecquestionchange}></textarea></div><div class="px-5 p-3">
            </div>
<span className=" pt-3 font-weight-bold">optionOne ::</span><div>
<textarea className="myinput "  value={this.state.optionOne} onChange={this.handlecquestionOptionOnechange}></textarea></div><div class="px-5 p-3">
</div>
<span className=" pt-3 font-weight-bold">optionTwo ::</span>
<div>
<textarea className="myinput "  value={this.state.optionTwo} onChange={this.handlecquestionOptionTwochange}></textarea></div><div class="px-5 p-3">
</div>

<span className=" pt-3 font-weight-bold">optionThree ::</span><div>
<textarea className="myinput "  value={this.state.optionThree} onChange={this.handlecquestionOptionThreechange}></textarea></div><div class="px-5 p-3">
</div>

<span className=" pt-3 font-weight-bold">optionFour ::</span><div>
<textarea className="myinput "  value={this.state.optionFour} onChange={this.handlecquestionOptionFourchange}></textarea></div>

<span className=" pt-3 font-weight-bold">Image</span>
<div>
<img src={this.state.url} alt="Uploaded Images" /></div>
<div  className=" pt-4">
<span className=" pt-5 font-weight-bold">Choose Replace Image ::</span></div>
<div class="custom-file mt-3" style={{maxWidth:300,}}>
    <input type="file" accept="image/*" onChange={this.handleQuestionImageChange} class="custom-file-input" />
    <label class="custom-file-label" for="customFile">{this.state.choosefile}</label>
  </div>
<div>
</div>







<div >

<div className=" pt-3 font-weight-bold">Answer :: {this.state.answer}</div>
<input type="checkbox" checked={this.state.answerOne}  onChange={()=>{this.handleanswerOne()}} />
<label>Option 1</label>
</div>
<div>
<input type="checkbox" checked={this.state.answerTwo} onChange={()=>{this.handleanswerTwo()}}/>
<label>Option 2</label>
</div>
<div>
<input type="checkbox" checked={this.state.answerThree} onChange={()=>{this.handleanswerThree()}} />
<label>Option 3</label>
</div>
<div>
<input type="checkbox" checked={this.state.answerFour} onChange={()=>{this.handleanswerFour()}} />
<label>Option 4</label>
</div>

<progress class="" value={this.state.progress} max="100" className="progress my-4" />
<span>{this.state.status}</span>


<div class="row justify-content-center" >
{this.state.saveChanges?
<button onClick={()=>{this.handleQuestionImageUpload()}} class="btn effect01 ">Save Changes to Question</button>
:
<button onClick={()=>{this.handleQuestionImageUpload()}} class="btn effect01 ">Add Question
</button>
}</div>
</div>


    </section>:null}





</section>
</div>
   :<div className="mt-5 pt-5 row justify-content-center"> 
                <img className="h-500" style={{height:200,}} src="spinner.gif"/></div>}
                


                  
                {this.state.uploaded ? <section class="details-modal"  >
          <div class="details-modal-title">
            <h1>Question Updated Sucessfully !!</h1>
          </div>
          <div class="details-modal-content">
            <p>
              Your Question is Updated Sucessfully as :: {this.state.questionnumber} under Quiz :: {this.state.cquizName}
            </p>
          </div>
          <button class="btn effect01 " onClick={this.handlepopup}>Okay</button>
        </section> : null}

        <Footer/>
                </>
            )
        }
}


export default Modifier









