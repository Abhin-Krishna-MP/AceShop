import React from 'react'
import './OrderDesign.css'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const OrderDesing = () => {
    const url = 'http://localhost:4000'
    const [Order, setOrder] = useState([])
    const fetchAllOrders = async () => {
        const response = await axios.get(url + "/api/order/list")
        if (response.data.success) {
            setOrder(response.data.data)
        } else {
            toast.error('Error')
        }
    }

    const setHandler = async (e,orderId) =>{
        const response = await axios.post(url+'/api/order/status',{
            orderId,
            status:e.target.value
        })
        if(response.data.success){
            toast.success(response.message)
            await fetchAllOrders()
        }
    }

    useEffect(() => {

        fetchAllOrders()
    }, [])

    return (
        <div className='order'>
            <div className="table-responsive order-table p-5">
                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Order</th>
                            <th scope="col">Items</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Address</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Order.map((item, index) => {
                                console.log(item)
                                return (
                                    <tr key={index}>
                                        <td><h1><i className="bi bi-box-seam-fill"></i></h1></td>
                                        <td>{item.items.map((item, index) => { return (<p key={index}>{item.name} x {item.quantity}<br /></p>) })}</td>
                                        <td>{item.amount}</td>
                                        <td>
                                            <p>
                                                {item.address.firstName} {item.address.lastName} <br />
                                                {item.address.street} <br />
                                                {item.address.city} <br />
                                                {item.address.zipcode} <br />
                                                {item.address.email}
                                            </p>
                                        </td>
                                        <td>{item.address.phone}</td>
                                        <td>
                                            <select onChange={(e)=>{setHandler(e,item._id)}} value={item.status} name="" id="">
                                                <option value="Order Processing">Order Processing</option>
                                                <option value="Order Shipped">Order Shipped</option>
                                                <option value="Out for delivery">Out for delivery</option>
                                                <option value="Delivered">Delivered</option>
                                            </select>
                                        </td>
                                    </tr>
                                )
                            })
                        }


                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrderDesing