import React, { useContext, useEffect, useState } from 'react'
import './Category.css'
import { category_list} from '../../assets/asset.js'
import { useNavigate } from 'react-router-dom'
import { storeContext } from '../../Context/StoreContext.jsx'

const Category = () => {
    const navigate = useNavigate()
    const [Type, setType] = useState('All')
    const [Show, setShow] = useState({})
    const {product_list,CartItems,setCartItems} = useContext(storeContext)

    const cartHandler = (id)=>{
        if(CartItems[id]===1){
            navigate('/cart')
        }
        setCartItems({...CartItems,[id]:1})
    }
    useEffect(() => {
        console.log(CartItems)

    }, [CartItems])

    return (
        <div className='category text-center' id='category'>
            <h4 className='text-white mt-5'>Category</h4>
            <div className="category-menu">
                {
                    category_list.map((item, index) => {
                        return (
                            <div onClick={() => { Type === item.category_name ? (setType("All"), setShow({})) : (setType(item.category_name), setShow({})) }} key={index} className="category-item">
                                <img className={Type === item.category_name ? 'active' : ''} src={item.category_image} alt="" />
                                <p className='thumbnail-name text-white'>{item.category_name}</p>
                            </div>
                        )
                    })
                }
            </div>
            <div className="catrgory-product-container container">
                {
                    product_list
                        .filter(item => item.category === Type || Type === 'All')
                        .slice(0, 3)
                        .map((item, index) => (
                            <div key={index} className="category-product-item col-lg-4 col-12">
                                <img className='img-fluid' src={item.image} alt={item.name} />
                                <div className="category-product-content text-start">
                                    <h5 className='ms-3'>Rs {item.price}</h5>
                                    <h4 className='text-white text-center'>{item.name}</h4>
                                    <p className={Show[index] ? 'text-white active' : 'text-white'}>{item.description}</p>
                                    <a onClick={() => { Show[index] === false || !Show[index] ? setShow({ ...Show, [index]: true }) : setShow({ ...Show, [index]: false }) }} className='ms-auto m-2'>{Show[index] === true ? "...less" : "...more"}</a>
                                </div>
                                <div className="category-product-function text-center">
                                    <button onClick={()=>cartHandler(item._id)}>{!CartItems[item._id] ?"Add to Cart":"Go to Cart"}</button>
                                </div>
                            </div>
                        ))
                }
            </div>
            <a onClick={()=>{navigate('/product',{state:Type})}} className='btn btn-lsm btn-primary'>More Products</a>
        </div>
    )
}

export default Category