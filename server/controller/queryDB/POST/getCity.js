const { json } = require('body-parser');
const ApiError = require('../../../error/ApiError');
const mysql = require('../../../routers/connectionMySQL');


const selectCity_patient = async (req,res,next) =>
{
    const
    {
        meta
    }= req.body;
    await mysql.promise().query(`SELECT city FROM Patient
    INNER JOIN City ON City.id = Patient.city_id
    WHERE Patient.account_wallet = ?`,[meta])
    .then((result,error) =>
    {
        if(error)
        {
            console.log(error);
            return next(ApiError.internal('Error bad query: get cities'));
        }
        return res.status(200).json({status:true, data:result[0][0].city});
    })
    .catch((err) => 
    {
        console.log(err);
        return next(ApiError.internal('Error: get cities'));
    });
    
}

module.exports = selectCity_patient;