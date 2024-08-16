import React, { useContext, useEffect, useState } from 'react'
import { storeContext } from '../../Context/StoreContext'
import './OrderDesign.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const OrderDesign = () => {
    const { getTotalAmount, product_list, CartItems, url, Token } = useContext(storeContext)
    const navigate = useNavigate()
    const [Data, setData] = useState({
        firstName: "",
        lastName: "",
        street: "",
        email: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    })

    const callRaorpay = (orderData, orderId) => {
        const homeurl = 'http://localhost:1573'
        var options = {
            "key": 'rzp_test_I9gB04XEiTHhvY', // Enter the Key ID generated from the Dashboard
            "amount": orderData.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": orderData.currency,
            "name": "Acme Corp", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderData.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": function (response) {
                navigate(`/verify?success=true&orderId=${orderId}`)
            },
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
        rzp1.on('payment.failed', function (response) {
            location.href=`http://localhost:5173/verify?success=false&orderId=${orderId}`
        });

    }

    const onChangeHandler = (e) => {
        const name = e.target.name
        const value = e.target.value
        setData({ ...Data, [name]: value })
    }

    const orderHandler = async (e) => {
        e.preventDefault()
        let orderItems = []
        product_list.map((item, index) => {
            console.log(item)
            if (CartItems[item._id] > 0) {
                let itemInfo = item
                itemInfo['quantity'] = CartItems[item._id]
                orderItems.push(itemInfo)
            }
        })
        let orderData = {
            address: Data,
            items: orderItems,
            amount: getTotalAmount() + 5
        }

        let response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token: Token } })
        if(response.data.success){
            await callRaorpay(response.data.orderData,response.data.orderId)
        }
    }

    useEffect(() => {
      if(getTotalAmount()===0){
        navigate('/cart')
      }
    }, [])
    

    return (
        <div className="order p-5">
            <h1 className='text-white text-center'>Place-order</h1>
            <form onSubmit={orderHandler} className="order-form">
                <div className="order-top">
                    <div className="same-field">
                        <input onChange={onChangeHandler} value={Data.firstName} type="text" name='firstName' placeholder='First name' required />
                        <input onChange={onChangeHandler} value={Data.lastName} type="text" name='lastName' placeholder='Last name' required />
                    </div>
                    <input onChange={onChangeHandler} value={Data.street} type="text" name='street' placeholder='Street' required />
                    <input onChange={onChangeHandler} value={Data.email} type="text" name='email' placeholder='Email address' required />
                    <div className="same-field">
                        <input onChange={onChangeHandler} value={Data.city} type="text" name='city' placeholder='City' required />
                        <input onChange={onChangeHandler} value={Data.state} type="text" name='state' placeholder='State' required />
                    </div>
                    <div className="same-field">
                        <input onChange={onChangeHandler} value={Data.zipcode} type="text" name='zipcode' placeholder='Zip code' required />
                        <input onChange={onChangeHandler} value={Data.country} type="text" name='country' placeholder='Country' required />
                    </div>
                    <input onChange={onChangeHandler} value={Data.phone} type="text" name='phone' placeholder='phone' required />
                <hr className='text-white text-center' />
                </div>
                <div className="order-function">
                    <div className="display-total"> 
                        <div className="order-total text-white">
                            <h5>Amount :</h5>
                            <p>₹ {getTotalAmount()}</p>
                        </div>
                        <div className="order-total text-white">
                            <h5>Delivery fee :</h5>
                            <p>₹ 5</p>
                        </div>
                        <div className="order-total text-white">
                            <h5>Total Amount :</h5>
                            <p>₹ {getTotalAmount() === 0 ? 0 : getTotalAmount() + 5}</p>
                        </div>
                    </div>
                    <button type='submit' >PROCEED TO PAYMENT</button>
                </div>
            </form>
        </div>
    )
}

export default OrderDesign