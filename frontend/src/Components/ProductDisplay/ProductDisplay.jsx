import React, { useContext } from 'react'
import './ProductDisplay.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { storeContext } from '../../Context/StoreContext'

const ProductDisplay = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const {product_list,CartItems,setCartItems} = useContext(storeContext)
    const cartHandler = (id)=>{
        if(CartItems[id]===1){
            navigate('/cart')
        }
        setCartItems({...CartItems,[id]:1})
    }
    return (
        <div className='product container'>
            <div className="product-container row">

                {
                    product_list.map((item, index) => {
                        if (item.category == state) {
                            return (
                                <div key={index} className="product-item col-lg-4 col-md-12 ">
                                    <img className='img-fluid' src={item.image} alt="" />
                                    <div className="product-content text-start">
                                        <h5>Rs {item.price}</h5>
                                        <h4 className='text-white'>{item.name}</h4>
                                        <p className='text-white '>{item.description}</p>
                                    </div>
                                    <div className="product-function text-center">
                                        <button onClick={()=>cartHandler(item._id)} className='btn btn-lg'>{!CartItems[item._id] ?"Add to Cart":"Go to Cart"}</button>
                                    </div>
                                </div>

                            )
                        }else if(state==='All'){
                            return (
                                <div key={index} className="product-item col-lg-4 col-md-12">
                                    <img className='img-fluid' src={item.image} alt="" />
                                    <div className="product-content text-start">
                                        <h5>Rs {item.price}</h5>
                                        <h4 className='text-white'>{item.name}</h4>
                                        <p className='text-white '>{item.description}</p>
                                    </div>
                                    <div className="product-function text-center">
                                        <button onClick={()=>cartHandler(item._id)} className='btn btn-lg'>{!CartItems[item._id] ?"Add to Cart":"Go to Cart"}</button>
                                    </div>
                                </div>

                            )
                        }
                    })
                }
            </div>
        </div>
    )
}

export default ProductDisplay