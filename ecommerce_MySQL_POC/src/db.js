const mysql=require('mysql')

const db=async(query,data={})=>
{
    return new Promise((resolve,reject)=>{    
        try
        {        
            const connection=mysql.createConnection({
                host:process.env.DATABASE_HOST,
                user:process.env.DATABASE_USER,
                database:process.env.DATABASE_NAME
            });
            
            connection.query(query,data,(err,res)=>{
                if(err)
                    reject("Query Error!!!")

                connection.end()
                resolve(res)
                });
        }
        catch(error)
        {
            reject("Error!!!")
        }   
    })       
} 

module.exports=db;