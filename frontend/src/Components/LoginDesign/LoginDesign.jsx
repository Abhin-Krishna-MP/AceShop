import React, { useState } from 'react'
import './LoginDesign.css'
import Login from '../../Pages/Login/Login'

const LoginDesign = () => {
    const [LoginStatus, setLoginStatus] = useState("Sign-Up")
    return (
        <div className='login'>
            <form className="login-container text-white">
                <div className="login-header">
                    <h2 className='text-center'>{LoginStatus}</h2>
                </div>
                <div className="login-inputs text-center">
                    {LoginStatus === 'Sign-Up' ? <input type="name" name='name' placeholder='Your Name' required /> : ''}
                    <input type="email" name='email' placeholder='Your Email' required />
                    <input type="password" name='password' placeholder='Password' required />
                </div>
                <div className="login-condition">
                    <input type="checkbox" required />
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>
                <button className='form-submit' type='submit'>{LoginStatus === 'Sign-Up' ? 'Create account' : 'Login'}</button>
                <div className="form-bottom text-center">
                    {
                        LoginStatus === 'Sign-Up' ? <p>Already have an account ? <span onClick={() => { setLoginStatus("Login") }}>Login here</span></p> : <p>Create new account ? <span onClick={() => { setLoginStatus("Sign-Up") }}>Sign up</span></p>
                    }

                </div>
            </form>
        </div>
    )
}

export default LoginDesign