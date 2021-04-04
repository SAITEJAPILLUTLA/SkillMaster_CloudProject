



import React,{Component} from 'react'
import { useContext } from 'react';
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Footer from "../Components/footer"
import  { useState, useEffect } from 'react';
import '../Components/question.css'
import { UserContext } from "../providers/UserProvider";
import firebase from "firebase/app";
import { auth } from "../firebase"
require('firebase/auth');
require('firebase/database');
require('firebase/storage');

class Creator extends Component{


    static contextType = UserContext;
    constructor(props){
        super(props)
        this.state={
            question:'',
            image:null,
            url: "",
            progress: 0
        }
    }

    handleQuestionChange=(event)=>{
        this.setState({
            question:event.target.value
        });

    }
    handleChange = e => {
        if (e.target.files[0]) {
          const image = e.target.files[0];
          this.setState(() => ({ image }));
        }
      };

      handleUpload = () => {
        const { image } = this.state;
        const uploadTask = firebase.storage().ref(`images/${image.name}`).put(image);
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
            firebase.storage()
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then(url => {
                this.setState({ url });
              });
          }
        );
      };

    render(){
        return(
            <>



            <section className= "mx-4 mt-5 pt-5"  >
                <form>
                    <div>EnterQuestion ::</div>
                    <textarea value={this.state.question} onChange={this.handleQuestionChange}>
                    </textarea>
                </form>
            </section>



            <section>
                
      <div className="center">
          <br/>
          <h2 className="green-text">React Firebase Image Uploader</h2>
          <br/>
          <br/>
        <div className="row">
          <progress value={this.state.progress} max="100" className="progress" />
        </div>
        <br />
        <br />
        <br />
        <div className="file-field input-field">
          <div className="btn">
            <span>File</span>
            <input type="file" onChange={this.handleChange} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <button
          onClick={this.handleUpload}
          className="waves-effect waves-light btn"
        >
          Upload
        </button>
        <br />
        <br />
        <img
          src={this.state.url || "https://via.placeholder.com/400x300"}
          alt="Uploaded Images"
          height="300"
          width="400"
        />
      </div>
            </section>
            </>
        )
    }


}
export default Creator