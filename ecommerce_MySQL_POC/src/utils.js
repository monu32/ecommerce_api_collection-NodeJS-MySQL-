const db=require('./db');

const getInsertData=(reqBody)=>
{
    const attributes=Object.keys(reqBody).join(',');
    const values=Object.values(reqBody);
    setValueStr=""
    for(let i=0;i<values.length;i++)
    {
        if(values.length-1==i)
            setValueStr+='?'
        else
            setValueStr+='? , '
    }

    return {attributes,values,setValueStr}
}

const getUpdateData=(reqBody)=>
{
    let columns=Object.keys(reqBody)
    var attributes=""
    var values=[]
    for(let i=0;i<columns.length;i++)
    {
        if(i==columns.length-1)
            attributes+=columns[i]+" = ?"
        else
            attributes+=columns[i]+" = ? ,"                
        values.push(reqBody[columns[i]])
    }

    return {attributes,values}
}

const availableQty=async(tableName,filterAttribte,id)=>
{
    const query=`SELECT qty from ${tableName} where ${filterAttribte} = ${id}`
    const res=await db(query);
    return res;
}

const getCartData=(cartItems,orderId)=>
{
    let orderItems=[]
    for(let i=0;i<cartItems.length;i++)
        orderItems.push([orderId,cartItems[i].product_variant_id,cartItems[i].qty])

    return orderItems
}

const updateProductQty=async (sign)=>
{
    try
    {
        const query=`update product_variant JOIN cart ON product_variant.product_variant_id=cart.product_variant_id 
        set product_variant.qty=(product_variant.qty${sign}cart.qty); `
        await db(query)        
    }
    catch(error)
    {
        res.status(500).send("Internal Server Error!")
    }
}

module.exports={
    getInsertData,
    getUpdateData,
    availableQty,
    getCartData,
    updateProductQty
}