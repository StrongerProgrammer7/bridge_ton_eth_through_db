const ApiError = require('../../../error/ApiError');
const query_db = require('../query_db');
const {getAllDetailPersonalInfoAboutDoctor } = require('../POST_queries');

const get_all_details_info_about_doctor = async (req,res,next) =>
{
    const
    {
        id
    } = req.body;
    query_db(getAllDetailPersonalInfoAboutDoctor,[id])
    .then(async (result,err) =>
    {
        if(err)
            return next(ApiError.internal('Error database bad query: get_all_details_info_about_doctor'));
        
        if(result[0].length===0)
            return res.status(201).json({status:false, message:"List empty!"})
        else
            return res.status(200).json({data:result[0],message:"Success"});   
        
        
    })
    .catch((err) => 
    {
        console.log(err);
        return next(ApiError.internal('Error Problem with server: select_all_info_about_doctor'));
    });
    
}

module.exports = get_all_details_info_about_doctor;