const db=require('../db')
const {getInsertData}=require('../utils');

exports.addToWishlist=async(req,res)=>
{
    try
    {
        const {attributes,values,setValueStr}=getInsertData(req.body)
        const query=`INSERT INTO wishlist(${attributes}) values(${setValueStr})`;
        await db(query,values);
        res.status(200).send("Item added to Wishlist")    
    }
    catch(error)
    {
        res.status(500).send("Internal Server Error!")
    }
}

exports.removeFromWishlist=async(req,res)=>
{
    try
    {
        const wishlist_id=req.params.wishlist_id;
        const query=`DELETE FROM wishlist where wishlist_id = ${wishlist_id}`
        await db(query)
        res.status(200).send("Removed from Wishlist")
    }
    catch(error)
    {
        res.status(500).send("Internal Server Error!")
    }
}

exports.getWishlistItems=async(req,res)=>
{
    try
    {
        const user_id=req.params.user_id
        const query=`SELECT * FROM wishlist,product_variant where wishlist.product_variant_id=product_variant.product_variant_id and user_id = ${user_id}`
        const response=await db(query)
        res.status(200).send(response)
    }
    catch(error)
    {
        res.status(500).send("Internal Server Error!")
    }
}