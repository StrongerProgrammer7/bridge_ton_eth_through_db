const mysql = require('../../../routers/connectionMySQL');
const ApiError = require('../../../error/ApiError');

const update_list_doctors = async (req,res,next) =>
{
    const 
    {
        meta,
        list_doctors_have_access
    } = req.body;
     await mysql.promise().query(`UPDATE Patient
     Set list_doctors_have_access = ?
     Where account_wallet = ?
     `,[list_doctors_have_access,meta])
    .then(async (result,err) =>
    {
        if(err)
        {
            console.log(err);
            return next(ApiError.internal('Get error with update list doctors have access to database'));
        }
        
        return res.status(200).json({message:"Success"});
        
    })
    .catch((err) => 
    {
        console.log(err);
        return next(ApiError.internal('Problem with server!'));
    });
    
}

module.exports = update_list_doctors;