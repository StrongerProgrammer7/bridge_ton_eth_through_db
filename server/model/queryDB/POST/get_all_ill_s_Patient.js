const ApiError = require('../../../error/ApiError');
const query_db = require('../query_db');
const { getIDPatientByAccountWallet , getIDDoctorByAccountWallet , getAllIllsOfPatient, getAllIllsOfPatientForDoctor} = require('../POST_queries');

const get_all_ills_patient = async (req,res,next) =>
{
    const 
    {
        meta,
        queryDoctor
    } = req.body;

    if(queryDoctor===false)
    {
        getIll(getIDPatientByAccountWallet,
            getAllIllsOfPatient,meta,res,next);
    }else
    {
        getIll(getIDDoctorByAccountWallet,getAllIllsOfPatientForDoctor,meta,res,next);
    }
}

async function getIll(query_get_id,query_get_records,meta,res,next)
{
    query_db(query_get_id,[meta])
    .then(async (result,error) =>
    {
        if(error)
            return next(ApiError.internal('Error database bad query: get id'));
        if(result[0].length ===0)
            return res.status(201).json({message:"Patient/Doctor don't exists",status:"Fail"});

        query_db(query_get_records,[result[0][0].id,result[0][0].id])
        .then(async (result,err) =>
        {
            if(err)
            {
                console.log(err);
                return next(ApiError.internal('Error database bad query: getIll'));
            }
                
            if(result[0].length===0)
            {
                return res.status(201).json({status:false, message:"List empty!"})
            }else
            {
                return res.status(200).json({data:result[0],message:"Success"});            
            }
            
        })
        .catch((err) => 
        {
            console.log(err);
            return next(ApiError.internal('Error: getIll'));
        });
    }).catch((err)=>
    {
        console.log(err);
        return next(ApiError.internal('Error: getIll'));
    });
}

module.exports = get_all_ills_patient;
