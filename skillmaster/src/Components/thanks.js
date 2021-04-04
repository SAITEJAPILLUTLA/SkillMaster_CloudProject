
import React from 'react'
import { useContext } from 'react';
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import "../Components/thanks.css"
function Thanks(){

    return (
        <>

<section className="row justify-content-center mt-5 pt-5">
            

            <h1 className="whitefont">Thank You </h1>



            
        </section>




        <section className="row justify-content-center mt-5 pt-5">
            



        <Link to='/ProfilePage' className="mx-5 px-5 btn effect01 my-4" ><span>Profile</span></Link> 


            
        </section>
        
        </>
    )
}
export default Thanks