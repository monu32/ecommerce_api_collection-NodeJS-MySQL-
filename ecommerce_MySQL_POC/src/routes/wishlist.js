const express=require('express')
const router=express.Router()
const wishlistController=require('../controllers/wishlist')

router.post('/addToWishlist',wishlistController.addToWishlist)

router.delete('/removeFromWishlist/:wishlist_id',wishlistController.removeFromWishlist)

router.get('/getWishlistItems/:user_id',wishlistController.getWishlistItems)

module.exports=router