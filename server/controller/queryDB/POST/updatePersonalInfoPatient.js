const mysql = require('../../../routers/connectionMySQL');
const ApiError = require('../../../error/ApiError');

const update_pesonalInfo_patient = async (req,res,next) =>
{
    const 
    {
        name,
        surname,
        lastname,
        phone,
        mail,
        isPartInformation_hidden,
        address_of_residence,
        city_id,
        insurance_policy,
        datebirthd,
        meta
    } = req.body;
     await mysql.promise().query(`UPDATE Patient
     Set city_id = ?,
     surname = ?,
     name = ?,
     lastname = ?,
     phone = ?,
     mail = ?,
     isPartInformation_hidden = ?,
     address_of_residence = ?,
     insurance_policy = ?,
     datebirthd = ?
     Where account_wallet = ?
     `,[city_id,surname,name,lastname,phone,mail,isPartInformation_hidden,address_of_residence,insurance_policy,datebirthd,meta])
    .then(async (result,err) =>
    {
        if(err)
        {
            console.error(err);
            return next(ApiError.internal('Get error with update personal info for doctor to database'));
        }
        
        return res.status(200).json({message:"Success"});
        
    })
    .catch((err) => 
    {
        console.log(err);
        return next(ApiError.internal('Error: update personal info'));
    });
    
}

module.exports = update_pesonalInfo_patient;