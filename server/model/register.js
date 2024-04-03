// @ts-nocheck
const bcrypt = require("bcrypt");
const { default: ApiError } = require("../error/ApiError");
const query_db = require('./queryDB/query_db');
const { getData } = require('./queryDB/GET_queries');
const insert_to_db = require('./queryDB/INSERT_queries');


const register = async (req, res, next) =>
{
    const
        {
            name,
            surname,
            email,
            meta,
            account_contract,
            password
        } = req.body;

    if (!meta || !password || !name || !surname || !email || !account_contract)
        return next(ApiError.badRequest('Вы забыли ввести имя/фамилию/почту/пароль/аккаунт кошелька (мб проблемы с кошельком?). Либо при создании контракта произошла ошибка'));
    const data =
    {
        ...req.body
    }
    registerPerson(res, next, data);
}

async function registerPerson(res, next, data)
{
    const queryGetIdPerson = data.isDoctorRegistering === false ? getData('id', 'Patient', 'mail = ? OR account_wallet  = ?') : getData('id', 'Doctor', 'mail = ? OR account_wallet  = ?');

    query_db(queryGetIdPerson, [data.email, data.meta])
        .then(res =>
        {
            if (res[0].length !== 0)
                return next(ApiError.badRequest('Вы ранее регистрировались уже'));
        })
        .then(async function () 
        {
            const pass_hash = bcrypt.genSalt(10, (err, salt) =>
            {
                bcrypt.hash(data.password, 10, async (err, hash) =>
                {
                    if (err)
                        return next(ApiError.internal('Internal error with hash password'));
                    const queryInsertPerson = data.isDoctorRegistering === false ?
                        `INSERT INTO Patient(city_id,surname,name,lastname,phone,mail,
                        account_wallet,isPartInformation_hidden,address_of_residence,insurance_policy,datebirthd,password,name_wallet,account_contract,password_test) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
                        :
                        `INSERT INTO Doctor(contacts_id,surname,name,lastname,phone,mail,
                        account_wallet,hospital_id,category,profession,password,name_wallet,account_contract,password_test) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

                    const prepare_data_db = data.isDoctorRegistering === false ?
                        [data.addressRegistered,
                        data.surname,
                        data.name,
                        data.lastname,
                        data.phone,
                        data.email,
                        data.meta,
                            1,
                        data.addressOfResidence,
                        data.insurancePolicy,
                        data.bdate,
                            hash,
                        data.name_wallet,
                        data.account_contract,
                        data.password]
                        :
                        [data.contacts_id,
                        data.surname,
                        data.name,
                        data.lastname,
                        data.phone,
                        data.email,
                        data.meta,
                        data.hospital_id,
                        data.category,
                        data.profession,
                            hash,
                        data.name_wallet,
                        data.account_contract,
                        data.password]
                    await insert_to_db(queryInsertPerson, prepare_data_db, res, next, 'Регистрация прошла успешно! ');
                })
            })
        })
        .catch(err => console.log(err));
}


module.exports = register;