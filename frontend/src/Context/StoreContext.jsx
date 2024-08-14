import { createContext, useState } from "react";

import { useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const storeContext = createContext(null)

function StoreContextProvider({ children }) {
    const [Category, setCategory] = useState("All")
    const [CartItems, setCartItems] = useState({})
    const [product_list, setproduct_list] = useState([])
    const [Token, setToken] = useState('')
    const url = 'http://localhost:4000'
    const navigate = useNavigate()
    const cartHandler = async (id) => {
        if (CartItems[id] === 1) {
            navigate('/cart')
        }
        setCartItems({ ...CartItems, [id]: 1 })
        let response = await axios.post(url + "/api/cart/add", { itemId: id }, { headers: { token: Token } })
    }
    const quantityInc = async (id) => {
        setCartItems({ ...CartItems, [id]: CartItems[id] + 1 })
        let response = await axios.post(url + "/api/cart/add", { itemId: id }, { headers: { token: Token } })
    }

    const quantityDec = async (id) => {
        if (CartItems[id] > 0) {
            setCartItems({ ...CartItems, [id]: CartItems[id] - 1 })
            let response = await axios.post(url + "/api/cart/remove", { itemId: id }, { headers: { token: Token } })
        } else {
            let response = await axios.post(url + "/api/cart/delete", { itemId: id }, { headers: { token: Token } })
        }

    }

    const removeCartItem = async (id) => {
        setCartItems({ ...CartItems, [id]: CartItems[id] = 0 })
        let response = await axios.post(url + "/api/cart/delete", { itemId: id }, { headers: { token: Token } })
    }


    const cartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } })
        setCartItems(response.data.data)
        console.log(response.data)
    }   

    const fetchData = async () => {
        const response = await axios.get(`${url}/api/product/list`)
        setproduct_list(response.data.data)
        console.log(response.data.data)
    }



    useEffect(() => {
        async function loadData() {
            if (localStorage.getItem('token')) {
                setToken(localStorage.getItem('token'))
                await cartData(localStorage.getItem('token'))
            }
            await fetchData()
        }
        loadData()
    }, [])

    const getTotalAmount = () => {
        let totalAmount = 0
        for (const item in CartItems) {
            console.log(item)
            if (CartItems[item] > 0) {
                let itemInfo = product_list.find((product) => product._id === item)
                if(itemInfo){

                    totalAmount += itemInfo.price * CartItems[item]
                }
            }
        }
        return totalAmount
    }

    const contextValue = {
        setCategory,
        Category,
        product_list,
        CartItems,
        setCartItems,
        quantityInc,
        quantityDec,
        removeCartItem,
        getTotalAmount,
        setToken,
        Token,
        url,
        cartHandler,
        cartData
    }
    return (
        <storeContext.Provider value={contextValue}>
            {children}
        </storeContext.Provider>
    )
}

export default StoreContextProvider