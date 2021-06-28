const express=require('express')
const productsRoutes=require('./routes/catalog/products')
const categoriesRoutes=require('./routes/catalog/categories')
const userRoute=require('./routes/users')
const cartRoute=require('./routes/cart')
const wishlistRoute=require('./routes/wishlist')
const ordersRoute=require('./routes/orders')
const shippingRoute=require('./routes/shipping')

require('dotenv').config({path:'./config/.env'})

const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/products',productsRoutes)
app.use('/categories',categoriesRoutes)
app.use('/user',userRoute)
app.use('/cart',cartRoute)
app.use('/wishlist',wishlistRoute)
app.use('/orders',ordersRoute)
app.use('/shipping',shippingRoute)

const PORT=process.env.PORT || 3030
app.listen(PORT,console.log(`Server is starting at ${PORT}`))
