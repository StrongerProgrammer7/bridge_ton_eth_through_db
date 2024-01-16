const mysql = require('../../../routers/connectionMySQL');
const ApiError = require('../../../error/ApiError');

const isExistsIll = (ill) =>
{
    return ill!==undefined || ill !== null || ill !== '';
}

const insertDatabase = async (query,params,messageError,next) =>
{
    return await mysql.promise().query(query,[...params])
    .catch(error =>
    {
        if(error)
        {
            console.log(error);
            return next(ApiError.internal(messageError));
        }
                
    });
}
const insert_diagnosis = async (req,res,next) =>
{
    let 
    {
        name_ill,
        treatment,
        classification,
        date_ill,
        date_cured,
        meta,
        id_patient,
        
    } = req.body;
    if(date_cured === "")
        date_cured = null;

    await mysql.promise().query(`SELECT id FROM Doctor Where account_wallet = ?;Select name_ill FROM Name_ills WHERE name_ill = ?`,[meta,name_ill])
    .then(async (result,err) =>
    {
       
        if(err)
            return next(ApiError.internal('Error database bad query: insert_diagnosis: get id and name_ill'));

        let id_doctor = result[0][0][0].id;
        let title_ill = result[0][1][0].name_ill;
        let id_ill;
        if(isExistsIll(title_ill))
        {
            id_ill  = await insertDatabase(
                `INSERT INTO Diseased (classification,name_ill,treatment) VALUES(?,?,?);SELECT LAST_INSERT_ID() as id;`,
                [classification,name_ill,treatment],"Error database bad query: insert_Diseased",next);

            id_ill = id_ill[0][1][0].id;
        }else
        {
            id_ill  = await insertDatabase(
                `INSERT INTO Name_ills (name_ill) VALUES(?);INSERT INTO Diseased (classification,name_ill,treatment) VALUES(?,?,?);SELECT LAST_INSERT_ID() as id`,
                [name_ill,classification,name_ill,treatment,classification,name_ill,treatment],
                "Error database bad query: Get error with insert Name_ills,diseased,select id from diseased",
                next);
            id_ill = id_ill[0][2][0].id;
        }

        const records = await insertDatabase(
            `INSERT INTO Records (id_patient,id_doctor,id_ill,date_ill,date_cured) VALUES(?,?,?,?,?);SELECT LAST_INSERT_ID() as id;`,
            [id_patient,id_doctor,id_ill,date_ill,date_cured],
            "Error database bad query:Get error with insert records ",
            next);

        await mysql.promise().query(`SELECT Records.id,Patient.surname as surname,Patient.id as id_patient,Patient.account_wallet as meta,Patient.list_doctors_have_access as list_doc ,Diseased.name_ill, Diseased.treatment, Diseased.classification,Records.date_ill,Records.date_cured,Records.status FROM Records 
        INNER JOIN 
        Doctor ON Doctor.id = Records.id_doctor
        INNER JOIN 
        Diseased ON Diseased.id = Records.id_ill
        INNER JOIN
        Patient ON Patient.id = Records.id_patient
        Where Records.id = ?`,[records[0][1][0].id])
        .then((result,error) =>
        {
            console.log(result[0]);
            if(error)
                return next(ApiError.internal(`Error bad query: Get error with insert records  \n${error}`));
            res.status(200).json({status:true,message:"Insert records success",data:result[0]})
        }).catch(error=>console.log);
    })
    .catch((err) => 
    {
        console.log(err);
        return next(ApiError.internal(`Error Problem with server!`));
    });
    
}

module.exports = insert_diagnosis;
