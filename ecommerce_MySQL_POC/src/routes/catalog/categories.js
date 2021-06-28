const express=require('express')
const router=express.Router()
const categoriesController=require('../../controllers/catalog/categories')

router.get('/all',categoriesController.getAllCategories)

router.get('/products/:category_id',categoriesController.getProductsByCategory)

router.post('/createCategory',categoriesController.createCategory)

router.patch('/updateCategory/:category_id',categoriesController.updateCategory)

router.delete('/deleteCategory/:category_id',categoriesController.deleteCategory)

module.exports=router