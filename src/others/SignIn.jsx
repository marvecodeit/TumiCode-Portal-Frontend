import React from 'react'
import './SignUp.css'
import { Link } from 'react-router-dom'
const SignIn = () => {
  return (
    <>
    <div className="container">
        <div className="sub-container">
    <h3>TumiCodes(Developer) Portal </h3>
    <div className="form-control">
        <form action="">
            <div className="center">
                <div className="sub-center">
            <div className="names">
                
                <label htmlFor="">FullName</label><br />
                      <input type="text" name="" id="" placeholder='John Doe' />
            </div>
            <div className="names">
                <label htmlFor="">Email</label><br />
                      <input type="email" name="" id="" placeholder='yourname@service.com' />
            </div>
            <div className="names">
                <label htmlFor="">Password</label><br />
                      <input type="password" name="" id="" placeholder='' />
                      </div>
            </div>
            </div>
            <div className="btn-container">
                <button>Create Account</button>
            </div>
        </form>
        </div>
    </div>
    </div>
   
    </>
  )
}

export default SignIn