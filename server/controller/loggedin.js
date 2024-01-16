// @ts-nocheck
const jwt = require("jsonwebtoken");
const { default: ApiError } = require("../error/ApiError");
const mysql = require('../routers/connectionMySQL');
const dotenv = require('dotenv').config();

const loggedIn = (req,res,next) =>
{
    console.log(req.cookies);
    if(!req.cookies.userLoggedIn)
        return next();

    try 
    {
        console.log(req.cookies.userLoggedIn)
        const decoded = jwt.verify(req.cookies.userLoggedIn, process.env.JWT_SECRET);
        console.log(decoded.id)
        if(!decoded.id)
            return next(ApiError.badRequest('Undefined ID (decode.id)'));
        mysql.query('SELECT * FROM Patient WHERE id = ?',[decoded.id],(err,result) =>
        {
            if(err)
                return next(); // next() без аргументов позволяет подобрать любой другой , если нет нужного
            req.user = result[0];
            req.session.isAuth = true;
            //console.log(req.user.id);
            //req.user.id = [decoded.id];
            return next();
        })     
    } catch (err) 
    {   
        if(err)
            return next(ApiError.internal('Bad work with database!'));
    }
}

module.exports = loggedIn;