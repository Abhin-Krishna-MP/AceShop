import React, { useContext } from 'react'
import { storeContext } from '../../Context/StoreContext'
import './OrderDesign.css'

const OrderDesign = () => {
    const { getTotalAmount } = useContext(storeContext)
    return (
        <div className="order">
            <h1 className='text-white text-center'>Place-order</h1>
            <form className="order-form">
                <div className="order-top">
                    <div className="same-field">
                        <input type="text" name='firstName' placeholder='First name' required />
                        <input type="text" name='lastName' placeholder='Last name' required />
                    </div>
                    <input type="text" name='street' placeholder='Street' required />
                    <input type="text" name='email' placeholder='Email address' required />
                    <div className="same-field">
                        <input type="text" name='city' placeholder='City' required />
                        <input type="text" name='state' placeholder='State' required />
                    </div>
                    <div className="same-field">
                        <input type="text" name='zipcode' placeholder='Zip code' required />
                        <input type="text" name='country' placeholder='Country' required />
                    </div>
                    <input type="text" name='phone' placeholder='phone' required />
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