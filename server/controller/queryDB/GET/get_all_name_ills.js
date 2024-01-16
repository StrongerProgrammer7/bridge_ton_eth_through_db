const ApiError = require('../../../error/ApiError');
const query_db = require('../query_db');
const { getAllIlls } = require('../GET_queries');

const get_all_ills = async (req,res,next) =>
{
    query_db(getAllIlls)
    .then((result,error) =>
    {
        if(error)
        {
            console.log(error);
            return next(ApiError.internal('Error database bad query: select_allNameIlls'));
        }
        return res.status(200).json({status:true, data:result[0]});
    })
    .catch((err) => 
    {
        console.log(err);
        return next(ApiError.internal('Error problem with server!'));
    });
    
}

module.exports = get_all_ills;