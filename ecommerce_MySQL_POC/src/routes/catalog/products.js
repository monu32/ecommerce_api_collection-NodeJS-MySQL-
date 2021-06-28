const express=require('express')
const router=express.Router()
const proudctsController=require('../../controllers/catalog/products')

//Products Controller
router.post('/createProduct',proudctsController.createProduct)

router.patch('/updateProduct/:product_id',proudctsController.updateProduct)

router.delete('/deleteProduct/:product_id',proudctsController.deleteProduct)

//Products Variant Controller

router.post('/createProductVariant',proudctsController.createProductVariant)

router.get('/variantProducts/:product_id',proudctsController.getVariantProducts)

router.get('/variantProduct/:product_variant_id',proudctsController.getVariantProduct)

router.patch('/updateVariantProduct/:product_variant_id',proudctsController.updateVariantProduct)

router.delete('/deleteVariantProduct/:product_variant_id',proudctsController.deleteVariantProduct)

module.exports=router