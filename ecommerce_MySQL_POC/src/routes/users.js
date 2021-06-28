const express=require('express')
const router=express.Router()
const userController=require('../controllers/users')
const { route } = require('./orders')

//User
router.post('/createUser',userController.createUser)

router.get('/getAllUsers',userController.getAllUsers)

router.get('/getUser/:user_id',userController.getUser)

router.patch('/updateUser/:user_id',userController.updateUser)

router.delete('/deleteUser/:user_id',userController.deleteUser)

//Address

router.post('/addAddress/:user_id',userController.addAddress)

router.patch('/updateAddress/:address_id',userController.updateAddress)

router.delete('/removeAddress/:address_id',userController.removeAddress)

router.get('/getAddress/:user_id',userController.getAddress)

module.exports=router;