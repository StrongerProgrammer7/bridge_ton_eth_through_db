const { json } = require('body-parser');
const ApiError = require('../../../error/ApiError');
const mysql = require('../../../routers/connectionMySQL');


const select_all_info_aboutPatient = async (req,res,next) =>
{
    const
    {
        meta
    }= req.body;
    if(!meta)
        return next(ApiError.badRequest('You are missing account wallet'));
    await mysql.promise().query(`SELECT name,surname,lastname,mail,phone,insurance_policy,datebirthd, c1.city as city, residence.city as addressResidence FROM Patient 
    INNER JOIN City c1 ON c1.id = Patient.city_id
    INNER JOIN City residence ON residence.id = Patient.address_of_residence
    WHERE Patient.account_wallet = ?`,[meta])
    .then((result,error) =>
    {
        if(error)
        {
            return next(ApiError.internal('Error: with get result select'));
        }
        return res.status(200).json({status:true, data:result[0]});
    })
    .catch((err) => 
    {
        console.log(err);
        return next(ApiError.internal('Error: select_all_info_aboutPatient'));
    });
    
}

module.exports = select_all_info_aboutPatient;