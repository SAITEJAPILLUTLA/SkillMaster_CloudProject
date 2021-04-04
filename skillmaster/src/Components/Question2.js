import React,{Component} from 'react'
import { useContext } from 'react';
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'

import '../Components/question.css'
import { UserContext } from "../providers/UserProvider";
import firebase from "firebase/app";
import { auth } from "../firebase"
require('firebase/auth');
require('firebase/database');

class Questiont extends Component{

    render(){

        return (

            <>
            <h1>dgfchvjbknlm;fcghvjbkn</h1>
            </>
        )}

        
    

}
export default Questiont


// class Questiontwo extends Component{
//     static contextType = UserContext;
    
//     constructor(props){
//         super(props);
//         this.state={
//             question:'',
//             imgUrl:'',
//             hint1:'',
//             hint2:'',
//             hint01:'',
//             hint02:'',
//             hintO:false,
//             hintT:false,
//             uid:'',
//             email:'',
//             name:'',
//             user:'',
//             key:'',
//             set:'',
//             hntbtn:"Let's see a hint",
//             questionUrl:'',
//             applied:true,
//             coins:'100',
//             exit:false
//         }
        
//     }

// componentDidMount(){
//     let names =""
//     let question=""
//     let imgUrl=""
//     let key=""
//     auth.onAuthStateChanged(userAuth => {

//         names=userAuth.displayName
//         this.setState({ user: userAuth });
//         this.setState({ name: names });
//         this.setState({ key: "0" });
//         this.loadques()
        
//       });
// }

// loadques=()=>{



        
//         var key =this.props.match.params.id
//         this.setState({ key: key });
//         const sett=firebase.database().ref('scavanger/RegisteredTeam/'+key+'/')
//         sett.once("value").then((setno)=>{
//             if(setno.val().set!=null){
//             let set=setno.val().set
//             this.setState({ set: set });
//             let coins=setno.val().coins
//             this.setState({ coins: coins });




//             const Questio =firebase.database().ref('questions/set'+set+'/')
//             Questio.once("value").then((ques)=>{
//                 this.setState({ question: ques.val().questionOne });
//                 this.setState({ questionUrl: ques.val().questionOneimageURL });
//                 this.setState({ hint01: ques.val().hintOneOne });
//                 this.setState({ hint02: ques.val().hintOneTwo });
//             })


//             }else{
//                 this.setState({ exit: true });
//             }

//         })

                
    

    

//     console.log(this.state.name)







// }

//  reducecoin=(event)=>{
    
    
//     let coi=0
//     const coin=firebase.database().ref('scavanger/RegisteredTeam/'+this.state.key+'/coins')
//     coin.once("value").then((ques)=>{
//         coi=parseInt(ques.val())
//         console.log(ques.val())
//     }).then((error)=>{
//         if(coi>10){

        
//         coi=coi-10;
//         this.setState({coins : coi})
//         const setUp=firebase.database().ref('scavanger/RegisteredTeam/'+this.state.key+'/')
//         setUp.update(
//                 {
//                     coins:coi
//                 }).then((error)=>{
//                     if(!this.state.hintO){
                        
//                     let vd =this.state.hint01
//                     console.log(vd)
//                     this.setState({ hint1:  vd});
//                     this.setState({ hintO:  true});
//                     console.log(this.state.hint1)
//                     }else {
                        
//                         let vd =this.state.hint02
//                         console.log(vd)
//                         this.setState({ hint2:  vd});
//                         this.setState({ hntbtn:  ""});
//                         console.log(this.state.hint2)

//                         }
//                 })
//     }}
    
//     )



    
// }
    

//     render(){


//         if(true){
//             if(this.state.exit){
//             if(this.state.key!="0"){
//             if(this.state.question!=null){
//                      return(
//             <>
//                 <section className="row m-5 pt-5">
//                    <div className="row col-sm-11">
//                 <div className ="row justify-content-center">
//                     <div><h1 className="whitefont italic glass p-2 px-5">Your First Riddle</h1></div>
//                     </div>
//                     <div className ="row justify-content-center">
                        
//                     <div className="my-3 qglass p-2 px-5">
//                         <h1 className="whitefont">{this.state.question}</h1></div>
//                         <img className="round" src={this.state.questionUrl}/>
//                     </div>
//                     <div className ="row justify-content-center">
//                     <div className="mt-5">
//                         <h1 className="whitefont p-2 qglass">{this.state.hint1}</h1>
//                         <h1 className="whitefont p-2 qglass">{this.state.hint2}</h1>
                        
                       
//                             <div className ="row align-items-end">
//                             <Link onClick={this.reducecoin}  className="btn effect01 my-4" ><span>{this.state.hntbtn}</span></Link> 
//                             <Link onClick={this.reducecoin}  className="mx-5 px-5 btn effect01 my-4" ><span>Let's See Second Riddle</span></Link> 
//                        </div>
                       
                       
                        
//                    </div>
//                     </div>



                    
                   
                   
                   
                    
                    
//                 </div>
//                 <div className="mx-0 px-0 col-sm-1 ">
//                     <div className="glass p-3">
//                 <h1 className="whitefont italic ">Wallet</h1>
//                 <div className="row px-2">
//                 <div><h5 className="whitefont">{this.state.coins}</h5></div>

//                 <div className="coins"></div>
//                 </div></div>
                
//                 </div>
//                 </section>
//             </>
//         )
//                 }else{
//                     return <Redirect to="/LoginCSI" />
//                 }

       
    
    
    
//     }
//         else{
//             return(<><h1>hello</h1></>)
//         }
//             }else { return <Redirect to="/LoginCSI" />}



//     }
//     else{
    
//       return <Redirect to="/LoginCSI" />
//     }
// }}


// export default Questiontwo