import jkt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import validator from 'validator'
import bcrypt from 'bcrypt'

const createToken = (id)=>{
    return jkt.sign({id},process.env.JKY_SECRET)
}

const register = async (req,res)=>{
   const {name,email,password} = req.body
   try {
    const Checkuser = await userModel.findOne({email})
    if(Checkuser){
        return res.json({success:false,message:"User already exist"})
    }
    if(!validator.isEmail(email)){
        return res.json({success:false,message:"Please enter a valid email"})
    }
    if(password.length<8){
        return res.json({success:false,message:"Please enter a strong password"})
    }

    const salt = await  bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt)
    const newUser = new userModel({
        name:name,
        email:email,
        password:hashPassword
    })

    const user = await newUser.save()
    const token = createToken(user._id)
    res.json({success:true,token})

   } catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
   }
}


const login = async (req,res)=>{
   const {email,password}  = req.body
   try {
       const user = await userModel.findOne({email})
       if(!user){
        return res.json({success:false,message:"User does not exist"})
       }
       const isMatch =await bcrypt.compare(password,user.password)
       if(!isMatch){
        return res.json({success:false,message:"Invalid credentials"})
       }
       const token = createToken(user._id)
       res.json({success:true,token})
   } catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
   }
}


export {register,login}