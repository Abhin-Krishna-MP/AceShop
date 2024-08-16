import React, { useContext, useEffect } from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { storeContext } from '../../Context/StoreContext'


const Navbar = () => {
    const navigate = useNavigate()
    const { getTotalAmount, Token, setToken, setCartItems, setCategory } = useContext(storeContext)
    const logout = ()=>{
        localStorage.removeItem("token")
        setToken("")
        setCartItems({})
        navigate('/')
    }
    return (
        <div className='navbar-container'>
            <nav style={{ backgroundColor: "#393E46" }} className="navbar navbar-dark fixed-top">
                <div className="container-fluid">
                    <a onClick={() => { navigate('/')}} className="navbar-logo">Ace Shop</a>
                    <i onClick={() => { navigate('/cart') }} className={getTotalAmount() > 0 ? "navbar-logo cart-icon ms-auto me-3 bi bi-bag-check" : "navbar-logo cart-icon ms-auto me-3 bi bi-bag"}></i>
                    {Token ?
                        <div className="profile-icon">
                            <h1 className='text-white text-center mt-2 me-3'><i className="bi bi-person-circle dp"></i></h1>
                            <ul className="profile text-white text-center">
                                <li onClick={()=>{navigate('/myorder')}} className="profile-item"><p>MyOrder</p></li>
                                <hr />
                                <li className="profile-item" onClick={logout}><p>LogOut</p></li>
                            </ul>
                        </div>
                        : <a onClick={() => { navigate('/signup') }} className='btn text-white navbar-signup me-3'>sign-up</a>}
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div style={{ backgroundColor: "#393E46" }} className="offcanvas offcanvas-end text-white" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Menu</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <a data-bs-dismiss = 'offcanvas' className="nav-link active navbar-text" onClick={() => {
                                        navigate('/')
                                    }}>home</a>
                                </li>
                                <li className="nav-item">
                                    <a href='#trending' className="nav-link active navbar-text" onClick={() => {
                                        navigate('/')
                                        const offcanvasElement = document.querySelector('#offcanvasDarkNavbar');
                                        const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
                                        if (offcanvas) offcanvas.hide();
                                    }}>trending</a>

                                </li>
                                <li className="nav-item">
                                    <a href='#category' className="nav-link active navbar-text" onClick={() => {
                                        navigate('/')
                                        const offcanvasElement = document.querySelector('#offcanvasDarkNavbar');
                                        const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
                                        if (offcanvas) offcanvas.hide();
                                    }}>category</a>
                                </li>
                                <li className="nav-item">
                                    <a data-bs-dismiss="offcanvas" onClick={() => { (setCategory("All"), navigate('/product')) }} className="nav-link active navbar-text" aria-current="page">products</a>
                                </li>
                                <li className="nav-item">
                                    <a href='#Contact' className="nav-link active navbar-text" onClick={() => {
                                        const offcanvasElement = document.querySelector('#offcanvasDarkNavbar');
                                        const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
                                        if (offcanvas) offcanvas.hide();
                                    }}>contact us</a>
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