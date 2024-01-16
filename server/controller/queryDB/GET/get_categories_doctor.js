const mysql = require('../../../routers/connectionMySQL');
const ApiError = require('../../../error/ApiError');

const select_all_categories_doctors = async (req,res,next) =>
{
     await mysql.promise().query(`SELECT * FROM Category_doctor`)
    .then(async (result,error) =>
    {
        if(error)
        {
            console.log(error);
            return next(ApiError.internal('Error database bad query: select_all_categories_doctors'));
        }
        return res.status(200).json({status:true, data:result[0]});
            
        
    })
    .catch((err) => 
    {
        console.log(err);
        return next(ApiError.internal('Error problem with server!'));
    });
    
}

module.exports = select_all_categories_doctors;