const db=require('../db');
const {getInsertData,getCartData,updateProductQty}=require('../utils');

exports.createOrder=async(req,res)=>
{
    try
    {
        let query=`SELECT qty,product_variant_id FROM cart where user_id = ${req.body.user_id}`
        let cartItems=await db(query)
        if(cartItems!==undefined && cartItems!==null && cartItems.length!==0)
        {
            let {attributes,values,setValueStr}=getInsertData(req.body)
            query=`INSERT INTO orders(${attributes}) values(${setValueStr})`;
            const response=await db(query,values);    
            const orderId=response.insertId

            orderItems = getCartData(cartItems,orderId)
            query=`INSERT INTO order_item(order_id,product_variant_id,qty) VALUES ? `;
            await db(query,[orderItems]);

            updateProductQty('-')
            res.status(200).send("Order Created")    
        }
        else
        {
            res.status(200).send("No Items available in Cart")    
        }
    }
    catch(error)
    {
        res.status(500).send("Internal Server Error!")
    }
}

exports.getOrders=async(req,res)=>
{
    try
    {   
        const user_id=req.params.user_id
        const query=`SELECT * FROM orders,order_item where user_id = ${user_id} and orders.order_id=order_item.order_id`
        const response=await db(query)
        res.status(200).send(response)            
    }
    catch(error)
    {
        res.status(500).send("Internal Server Error!")
    }
}