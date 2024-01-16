const ApiError = require('../error/ApiError');
const fs = require("fs");
const path = require('path');

const getABIandAddress = async (req,res,next) =>
{
    fs.readFile(path.join(__dirname, '..', 'contract','ABIandAddress.json'), 'utf8', 
    function (err, data) 
    {
        if (err) throw err; // we'll not consider error handling for now
        var obj = JSON.parse(data);
        if(obj)
        {
            return res.status(201).json({status:200, data: { abi: obj.ABI, address: obj.addressContract}});
        }else
        {
            return next(ApiError.internal('Проблемы с получением данных о контракте'));
        }
    });    
}

module.exports = getABIandAddress;