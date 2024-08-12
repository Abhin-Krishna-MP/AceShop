import productModel from "../models/productModel.js"
import fs from 'fs'

const addProduct = async (req,res)=>{
    try {
        let image_filename = req.file.filename
        let product =await new productModel({
            name:req.body.name,
            image:image_filename,
            price:req.body.price,
            description:req.body.description,
            category:req.body.category
        })
        await product.save()
        res.json({success:true,message:"Product added"})
    } catch (error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

const listProduct = async (req,res) =>{
    try {
        const products =await productModel.find({})
        res.json({success:true,data:products})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

const removeProduct = async (req,res)=>{
    try {
        const product = await productModel.findById(req.body.id)
        fs.unlink(`uploads/${product.image}`,()=>{})
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error "})
    }
}



export {addProduct,listProduct,removeProduct}