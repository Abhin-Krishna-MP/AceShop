import React, { useState } from 'react'
import './LoginDesign.css'
import axios from 'axios'
import Login from '../../Pages/Login/Login'
import { useContext } from 'react'
import { storeContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom'

const LoginDesign = () => {
    const url = 'http://localhost:4000'
    const {Token,setToken} = useContext(storeContext)
    const [LoginStatus, setLoginStatus] = useState("Sign-Up")
    const navigate = useNavigate()
    const [Data, setData] = useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandler = (e)=>{
        const name = e.target.name
        const value = e.target.value
        setData({...Data,[name]:value})
    }

    const onsubmit = async(e)=>{
        e.preventDefault()
        let newUrl = url
        if(LoginStatus==="Sign-Up"){
            newUrl +='/api/user/register'
        }else{
            newUrl +='/api/user/login'
        }
        const response = await axios.post(newUrl,Data)
        if(response.data.success){
            setToken(response.data.token)
            localStorage.setItem("token",response.data.token)
            navigate('/')
        }else{
            alert(response.data.message)
        }
    }

    return (
        <div className='login'>
            <form onSubmit={onsubmit} className="login-container text-white">
                <div className="login-header">
                    <h2 className='text-center'>{LoginStatus}</h2>
                </div>
                <div className="login-inputs text-center">
                    {LoginStatus === 'Sign-Up' ? <input onChange={onChangeHandler} value={Data.name} type="name" name='name' placeholder='Your Name' required /> : ''}
                    <input onChange={onChangeHandler} value={Data.email} type="email" name='email' placeholder='Your Email' required />
                    <input onChange={onChangeHandler} value={Data.password} type="password" name='password' placeholder='Password' required />
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