
const mysql = require('../../routers/connectionMySQL');

const query_db = async (query,data=[]) =>
{
    return mysql.promise().query(query,[...data]);   
}

module.exports = query_db;