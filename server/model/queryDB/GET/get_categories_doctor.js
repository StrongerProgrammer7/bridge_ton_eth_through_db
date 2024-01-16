const ApiError = require('../../../error/ApiError');
const query_db = require('../query_db');
const { getAllCategoriesDoctors } = require('../GET_queries');

const get_all_categories_doctors = async (req,res,next) =>
{
    query_db(getAllCategoriesDoctors)
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

module.exports = get_all_categories_doctors;