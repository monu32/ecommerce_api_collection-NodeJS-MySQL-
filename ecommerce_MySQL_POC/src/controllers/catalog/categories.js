const db = require("../../db");
const {getUpdateData}=require('../../utils')

exports.getAllCategories=async(req,res)=>
{
    try
    {
        let attributes=JSON.parse(req.query.attributes);
        attributes=attributes.join(',')
        const query=`SELECT ${attributes} FROM categories`;

        const response=await db(query)
        res.status(200).json(response)
    }
    catch(error)
    {
        res.status(500).send("Internal Server Error!")
    }
}

exports.getProductsByCategory=async(req,res)=>
{
    try
    {
        let attributes=JSON.parse(req.query.attributes);
        attributes=attributes.join(',')
        const category_id=req.params.category_id;
        
        const query=`SELECT ${attributes} FROM products where category_id = ${category_id}`;
        const response=await db(query)
        res.status(200).json(response)
    }
    catch(error)
    {
        res.status(500).send("Internal Server Error!")
    }
}


exports.createCategory=async(req,res)=>
{
    try
    {
        const category_name=req.body.category_name
        const query='INSERT INTO categories(category_name) values(?)'
        await db(query,category_name)
        res.status(200).send("Category Created")
    }
    catch(error)
    {
        res.status(500).send("Internal Server Error!")
    }
}

exports.updateCategory=async(req,res)=>
{
    try
    {
        const category_id=req.params.category_id;
        const {attributes,values}=getUpdateData(req.body)
        const query=`UPDATE categories SET ${attributes} where category_id = ${category_id}`
        await db(query,values)
        res.status(200).send("Category Updated")    
    }
    catch(error)
    {
        res.status(500).send("Internal Server Error!")
    }
}

exports.deleteCategory=async(req,res)=>
{
    try
    {
        const category_id=req.params.category_id;
        const query="DELETE FROM categories where category_id = ?"
        await db(query,category_id)
        res.status(200).send("Category Deleted")
    }
    catch(error)
    {
        res.status(500).send("Internal Server Error!")
    }
}