const express=require('express')
const router=express.Router()
const ordersController=require('../controllers/orders')

router.post('/createOrder',ordersController.createOrder)

router.get('/getOrders/:user_id',ordersController.getOrders)

module.exports=router