const db=require('../../db');
const {getInsertData,getUpdateData}=require('../../utils')

//Products Controller

exports.createProduct=async(req,res)=>
{       
    try
    {
        const {attributes,values,setValueStr}=getInsertData(req.body)
        const query=`INSERT INTO products(${attributes}) values(${setValueStr})`;
        await db(query,values);
        res.status(200).send("Product Created")    
    }
    catch(error)
    {
        res.status(500).send("Internal Server Error!")
    }
}

exports.updateProduct=async(req,res)=>
{
    try
    {
        const product_id=req.params.product_id;
        const {attributes,values}=getUpdateData(req.body)
        const query=`UPDATE products SET ${attributes} where product_id = ${product_id}`
        await db(query,values)
        res.status(200).send("Product Updated")    
    }
    catch(error)
    {
        res.status(500).send("Internal Server Error!")
    }
}

exports.deleteProduct=async(req,res)=>
{
    try
    {
        const product_id=req.params.product_id;
        const query='DELETE FROM products where product_id = ?'
        await db(query,product_id)
        res.status(200).send("Product Deleted")    
    }
    catch(error)
    {
        res.status(500).send("Internal Server Error!")
    }
}

//Products Variant Controller

exports.createProductVariant=async(req,res)=>
{
    try
    {
        const {attributes,values,setValueStr}=getInsertData(req.body)
        const query=`INSERT INTO product_variant(${attributes}) values(${setValueStr})`;
        await db(query,values);
        res.status(200).send("Product Variant Created")    
    }
    catch(error)
    {
        res.status(500).send("Internal Server Error!")
    }
}

exports.getVariantProducts=async(req,res)=>
{
    try
    {
        const product_id=req.params.product_id;
        const attributes=JSON.parse(req.query.attributes).join(',')
        const query=`SELECT ${attributes} FROM product_variant where product_id=${product_id}`;
        const response=await db(query)
        res.status(200).json(response)
    }
    catch(error)
    {
        res.status(500).send("Internal Server Error!")
    }
}

exports.getVariantProduct=async(req,res)=>
{
    try
    {
        const product_variant_id=req.params.product_variant_id;
        const attributes=JSON.parse(req.query.attributes).join(',')
        const query=`SELECT ${attributes} FROM product_variant where product_variant_id=${product_variant_id}`;
        const response=await db(query)
        res.status(200).json(response)
    }
    catch(error)
    {
        res.status(500).send("Internal Server Error!")
    }
}

exports.updateVariantProduct=async(req,res)=>
{
    try
    {
        const product_variant_id=req.params.product_variant_id;
        const {attributes,values}=getUpdateData(req.body)
        const query=`UPDATE product_variant SET ${attributes} where product_variant_id = ${product_variant_id}`
        await db(query,values)
        res.status(200).send("Variant Product Updated")    
    }
    catch(error)
    {
        res.status(500).send("Internal Server Error!")
    }
}

exports.deleteVariantProduct=async(req,res)=>
{
    try
    {
        const product_variant_id=req.params.product_variant_id;
        const query='DELETE FROM product_variant where product_variant_id = ?'
        await db(query,product_variant_id)
        res.status(200).send("Variant Product Deleted")    
    }
    catch(error)
    {
        res.status(500).send("Internal Server Error!")
    }
}