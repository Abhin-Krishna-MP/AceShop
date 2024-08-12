import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://AccessKey:1729@cluster0.da8gw.mongodb.net/Ace-shop').then((response)=>console.log("DB connected"))
}