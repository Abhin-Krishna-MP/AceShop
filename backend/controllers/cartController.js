import userModel from "../models/userModel.js"


const addCartItem = async (req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData =await userData.cartItems
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1
        }else{
            cartData[req.body.itemId] +=1
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartItems:cartData})
        res.json({success:true,message:"Product added to cart"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

const removeCartItem = async (req,res)=>{
    try {
        let userData  = await userModel.findById(req.body.userId)
        let cartData  = await userData.cartItems
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartItems:cartData})
        res.json({success:true,message:"Product removed from Cart"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

const listCartItems = async (req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartItems
        res.json({success:true,data:cartData})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

const deleteCartItem = async(req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartItems
        delete cartData[req.body.itemId]
        await userModel.findByIdAndUpdate(req.body.userId,{cartItems:cartData})
        res.json({success:true,message:"Cart item removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}

export {addCartItem,removeCartItem,listCartItems,deleteCartItem}