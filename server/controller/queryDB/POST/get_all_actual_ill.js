const ApiError = require('../../../error/ApiError');
const mysql = require('../../../routers/connectionMySQL');

const select_all_actual_ills_patient = async (req,res,next) =>
{
    const 
    {
        meta
    } = req.body;

    if(!meta) return next(ApiError.badRequest(`Error: bad data meta: ${meta}`))
    await mysql.promise().query(`SELECT id FROM Patient Where account_wallet = ?`,[meta])
    .then(async (result,error) =>
    {
        if(error)
            return next(ApiError.internal('Error database bad query: get id'));
        if(result[0].length ===0)
            return res.status(201).json({message:"Patient/Doctor don't exists",status:"Fail"});

        await mysql.promise().query(`SELECT Records.id,Diseased.name_ill, Diseased.treatment, Diseased.classification,Records.date_ill,Records.date_cured,Records.status FROM Records 
        INNER JOIN 
        Doctor ON Doctor.id = Records.id_doctor
        INNER JOIN 
        Diseased ON Diseased.id = Records.id_ill
        Where Records.status LIKE 'ill' AND Records.id_patient = ? `,[result[0][0].id])
        .then(async (result,err) =>
        {
            if(err)
                return next(ApiError.internal('Error database bad query: select_all_actual_ills_patient'));
                
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


module.exports = select_all_actual_ills_patient;
