import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './CartDesign.css'
import { storeContext } from '../../Context/StoreContext'
const CartDesign = () => {
    const { product_list, CartItems,quantityInc, quantityDec, removeCartItem, getTotalAmount,url} = useContext(storeContext)
    const navigate = useNavigate()
    
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return (
        <div className="cart">
            <div className="cart-items mt-4">
                {
                    product_list.map((item, index) => {
                        if (CartItems[item._id] > 0) {
                            return (
                                <div key={index} className="cart-item-card">
                                    <div className="cart-item text-white">
                                        <img src={`${url}/images/${item.image}`} alt="" />
                                        <div className="cart-item-content">
                                            <p>{item.name}</p>
                                            <p>₹{item.price * CartItems[item._id]}</p>
                                        </div>
                                    </div>
                                    <hr className='text-white' />
                                    <div className="cart-item-function">
                                        <div className="cart-item-quantity text-white">
                                            <p>Quantity</p>
                                            <i onClick={() => { quantityInc(item._id) }} className="bi bi-plus-circle"></i>
                                            <p>{CartItems[item._id]}</p>
                                            <i onClick={() => { quantityDec(item._id) }} className="bi bi-dash-circle"></i>
                                        </div>
                                        <div className="cart-item-remove text-white">
                                            <i onClick={() => { removeCartItem(item._id) }} className="bi bi-trash3"> Remove</i>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                    })
                }
            </div>
            <div className="cart-bottom text-white">
                <p><span>Total Amount : </span>₹{getTotalAmount()}</p>
                <button onClick={()=>{navigate('/order')}}>Place Order</button>
            </div>
        </div>
    )
}

export default CartDesign