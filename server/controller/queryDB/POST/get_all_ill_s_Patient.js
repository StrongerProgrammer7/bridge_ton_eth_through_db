const ApiError = require('../../../error/ApiError');
const mysql = require('../../../routers/connectionMySQL');

const select_all_ills_patient = async (req,res,next) =>
{
    const 
    {
        meta,
        queryDoctor
    } = req.body;

    if(queryDoctor===false)
    {
        getIll(`SELECT id FROM Patient Where account_wallet = ?`,`SELECT Records.id,Diseased.name_ill, Diseased.treatment, Diseased.classification,Records.date_ill,Records.date_cured,Records.status FROM Records 
        INNER JOIN 
        Doctor ON Doctor.id = Records.id_doctor
        INNER JOIN 
        Diseased ON Diseased.id = Records.id_ill
        Where Records.id_patient = ?
        `,meta,res,next);
    }else
    {
        getIll(`SELECT id FROM Doctor Where account_wallet = ?`,`SELECT Records.id,Patient.surname as surname,Patient.id as id_patient,Patient.account_wallet as meta,Diseased.name_ill, Diseased.treatment, Diseased.classification,Records.date_ill,Records.date_cured,Records.status, Patient.list_doctors_have_access as list_doc,Records.id_doctor FROM Records 
        INNER JOIN 
        Doctor ON Doctor.id = Records.id_doctor
        INNER JOIN 
        Diseased ON Diseased.id = Records.id_ill
        INNER JOIN
        Patient ON Patient.id = Records.id_patient
        Where Records.id_doctor = ? OR Patient.list_doctors_have_access LIKE '%?%'
        `,meta,res,next);
    }
         
}

async function getIll(query_get_id,query_get_records,meta,res,next)
{
    await mysql.promise().query(query_get_id,[meta])
    .then(async (result,error) =>
    {
        if(error)
            return next(ApiError.internal('Error database bad query: get id'));
        if(result[0].length ===0)
            return res.status(201).json({message:"Patient/Doctor don't exists",status:"Fail"});

        await mysql.promise().query(query_get_records,[result[0][0].id,result[0][0].id])
        .then(async (result,err) =>
        {
            if(err)
                return next(ApiError.internal('Error database bad query: getIll'));
                
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

module.exports = select_all_ills_patient;
