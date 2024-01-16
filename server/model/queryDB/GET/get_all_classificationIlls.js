const ApiError = require('../../../error/ApiError');
const query_db = require("../query_db");
const { getAllClassificationDoctors } = require("../GET_queries");
const get_allClassification = async (req,res,next) =>
{
    query_db(getAllClassificationDoctors)
    .then((result,error) =>
    {
        if(error)
            return next(ApiError.internal('Error database bad query: get_allClassification'));
        return res.status(200).json({status:true, data:result[0]});
    })
    .catch((err) => 
    {
        console.log(err);
        return next(ApiError.internal('Error problem with server'));
    }); 
}

module.exports = get_allClassification;