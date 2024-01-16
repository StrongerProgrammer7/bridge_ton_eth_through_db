const { json } = require('body-parser');
const mysql = require('../../../routers/connectionMySQL');
const ApiError = require('../../../error/ApiError');

const select_hospitals = async (req,res,next) =>
{
    await mysql.promise().query(`SELECT Hospital.id,city,number_hospital FROM Hospital INNER JOIN City ON City.id = Hospital.city_id`)
    .then((result,error) =>
    {
        if(error)
        {
            console.log(error);
            return next(ApiError.internal('Error database bad query: select_hospitals'));
        }
        return res.status(200).json({status:true, data:result[0]});
    })
    .catch((err) => 
    {
        console.log(err);
        return next(ApiError.internal('Error problem with server!'));
    });
    
}

module.exports = select_hospitals;