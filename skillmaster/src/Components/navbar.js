import React,{useState} from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const [menu1,menu01] =useState(true);
  const [menu2,menu02] =useState(false);
  const [menu3,menu03] =useState(false);
    
  const changePage01 =()=>
  {
    menu01(true);
    menu02(false);
    menu03(false);}
  const changePage02 =()=>{
    menu01(false);
    menu02(true);
    menu03(false);}
  const changePage03 =()=>{
    menu01(false);
    menu02(false);
    menu03(true);}
  
    
    return (
      <>
        <header class="main-header">
    <div class="container">
      <nav class="navbar navbar-expand-lg main-nav px-3 py-0 navb">
       <Link class="navbar-brand" data-toggle="collapse" data-target="#mainMenu" aria-controls="mainMenu" aria-expanded="true" aria-label="Toggle navigation" 
       to='/home' onClick={changePage01}>
					      <img className="mx-3" src="https://picsum.photos/id/237/60/60" alt="rajeshdas.com"/>
					     SAITEJA PILLUTLA's Skill Master</Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainMenu" aria-controls="mainMenu" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="icon-bar icon-bar-1"></span>
                        <span class="icon-bar icon-bar-2"></span>
                        <span class="icon-bar icon-bar-3"></span>
                    </button>
        <div class="collapse navbar-collapse" id="mainMenu">
          <ul class="navbar-nav ml-auto text-uppercase f1">
            <li>
              <Link className={menu1 ?"active active-first":""} data-toggle="collapse" data-target="#mainMenu" aria-controls="mainMenu" aria-expanded="false" aria-label="Toggle navigation" 
                to='/home' onClick={changePage01}>
                  Home</Link>
            </li>
            <li>
              <Link className={menu2 ?"active active-first":""} data-toggle="collapse" data-target="#mainMenu" aria-controls="mainMenu" aria-expanded="false" aria-label="Toggle navigation"
                to='/services' onClick={changePage02}>
                  Services</Link>
            </li>
            <li>
              <Link data-toggle="collapse" data-target="#mainMenu" aria-controls="mainMenu" aria-expanded="false" aria-label="Toggle navigation"
               to='/contact' >
                 <div id="goldenhour" className=" px-3 py-1">Let's have a golden hour </div></Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
         </>
    )
}
export default Navbar
