import React, { useEffect, useState } from 'react'
import './AddDesign.css'
import axios from 'axios'
import {toast} from 'react-toastify'

const AddDesign = () => {
    const url = "https://aceshop-backend.onrender.com"
    const [Image, setImage] = useState(false)
    const [Data, setData] = useState({
        name: '',
        price: '',
        description: '',
        category: 'Electronics'
    })

    const onChangeHandler = (e) => {
        const name = e.target.name
        const value = e.target.value
        setData({ ...Data, [name]: value })
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', Data.name)
        formData.append('image', Image)
        formData.append('price', Data.price)
        formData.append('description', Data.description)
        formData.append('category', Data.category)
        const response = await axios.post(`${url}/api/product/add`, formData)
        if (response.data.success) {
            setData({
                name: '',
                price: '',
                description: '',
                category: Data.category
            })
            setImage(false)
            toast.success(response.data.message)
        }else{
            toast.error(response.data.message)
        }
    }

    useEffect(() => {
        console.log(Image)
    }, [Image])

    return (
        <div className='add text-white'>
            <form className='add-form'>
                <div className="form-image">
                    <label htmlFor="image">
                        {
                            Image ? <img className='label-image' src={URL.createObjectURL(Image)} alt="" /> :
                                <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor" className="bi bi-card-image" viewBox="0 0 16 16">
                                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                    <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z" />
                                </svg>
                        }

                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                </div>
                <div className="form-input">
                    <p>Product name</p>
                    <input onChange={onChangeHandler} value={Data.name} placeholder='Name' type="text" name='name' required />
                </div>
                <div className="form-input">
                    <p>Product Description</p>
                    <textarea onChange={onChangeHandler} value={Data.description} placeholder='Description' name="description" rows="6"></textarea>
                </div>
                <div className="form-input">
                    <div className="add-category">
                        <p>Product category</p>
                        <select onChange={onChangeHandler} value={Data.category} name="category">
                            <option value="Electronics">Electronics</option>
                            <option value="Fashion">Fashion</option>
                            <option value="Appliances">Appliances</option>
                            <option value="Toys">Toys</option>
                            <option value="Beauty">Beauty</option>
                        </select>
                    </div>
                    <div className="form-input">
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} placeholder='price' value={Data.price} type="Number" name="price" required />
                    </div>
                </div>
                <button type='submit' onClick={onSubmitHandler} className='add-btn'>ADD</button>
            </form>
        </div>
    )
}

export default AddDesign
