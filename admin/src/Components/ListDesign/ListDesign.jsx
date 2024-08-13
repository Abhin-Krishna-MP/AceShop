import React, { useEffect, useState } from 'react'
import './ListDesign.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const ListDesign = () => {
    const url = "http://localhost:4000"
    const [Product_list, setProduct_list] = useState([])
    const fetchData = async () => {
        const response = await axios.get(`${url}/api/product/list`)
        if (response.data.success) {
            console.log(response.data.data)
            setProduct_list(response.data.data)
        } else {
            toast.error(response.data.message)
        }
    }

    const removeHandler = async(id)=>{
        const response = await axios.post(`${url}/api/product/remove`,{"id":id})
        if(response.data.success){
            toast.success(response.data.message)
            fetchData()
        }else{
            toast.error(response.data.message)
        }
    }


    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className='list text-white p-4 table-responsive'>
            <table id='product-table' className="list-table table table-dark table-hover">
                <thead>
                    <tr>
                        <th scope="col">Item</th>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Price</th>
                        <th  scope="col">remove</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Product_list.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td><img className='list-image' src={`${url}/images/${item.image}`} alt="" /></td>
                                    <td>{item.name}</td>
                                    <td>{item.category}</td>
                                    <td>{item.price}</td>
                                    <td className='text-center' role='button' onClick={()=>{removeHandler(item._id)}}>x</td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}

export default ListDesign