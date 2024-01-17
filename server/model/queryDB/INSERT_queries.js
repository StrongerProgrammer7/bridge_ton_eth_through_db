const query_db = require('./query_db');
const ApiError = require('../../error/ApiError');

const insert_to_db = async (query,data,res,next,message) =>
{
    query_db(query, [...data ])
    .then((result) => 
    {
        return res.status(201).json({status:200, message:message});
    })
    .catch((err) => 
    {
        console.error(err);
        console.log(err.sqlMessage);
        return next(ApiError.internal('Internal error with database'));
    });
}

module.exports = insert_to_db;