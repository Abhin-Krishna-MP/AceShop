import React, { useState } from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
    const [active, setactive] = useState("")
    const navigate = useNavigate()
    return (
        <div className='navbar text-white'>
            <h2 onClick={()=>{
                setactive('')
                navigate('/')
            }}>Admin-Panel</h2>
            <div className="menu">
                <ul>
                    <li onClick={()=>{(setactive("Add"),navigate('/add'))}} className={active==="Add" ? "menu-item" : ''}><i className="bi bi-plus-square"></i> Add</li>
                    <li onClick={()=>{(setactive("Products"),navigate('/list'))}} className={active==="Products" ? "menu-item" : ''}><i className="bi bi-box"></i> Products</li>
                    <li onClick={()=>{(setactive("Orders"),navigate('/orders'))}} className={active==="Orders" ? "menu-item" : ''}><i className="bi bi-box-seam-fill"></i> Orders</li>
                </ul>
            </div>
            <div className="profile m-3">
                <h1><i className="bi bi-person-circle dp"></i></h1>
            </div>
        </div>
    )
}

export default Navbar