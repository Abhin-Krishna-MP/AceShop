import React, { useContext } from 'react'
import './CartDesign.css'
import { storeContext } from '../../Context/StoreContext'
const CartDesign = () => {
    const { product_list, CartItems, quantityInc, quantityDec, removeCartItem,getTotalAmount} = useContext(storeContext)
    return (
        <div className="cart">
            <div className="cart-contents">
                <table className="text-white cart-table">
                    <thead>
                        <tr>
                            <th >Image</th>
                            <th >Name</th>
                            <th >Quantity</th>
                            <th >price</th>
                            <th >Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            product_list.map((item, index) => {
                                if (CartItems[item._id]) {
                                    return (
                                        <tr key={index} className='cart-items'>
                                            <td><img src={item.image} alt="" /></td>
                                            <td className='cart-item-name'>{item.name}</td>
                                            <td className='cart-quantity mt-3'><i onClick={() => { quantityInc(item._id) }} className="bi bi-plus-circle-fill"></i>{CartItems[item._id]}<i onClick={() => { quantityDec(item._id) }} className="bi bi-dash-circle-fill"></i></td>
                                            <td className='text-center p-4 cart-item-price'>Rs{item.price*CartItems[item._id]}</td>
                                            <td className='text-center p-4 cart-item-remove'><i onClick={() => { removeCartItem(item._id) }} className="bi bi-trash3"></i></td>
                                        </tr>
                                    )
                                }
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className="cart-payment">
                <button>Proceed to Order</button>
                <p className='text-white'>Rs {getTotalAmount()}</p>
            </div>
        </div>
    )
}

export default CartDesign