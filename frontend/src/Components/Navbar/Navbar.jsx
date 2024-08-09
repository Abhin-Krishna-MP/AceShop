import React, { useContext } from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { storeContext } from '../../Context/StoreContext'


const Navbar = () => {
    const navigate = useNavigate()
    const {getTotalAmount} = useContext(storeContext)
    return (
        <div className='navbar-container'>
            <nav style={{backgroundColor:"#393E46"}} className="navbar navbar-dark fixed-top">
                <div className="container-fluid">
                    <a onClick={()=>{navigate('/')}} className="navbar-logo">Ace Shop</a>
                    <i onClick={()=>{navigate('/cart')}} className={getTotalAmount()>0 ?"navbar-logo cart-icon ms-auto me-3 bi bi-bag-check": "navbar-logo cart-icon ms-auto me-3 bi bi-bag"}></i>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div style={{backgroundColor:"#393E46"}} className="offcanvas offcanvas-end text-white" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Menu</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <a onClick={()=>{
                                        navigate('/')
                                    }} className="nav-link active navbar-text" href='#trending' aria-current="page">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a onClick={()=>{
                                        navigate('/')
                                    }} className="nav-link active navbar-text" href='#trending' aria-current="page">trending</a>
                                </li>
                                <li className="nav-item">
                                    <a onClick={()=>{
                                        navigate('/')
                                    }}  className="nav-link active navbar-text" href='#category' aria-current="page">category</a>
                                </li>
                                <li className="nav-item">
                                    <a onClick={()=>{navigate('/product',{state:"All"})}} className="nav-link active navbar-text" aria-current="page">products</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active navbar-text" aria-current="page" href="#">connnect us</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Navbar