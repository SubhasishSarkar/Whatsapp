import React from 'react'
import './Login.css';
import { Button } from '@material-ui/core';
import { auth, provider } from './firebase'
function Login() {
    const signIn = () =>{
        auth.signInWithPopup(provider)
        .then((result)=>{console.log(result)})
        .catch((error)=>{alert(error)});
    };
    return (
        <div className="login">
            <div className="login__container">
                <img src="https://www.kindpng.com/picc/m/74-747955_redes-sociales-logos-png-whatsapp-logo-png-transparent.png" alt="image"/>
                <div className="login__text">
                    <h1>Sign in to WhatsApp</h1>
                </div>
                <Button type="submit" onClick={signIn}>
                    Sign in with Google
                </Button>
            </div>
        </div>
    )
}

export default Login
