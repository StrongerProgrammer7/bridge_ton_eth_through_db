// @ts-nocheck
const { json } = require('body-parser');
const mysql = require('../routers/connectionMySQL');
const bcrypt = require("bcrypt");
const ApiError = require('../error/ApiError');


const register = async (req,res,next) =>
{
    const 
    {
        name, 
        surname,
        email,
        meta,
        account_contract,
        password,
        isDoctorRegistering
    } = req.body;

    if(!meta || !password || !name || !surname || !email || !account_contract)
    {
        return next(ApiError.badRequest('Вы забыли ввести имя/фамилию/почту/пароль/аккаунт кошелька (мб проблемы с кошельком?). Либо при создании контракта произошла ошибка'));
    }
    if(isDoctorRegistering === false)
    {
        registerPatient(req,res,next);
    }else
    {
        registerDoctor(req,res,next);
    }
}


async function registerPatient(req,res,next)
{
    const 
    {
        name, 
        surname,
        lastname,
        addressOfResidence,
        addressRegistered,
        insurancePolicy,
        phone,
        email,
        bdate,
        meta,
        password,
        name_wallet,
        account_contract
    } = req.body;

    await mysql.promise().query(`Select id FROM Patient WHERE mail = ? OR account_wallet  = ?`,[email,meta])
    .then(res =>
    {
        //console.log(res[0].length);
        if(res[0].length!==0)
            return next(ApiError.badRequest('Вы ранее регистрировались уже')); 
    })
    .then(async function() 
        {
            const pass_hash = bcrypt.genSalt(10,(err,salt)=>
            {
                bcrypt.hash(password,10, async (err,hash)=>
                {
                    if(err)
                        return next(ApiError.internal('Internal error with hash password'));

                    await mysql.promise().query(`INSERT INTO Patient(city_id,surname,name,lastname,phone,mail,
                        account_wallet,isPartInformation_hidden,address_of_residence,insurance_policy,datebirthd,password,name_wallet,account_contract,password_test) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                        [addressRegistered,surname,name,lastname,phone, email,meta,1,
                            addressOfResidence,insurancePolicy,bdate,hash,name_wallet,account_contract,password ])
                        .then((result) => 
                        {
                            return res.status(201).json({status:200, success:" Регистрация прошла успешно! "});
                        })
                        .catch((err) => 
                        {
                            console.error(err);
                            console.log(err.sqlMessage);
                            return next(ApiError.internal('Internal error with database'));
                        });
                })
            })
        })
    .catch(err =>console.log(err));
}

async function registerDoctor(req,res,next)
{
    const 
    {
        name, 
        surname,
        lastname,
        contacts_id,
        hospital_id,
        category,
        profession,
        email,
        phone,
        meta,
        password,
        name_wallet,
        account_contract
    } = req.body;
    await mysql.promise().query(`Select id FROM Doctor WHERE mail = ? OR account_wallet  = ?`,[email,meta])
    .then(res =>
    {
        //console.log(res[0].length);
        if(res[0].length!==0)
            return next(ApiError.badRequest('Вы ранее регистрировались уже')); 
    })
    .then(async function() 
        {
            const pass_hash = bcrypt.genSalt(10,(err,salt)=>
            {
                bcrypt.hash(password,10, async (err,hash)=>
                {
                    if(err)
                        return next(ApiError.internal('Internal error with hash password'));
                    
                    await mysql.promise().query(`INSERT INTO Doctor(contacts_id,surname,name,lastname,phone,mail,
                        account_wallet,hospital_id,category,profession,password,name_wallet,account_contract,password_test) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                        [contacts_id,surname,name,lastname,phone, email,meta,hospital_id,category,profession,hash,name_wallet,account_contract,password ])
                        .then((result) => 
                        {
                            return res.status(201).json({status:"success", success:" Регистрация прошла успешно "});
                        })
                        .catch((err) => 
                        {
                            console.err(err);
                            console.log(err.sqlMessage);
                            return next(ApiError.internal('Internal error with database'));
                        });
                })
            })
        })
    .catch(err =>console.log(err));
}

module.exports = register;