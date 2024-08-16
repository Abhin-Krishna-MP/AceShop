import React, { useContext, useEffect, useState } from 'react'
import './VerifyDesign.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { storeContext } from '../../Context/StoreContext'
import axios from 'axios'

const VerifyDesign = () => {
    const [SearchParams,setSearchParams] = useSearchParams()
    const success = SearchParams.get('success')
    const orderId = SearchParams.get("orderId")
    const {url,cartData,setCartItems} = useContext(storeContext)
    const navigate = useNavigate()

    const verifyPayment = async() =>{
        const response = await axios.post(url+'/api/order/verify',{success,orderId})
        console.log(response.data)
        if(response.data.success){
          setCartItems({})
          navigate('/myorder')
        }else{
          alert('Payment-Falied')
          setCartItems({})
            navigate('/')
        }
    }

    useEffect(() => {
      verifyPayment()
    
    }, [])
    

  return (
    <div  className='verify'>
        <div className="spinner">

        </div>
    </div>
  )
}

export default VerifyDesign