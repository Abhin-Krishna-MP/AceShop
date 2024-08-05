import React from 'react'
import './Navbar.css'

const Navbar = () => {
    return (
        <div className='navbar'>
            <nav style={{backgroundColor:"#393E46"}} className="navbar navbar-dark fixed-top">
                <div className="container-fluid">
                    <a className="navbar-logo" href="#">Ace Shop</a>
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
                                    <a className="nav-link active navbar-text" aria-current="page" href="#">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active navbar-text" aria-current="page" href="#">trending</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active navbar-text" aria-current="page" href="#">category</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active navbar-text" aria-current="page" href="#">products</a>
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