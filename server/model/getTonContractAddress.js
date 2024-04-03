const ApiError = require('../error/ApiError');
const fs = require("fs");
const path = require('path');

const getABIandAddress = async (req, res, next) =>
{
    fs.readFile(path.join(__dirname, '..', 'contract', 'tonContractAddress.json'), 'utf8',
        function (err, data) 
        {
            if (err) throw err; // we'll not consider error handling for now
            var obj = JSON.parse(data);
            if (obj)
            {
                return res.status(201).json({ status: 200, data: { address: obj.ton_contract_address } });
            } else
            {
                return next(ApiError.internal('Проблемы с получением данных о контракте TON'));
            }
        });
}

module.exports = getABIandAddress;