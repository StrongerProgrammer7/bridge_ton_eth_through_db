const ApiError = require('../../../error/ApiError');
const mysql = require('../../../routers/connectionMySQL');


const isExistsPatient_Doctor = async (req,res,next) =>
{
    const 
    {
        meta
    } = req.body;
    if(!meta)
        return next(ApiError.badRequest('Not correct address wallet'));
    await mysql.promise().query(`Select id,name_wallet,name FROM Patient WHERE account_wallet = ?; Select id,name_wallet,name FROM Doctor WHERE account_wallet = ? `,[meta,meta])
    .then(async (results,err) =>
    {
        if(err)
            return next(ApiError.internal('Internal error with get users!'));
            
        let patient = false;
        let name_walletPatient = "";
        let name_walletDoctor = "";
        let doctor = false;
        let name = "";
        let id_patient = undefined;
        let id_doctor = undefined;
        if(results[0][0].length!==0)
        {
            patient = true;
            name_walletPatient = results[0][0][0].name_wallet;
            name = results[0][0][0].name;
            id_patient = results[0][0][0].id;
        }
        if(results[0][1].length!==0)
        {
            doctor = true;
            name_walletDoctor = results[0][1][0].name_wallet;
            name = results[0][1][0].name;
            id_doctor = results[0][1][0].id;
        }
            
        const data =
        {
            patient,
            doctor,
            name,
            name_walletDoctor,
            name_walletPatient,
            id_doctor,
            id_patient
        }
        //console.log(results[0][0], results[0][1])
        if(patient === false && doctor === false)
            return res.status(201).json({message:"Patient/Doctor not exists", data});
        return res.status(201).json({status:true, message:"Data's patient/doctor", data});
    })
    .catch((err) => 
    {
        console.log(err);
        return next(ApiError.internal('Error: is exists patient or doctor'));
    });
    
}

module.exports = isExistsPatient_Doctor;