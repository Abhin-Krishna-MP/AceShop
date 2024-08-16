import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { storeContext } from '../../Context/StoreContext'
import './MyOrderDes.css'

const MyOrderDes = () => {
    const { url, Token } = useContext(storeContext)
    const [Data, setData] = useState([])
    const fetchOrders = async () => {
        console.log(Token)
        const response = await axios.post(url + "/api/order/userorders", {}, {headers: {token: Token} })
        setData(response.data.data) 
        console.log(response.data.data)
    }

    const trackHandler = ()=>{
        fetchOrders()
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    return (
        <div className='my-orders p-5'>
            <div className="order-table table-responsive">
                <table className=" table table-dark table-striped">
                    <thead>

                        <tr>
                            <th scope="col">Items</th>
                            <th scope="col">Address</th>
                            <th scope="col">Amount</th>
                            <th scope="col">status</th>
                            <th scope="col">Track</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                          Data ?  Data.toReversed().map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.items.map((item,index)=>{return(item.name)})}</td>
                                        <td>
                                            <p>
                                                {item.address.street} <br />
                                                {item.address.city  },{item.address.state} <br />
                                                {item.address.zipcode}
                                            </p>
                                        </td>
                                        <td>{item.amount}</td>
                                        <td>{item.status}</td>
                                        <td><a onClick={()=>{fetchOrders()}} className='btn btn-light'>Track Order</a></td>
                                    </tr>
                                )
                            }) :''
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MyOrderDes