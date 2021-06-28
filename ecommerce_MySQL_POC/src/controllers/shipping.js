const db=require('../db');
const {getInsertData,updateProductQty}=require('../utils');

exports.createShipping=async(req,res)=>
{
    try
    {
        const {attributes,values,setValueStr}=getInsertData(req.body)
        query=`INSERT INTO shipping(${attributes}) values(${setValueStr})`;
        await db(query,values);    
        res.status(200).send("Order dispatched for shipment")
    }
    catch(error)
    {
        res.status(500).send("Internal Server Error!")
    }
}

exports.updateShippingStatus=async(req,res)=>
{
    try
    {
        const shipping_id=req.body.shipping_id;
        const order_id=req.body.order_id
        const user_id=req.body.user_id
        const shippingStatus=req.body.shipping_status

        let query=`SELECT shipping_status FROM shipping where shipping_id = ${shipping_id}`
        const status=await db(query)
        if(status[0].shipping_status!=='cancelled' && status[0].shipping_status!=='fullfilled')
        {
            query=`UPDATE shipping SET shipping_status = '${shippingStatus}' where shipping_id = ${shipping_id}`
            await db(query)

            if(shippingStatus==="fullfilled")
            {
                query=`UPDATE orders SET order_status = '${shippingStatus}' where order_id = ${order_id}`
                await db(query)

                query=`DELETE FROM cart where user_id = ${user_id}`
                await db(query)    
            }
            else
            {
                // If not fullfilled or cancelled
                updateProductQty('+')

                query=`UPDATE orders SET order_status = '${shippingStatus}' where order_id = ${order_id}`
                await db(query)    
            }
        }
        res.status(200).send("Shipping Status updated")
    }
    catch(error)
    {
        res.status(500).send("Internal Server Error!")
    }
}
