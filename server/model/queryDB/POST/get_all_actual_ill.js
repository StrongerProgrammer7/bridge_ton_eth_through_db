const ApiError = require('../../../error/ApiError');
const query_db = require('../query_db');
const {getIDPatientByAccountWallet,getActualIllsOfPatient } = require('../POST_queries');

const get_all_actual_ills_of_patient = async (req,res,next) =>
{
    const 
    {
        meta
    } = req.body;

    if(!meta) return next(ApiError.badRequest(`Error: bad data meta: ${meta}`))
    query_db(getIDPatientByAccountWallet,[meta])
    .then(async (result,error) =>
    {
        if(error)
            return next(ApiError.internal('Error database bad query: get id'));
        if(result[0].length ===0)
            return res.status(201).json({message:"Patient/Doctor don't exists",status:"Fail"});

        query_db(getActualIllsOfPatient,[result[0][0].id])
        .then(async (result,err) =>
        {
            if(err)
            {
                console.log(err);
                return next(ApiError.internal('Error database bad query: get_all_actual_ills_of_patient'));
            }
                
            if(result[0].length===0)
                return res.status(201).json({status:false, message:"List empty!"})
            else
                return res.status(200).json({data:result[0],message:"Success"});            
        })
        .catch((err) => 
        {
            console.log(err);
            return next(ApiError.internal('Error: get_all_actual_ills_of_patient'));
        });
    }).catch((err)=>
    {
        console.log(err);
        return next(ApiError.internal('Error: Problem with server'));
    });
}


module.exports = get_all_actual_ills_of_patient;
