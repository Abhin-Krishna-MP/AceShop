import Razorpay from 'razorpay'
import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';

var instance = new Razorpay({
    key_id: 'rzp_test_I9gB04XEiTHhvY',
    key_secret: '3dFJB197mqGjSR3PH64s1yrF',
  });

const placeOrder = async(req,res)=>{
    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })

        const order = await newOrder.save()
        await userModel.findByIdAndUpdate(order.userId,{cartItems:{}})

        instance.orders.create({
            amount: order.amount*100,
            currency: "INR",
            receipt: ""+order._id
            },(err,data)=>{
                if(err){
                    console.log(err)
                    return res.json({success:false,message:"Error"})
                }
                console.log(data)
                res.json({success:true,orderData:data,orderId:order._id})
            })
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}

const verifyOrder = async(req,res)=>{
    const {orderId,success} = req.body
    try {
        if(success==='true'){
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            res.json({success:true,message:"Paid"})
        }else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false,message:"Not paid"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

const userOrder = async (req,res) => {
    try {
        const orders = await orderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

const listOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({})
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

const updateStatus = async (req,res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"Status updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}


export {placeOrder,verifyOrder,userOrder,listOrders,updateStatus}