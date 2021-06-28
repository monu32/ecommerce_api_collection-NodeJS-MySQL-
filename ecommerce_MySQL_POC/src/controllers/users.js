const db=require('../db');
const {getInsertData,getUpdateData}=require('../utils')

//User
exports.createUser=async(req,res)=>
{
    try
    {
        const {attributes,values,setValueStr}=getInsertData(req.body)
        const query=`INSERT INTO users(${attributes}) values(${setValueStr})`;
        await db(query,values);
        res.status(200).send("User Created")    
    }
    catch(error)
    {
        res.status(500).send("Internal Server Error!")
    }
}

exports.getAllUsers=async(req,res)=>
{
    try
    {
        const attributes=JSON.parse(req.query.attributes).join(',')
        const sortBy=req.query.sortBy
        const query=`SELECT ${attributes} FROM users ORDER BY ${sortBy}`;
        const response=await db(query);
        res.status(200).send(response)    
    }
    catch(error)
    {
        res.status(500).send("Internal Server Error!")
    }   
}

exports.getUser=async(req,res)=>
{
    try
    {
        const user_id=req.params.user_id;
        const attributes=JSON.parse(req.query.attributes).join(',')
        const query=`SELECT ${attributes} FROM users where user_id = ${user_id}`
        const response=await db(query)
        res.status(200).send(response)
    }
    catch(error)
    {
        res.status(500).send("Internal Server Error!")
    }
}

exports.updateUser=async(req,res)=>
{
    try
    {
        const user_id=req.params.user_id;
        const {attributes,values}=getUpdateData(req.body)
        const query=`UPDATE users SET ${attributes} where user_id = ${user_id}`
        await db(query,values)
        res.status(200).send("User Updated")    
    }
    catch(error)
    {
        res.status(500).send("Internal Server Error!")
    }
}

exports.deleteUser=async(req,res)=>
{
    try
    {
        const user_id=req.params.user_id
        const query=`DELETE FROM users where user_id=${user_id}`
        await db(query)
        res.status(200).send("User Deleted")
    }
    catch(error)
    {
        res.status(500).send("Internal Server Error!")
    }
}

//Address

exports.addAddress=async(req,res)=>
{
    try
    {
        const user_id=req.params.user_id
        const {attributes,values,setValueStr}=getInsertData(req.body)
        const query=`INSERT INTO address(${attributes},user_id) values(${setValueStr},${user_id})`;
        await db(query,values);
        res.status(200).send("Address added")
    }
    catch(error)
    {
        res.status(500).send("Internal Server Error!")
    }
}

exports.updateAddress=async(req,res)=>
{
    try
    {
        const address_id=req.params.address_id
        const {attributes,values}=getUpdateData(req.body)
        const query=`UPDATE address SET ${attributes} where address_id = ${address_id}`
        await db(query,values)
        res.status(200).send("Address Updated")    
    }
    catch(error)
    {
        res.status(500).send("Internal Server Error!")
    }
}

exports.removeAddress=async(req,res)=>
{
    try
    {
        const address_id=req.params.address_id
        const query=`DELETE FROM address where address_id=${address_id}`
        await db(query)
        res.status(200).send("Address Removed")
    }
    catch(error)
    {
        res.status(500).send("Internal Server Error!")
    }
}

exports.getAddress=async(req,res)=>
{
    try
    {
        const user_id=req.params.user_id
        const query=`SELECT * FROM address where user_id=${user_id}`
        const response=await db(query)
        res.status(200).send(response)
    }
    catch(error)
    {
        res.status(500).send("Internal Server Error!")
    }
}