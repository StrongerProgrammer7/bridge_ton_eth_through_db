const ApiError = require('../../../error/ApiError');
const query_db = require('../query_db');
const { getCityOfPatient } = require('../POST_queries');

const get_city_of_patient = async (req,res,next) =>
{
    const
    {
        meta
    }= req.body;
    if(!meta)
        return next(ApiError.badRequest('Error: bad data: meta'));
    query_db(getCityOfPatient,[meta])
    .then((result,error) =>
    {
        if(error)
        {
            console.log(error);
            return next(ApiError.internal('Error bad query: get cities'));
        }
        return res.status(200).json({status:true, data:result[0][0].city});
    })
    .catch((err) => 
    {
        console.log(err);
        return next(ApiError.internal('Error: get cities'));
    });
    
}

module.exports = get_city_of_patient;