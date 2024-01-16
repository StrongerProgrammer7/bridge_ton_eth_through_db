const mysql = require('../../../routers/connectionMySQL');
const ApiError = require('../../../error/ApiError');

const select_list_doctors_have_access = async (req,res,next) =>
{
    const 
    {
        meta
    } = req.body;
     await mysql.promise().query(`SELECT list_doctors_have_access as list_doc FROM Patient 
     Where account_wallet = ?
     `,[meta])
    .then(async (result,err) =>
    {
        if(err)
            return next(ApiError.internal('Error database bad query: select_list_doctors_have_access'));
        
        if(result[0].length===0)
            return res.status(201).json({status:false, message:"List empty!"})
        else
            return res.status(200).json({data:result[0],message:"Success"});            
        
    })
    .catch((err) => 
    {
        console.log(err);
        return next(ApiError.internal('Error problem with server: select_list_doctors_have_access'));
    });
    
}

module.exports = select_list_doctors_have_access;