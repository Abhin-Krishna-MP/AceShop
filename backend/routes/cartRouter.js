import express from 'express'
import authMiddleware from '../middleware/auth.js'
import { addCartItem, deleteCartItem, listCartItems, removeCartItem } from '../controllers/cartController.js'


const cartRouter = express.Router()

cartRouter.post('/add',authMiddleware,addCartItem)
cartRouter.post('/remove',authMiddleware,removeCartItem)
cartRouter.post('/get',authMiddleware,listCartItems)
cartRouter.post('/delete',authMiddleware,deleteCartItem)

export default cartRouter