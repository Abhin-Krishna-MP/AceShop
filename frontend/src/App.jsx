import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Home from './Pages/Home/Home'

const App = () => {
  return (

    <div className='app'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
      </Routes>

    </div>
  )
}

export default App