const express=require('express')
const router=express.Router()
const cartController=require('../controllers/cart')

router.post('/addToCart',cartController.addToCart)

router.delete('/removeFromCart/:cart_id',cartController.removeFromCart)

router.patch('/updateCartItem/:cart_id',cartController.updateCartItem)

router.get('/getCartItems/:user_id',cartController.getCartItems)

module.exports=router