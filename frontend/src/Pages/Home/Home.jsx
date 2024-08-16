import React, { useEffect } from 'react'
import Header from '../../Components/Header/Header'
import Category from '../../Components/Category/Category'
import Contact from '../../Components/Contact/Contact'
const Home = () => {
  useEffect(() => {
    window.scrollTo(0,0)
  }, [])
  return (
    <div className='home'>
        <Header/>
        <Category/>
    </div>
  )
}

export default Home