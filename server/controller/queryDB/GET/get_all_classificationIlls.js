const { json } = require('body-parser');
const mysql = require('../../../routers/connectionMySQL');
const ApiError = require('../../../error/ApiError');


const get_allClassification = async (req,res,next) =>
{
    await mysql.promise().query(`SELECT * FROM Classification`)
    .then((result,error) =>
    {
        if(error)
            return next(ApiError.internal('Error database bad query: get_allClassification'));
        return res.status(200).json({status:true, data:result[0]});
    })
    .catch((err) => 
    {
        console.log(err);
        return next(ApiError.internal('Error problem with server'));
    });
    
}

module.exports = get_allClassification;