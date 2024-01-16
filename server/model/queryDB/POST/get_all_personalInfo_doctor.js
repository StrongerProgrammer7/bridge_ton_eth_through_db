const ApiError = require('../../../error/ApiError');
const query_db = require('../query_db');
const { getAllPersonalInfoAboutDoctor } = require('../POST_queries');

const get_all_info_aboutDoctor = async (req,res,next) =>
{
    const
    {
        meta
    }= req.body;
    query_db(getAllPersonalInfoAboutDoctor,[meta])
    .then((result,error) =>
    {
        if(error)
        {
            console.log(error);
            return next(ApiError.internal('Error database bad query: select_all_info_aboutDoctor'));
        }
        
        return res.status(200).json({status:true, data:result[0]});
    })
    .catch((err) => 
    {
        console.log(err);
        return next(ApiError.internal('Error : Problem with server!'));
    });
    
}

module.exports = get_all_info_aboutDoctor;