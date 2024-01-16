
const mysql = require('../../../routers/connectionMySQL');
const ApiError = require('../../../error/ApiError');


const query_db = async (qeury) =>
{
    return mysql.promise().query(qeury)   
}

module.exports = query_db;