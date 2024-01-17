// @ts-nocheck
const jwt = require("jsonwebtoken");
const query_db = require('../controller/queryDB/query_db');
const { getDataAboutPerson } = require('./queryDB/POST_queries');
const bcrypt = require("bcrypt");
const { default: ApiError } = require('../error/ApiError');

const login = async (req,res,next) =>
{
    const 
    {
        meta,
        pass,
        isDoctor
    } = req.body;
    if(meta === undefined || meta === '' || pass ===undefined || pass === '')
    {
        return next(ApiError.badRequest('Error: Not correct input data'));
    }else
    {
        if(isDoctor===false)
        {
            signIn(getDataAboutPerson('*','Patient'),res,meta,pass,next);
        }else
        {
            signIn(getDataAboutPerson('*','Doctor') ,res,meta,pass,next);
        }
    }
}

async function signIn(query_check,res,meta,pass,next)
{
    query_db(query_check,[meta])
    .then((result,error) =>
    {
        if(error)
            return next(ApiError.internal('Error database: signIn'));
        return result[0];
    })
    .then(async (human)=>
    {
        let validPassword = await bcrypt.compare(pass,human[0].password);
        if(human.length===0 || !validPassword)
        {
            return next(ApiError.badRequest('Error: You are not registred or not correct password'));
        }else
        {
            const token = jwt.sign({id: human[0].id}, process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRES
                });
            const cookieOption =
            {
                expiresIn: new Date(Date.now() + this.process.env.COOKIE_EXPIRES),
                httpOnly: true,
                secure:true
            }
            res.cookie("userLoggedIn",token,cookieOption);
            return res.status(201).json({status:true,message:"User has been logged in"});
        }
    })
    .catch((err) => 
     {
        console.log(err);
        return next(ApiError.internal('Error: signIn'));
     });
}

module.exports = login;