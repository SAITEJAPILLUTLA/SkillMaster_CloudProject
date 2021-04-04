import logo from './logo.svg';
import './App.css';

import { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Home from "../src/Components/Home";
import Thanks from "../src/Components/thanks";
import Questionone from "../src/Components/Question1";
import Questions from "../src/Components/questions";
import Questionss from "../src/Components/questionss";
import Questiont from "../src/Components/Question2.js"
import LoginCSI from "../src/Components/login";
import Creator from "../src/Components/creator";

import Navbar from './Components/navbar.js';
import  './Components/navbar.css';
import ProfilePage from "../src/Components/profile"
import Instructions from "../src/Components/instructions"
import { UserContext } from "./providers/UserProvider";
import UserProvider from "./providers/UserProvider";
import {BrowserRouter as Router,Switch,Route, Redirect} from 'react-router-dom';

function App() {

  const userea = useContext(UserContext);
  return (
    <>

      
    


    <UserProvider>
     
      <Router>
        <Navbar/>




        <Switch>


        <Route path='/' exact component={Home} />
      <Route path='/Home' exact component={Home} />
      <Route path='/Thanks' exact component={Thanks} />
      
      <Route path="/Questionone/:id" exact component={Questionone} />
      <Route path="/Questions/:id" exact component={Questions} />
      <Route path="/Questionss/:id" exact component={Questionss} />
      <Route path='/Instructions' exact component={Instructions} />
      <Route path='/LoginCSI' exact component={LoginCSI} />
      <Route path='/Creator' exact component={Creator} />
      <Route path='/ProfilePage' exact component={ProfilePage}/>
        <Redirect to='/'/>
        </Switch>
      </Router>

      
      </UserProvider>
  

      </>
  );
}

export default App;
