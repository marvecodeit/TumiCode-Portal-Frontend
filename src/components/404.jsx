import React from 'react'
import './404.css'
const NotFound = () => {
  return (
   <>
   <div className="wrapper">
   <div className="glass-container">
    <fieldset className='fieldset'>
      <legend> <h1>404 Error</h1></legend>
       <h2>Page Not Found</h2>
    <p>Visit TumiCodes Support </p>
    <p><i>Click the link below</i></p>
    </fieldset>
    <div className="support">
   <a href="www.support.tumicodes.com" className='ahred'>TumiCode Support Team</a>
    </div>
   </div>

   </div>
   </>
  )
}

export default NotFound