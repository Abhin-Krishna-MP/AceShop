import { createContext, useState } from "react";
import {product_list} from '../assets/asset'

export const storeContext = createContext(null)

function StoreContextProvider({children}){
    const [CartItems, setCartItems] = useState({})
    const quantityInc = (id) =>{
        setCartItems({...CartItems,[id]:CartItems[id]+1})
    }

    const quantityDec =  (id)=>{
        if(CartItems[id]>1){
            setCartItems({...CartItems,[id]:CartItems[id]-1})
        }else{
            removeCartItem(id)
        }
        
    }

    const removeCartItem = (id)=>{
        setCartItems({...CartItems,[id]:0})
    }
    
    const getTotalAmount = ()=>{
        let totalAmount = 0 
        for(const item in CartItems){
            if(CartItems[item]>0){
                let itemInfo = product_list.find((product)=>product._id===item)
                totalAmount+= itemInfo.price * CartItems[item]
            }
        }
        return totalAmount
    }
    
    
    const contextValue = {
        product_list,
        CartItems,
        setCartItems,
        quantityInc,
        quantityDec,
        removeCartItem,
        getTotalAmount
    }
    return(
    <storeContext.Provider value={contextValue}>
        {children}
    </storeContext.Provider>
    )
}

export default StoreContextProvider