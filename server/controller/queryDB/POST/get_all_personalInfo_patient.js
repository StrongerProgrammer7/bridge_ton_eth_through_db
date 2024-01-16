const { json } = require('body-parser');
const ApiError = require('../../../error/ApiError');
const mysql = require('../../../routers/connectionMySQL');
const query_db = require('../query_db');
const { getAllInfoAboutPatient } = require('../POST_queries');

const get_all_info_aboutPatient = async (req,res,next) =>
{
    const
    {
        meta
    }= req.body;
    if(!meta)
        return next(ApiError.badRequest('You are missing account wallet'));
    query_db(getAllInfoAboutPatient,[meta])
    .then((result,error) =>
    {
        if(error)
        {
            console.log(error);
            return next(ApiError.internal('Error: with get result select'));
        }
        return res.status(200).json({status:true, data:result[0]});
    })
    .catch((err) => 
    {
        console.log(err);
        return next(ApiError.internal('Error: get_all_info_aboutPatient'));
    });
    
}

module.exports = get_all_info_aboutPatient;