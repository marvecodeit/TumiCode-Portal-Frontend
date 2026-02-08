import React, {useState, useEffect} from 'react'
import './SignUp.css'
import bg from './../assets/bg.jpg'
import bg1 from './../assets/bg1.jpg'
import bg2 from './../assets/bg2.png'
import bg3 from './../assets/bg3.jpg'
import bg4 from './../assets/bg4.jpg'
import bg5 from './../assets/bg5.jpg'
import bg6 from './../assets/bg6.jpg'
import bg7 from './../assets/bg7.jpg'
// import ImageSlider from './ImageSlider.jsx'
// import SignIn from './SignIn.jsx'
import Login from './Login.jsx'
const SignUp = () => {
   
  return (
    <>
        <div className='container-signup'>
 <div className="layout">
  {/* <ImageSlider /> */}
   {/* <SignIn /> */}
   <Login />
</div>
    </div>
    </>
    

  )
}

export default SignUp