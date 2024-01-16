const { json } = require('body-parser');
const ApiError = require('../../../error/ApiError');
const mysql = require('../../../routers/connectionMySQL');


const select_all_info_aboutDoctor = async (req,res,next) =>
{
    const
    {
        meta
    }= req.body;
    await mysql.promise().query(`SELECT id,contacts_id,hospital_id,category,profession,surname,name,lastname,phone,mail FROM Doctor
    WHERE Doctor.account_wallet = ?`,[meta])
    .then((result,error) =>
    {
        if(error)
            return next(ApiError.internal('Error database bad query: select_all_info_aboutDoctor'));
        
        return res.status(200).json({status:true, data:result[0]});
    })
    .catch((err) => 
    {
        console.log(err);
        return next(ApiError.internal('Error : Problem with server!'));
    });
    
}

module.exports = select_all_info_aboutDoctor;