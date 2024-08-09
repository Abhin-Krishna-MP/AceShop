import React from 'react'
import './Contact.css'
const Contact = () => {
  return (
    <div className="contact">
      <div className="contact-contents text-white row">
        <div className="brand">
          <h1>Ace Shop</h1>
          <p className='contact-copyright'>Copyright 2024 © Tomato.com - All Right Reserved.</p>
        </div>
        <div className="contact-center">

          <div className="contact-logo">
            <i className='logo bi bi-instagram'></i>
            <i className='logo bi bi-whatsapp'></i>
            <i className='logo bi bi-envelope-at-fill'></i>
          </div>
          <div className="contact-label">
            <label className='logo-label'>abhin_krishna_mp</label>
            <label className='logo-label'>+91 6238423141</label>
            <label className='logo-label'>abhinkrishnamp6@gmail.com</label>
          </div>
        </div>
        <div className="footer-menu">
          <h5>COMPANY</h5>
            <a>Home</a>
            <a>About us</a>
            <a>Delivery</a>
            <a>Privacy Policy</a>
        </div>
      </div>
    </div>
  )
}

export default Contact