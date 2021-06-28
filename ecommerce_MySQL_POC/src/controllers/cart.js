const db=require('../db');
const {getInsertData,availableQty}=require('../utils');

exports.addToCart=async(req,res)=>
{
    try
    {
        const product_variant_id=req.body.product_variant_id
        const resp=await availableQty('product_variant','product_variant_id',product_variant_id)
        if(resp[0].qty >= req.body.qty)
        {
            const {attributes,values,setValueStr}=getInsertData(req.body)
            const query=`INSERT INTO cart(${attributes}) values(${setValueStr})`;
            await db(query,values);
            res.status(200).send("Item added to Cart")    
        } 
        else
            res.status(200).send("Inventory not available for this item")    
    }
    catch(error)
    {
        res.status(500).send("Internal Server Error!")
    }
}

exports.removeFromCart=async(req,res)=>
{
    try
    {
        const cart_id=req.params.cart_id;
        const query=`DELETE FROM cart where cart_id = ${cart_id}`
        await db(query)
        res.status(200).send("Item removed from Cart")    
    }   
    catch(error)
    {
        res.status(500).send("Internal Server Error!")
    }
}

exports.updateCartItem=async(req,res)=>
{
    try
    {
        const qty=req.body.qty
        const cart_id=req.params.cart_id;
        const product_variant_id=req.body.product_variant_id
        const resp=await availableQty('product_variant','product_variant_id',product_variant_id)

        if(resp[0].qty >= qty)
        {
            const query=`UPDATE cart SET qty = ${qty} where cart_id = ${cart_id}`
            await db(query)
            res.status(200).send("Item Updated")    
        }
        else
            res.status(200).send("Inventory not available for this item")
    }
    catch(error)
    {
        res.status(500).send("Internal Server Error!")
    }
}

exports.getCartItems=async(req,res)=>
{
    try
    {
        const user_id=req.params.user_id
        const query=`SELECT cart.product_variant_id,product_image,cart.qty FROM cart,product_variant where cart.product_variant_id=product_variant.product_variant_id and user_id = ${user_id}`
        const response=await db(query)
        res.status(200).send(response)
    }
    catch(error)
    {
        res.status(500).send("Internal Server Error!")
    }
}