import React from 'react'
import {ToastContainer} from 'react-toastify'
import {Route,Routes} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Add from './Pages/Add/Add'
import List from './Pages/List/List'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
    <ToastContainer/>
    <Navbar/>
    <div className='app'>
      <Routes>
        <Route path='/add' element={<Add/>} />
        <Route path='/list' element={<List/>} />
      </Routes>
    </div>
    </>
  )
}

export default App