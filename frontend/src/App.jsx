import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Home from './Pages/Home/Home'
import Product from './Pages/Product/Product'
import Cart from './Pages/Cart/Cart'
import Contact from './Components/Contact/Contact'
import Login from './Pages/Login/Login'
import Order from './Pages/Order/Order'
import Verify from './Pages/verify/Verify'
import MyOrder from './Pages/MyOrder/MyOrder'

const App = () => {
  return (
    <>
      <Navbar />
      <div className='app'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/signup' element={<Login/>} />
          <Route path='/order' element={<Order/>} />
          <Route path='/verify' element={<Verify/>}  />
          <Route path='/myorder' element={<MyOrder/>} />
        </Routes>
      </div>
      <Contact />
    </>

  )
}

export default App