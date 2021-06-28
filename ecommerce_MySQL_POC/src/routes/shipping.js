const express=require('express')
const router=express.Router()
const shippingController=require('../controllers/shipping')

router.post('/createShipping',shippingController.createShipping)

router.patch('/updateShippingStatus',shippingController.updateShippingStatus)

module.exports=router