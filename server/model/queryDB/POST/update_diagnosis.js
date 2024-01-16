
const ApiError = require('../../../error/ApiError');
const query_db = require('../query_db');
const { getIDDoctorByAccountWallet } = require('../POST_queries');
const { getData } = require('../GET_queries');

const isCuredAndNotSetDateCured = (status,date) =>
{
    return status.includes('Cured') === true && (date === '' || date ===undefined || date === null);
}
const update_diagnosis = async (req,res,next) =>
{
    let 
    {
        name_ill,
        treatment,
        classification,
        date_ill,
        date_cured,
        status,
        id_ill,
        meta
        
    } = req.body;

    if(isCuredAndNotSetDateCured(status,date_cured))
        return next(ApiError.badRequest('Error: Not correct input data - date_cured'));
    
    if(status.includes('ill')===true)
        date_cured = null;

    const id_doctor = await query_db(getIDDoctorByAccountWallet,[meta]).catch(error => console.log);
    const ill = await query_db(getData('name_ill','Name_ills','name_ill = ?'),[name_ill])
    .catch((err) => 
    {
        console.log(err);
        return res.status(400).json({status:"Fail", error:"Problem with server!"});
    });
    
    if(ill[0][0].name_ill === undefined || ill[0][0].name_ill === '')
    {
        await query_db(`INSERT INTO Name_ills(name_ill) VALUES (?);`,[name_ill]).catch(error=>console.log);
        console.log(name_ill);
    }
    const id_deseased = await query_db(getData('id_ill','Records','id = ?'),[id_ill]).catch(error=>console.log(error));
    await query_db(`UPDATE Diseased SET classification = ?, name_ill = ?, treatment = ? WHERE id = ?`,[classification,name_ill,treatment,id_deseased[0][0].id_ill]).catch(error => console.log(error));

    await query_db(`UPDATE Records SET id_doctor=?,date_ill =?,date_cured =?,status=? WHERE id = ?`,[id_doctor[0][0].id,date_ill,date_cured,status,id_ill]).catch(error=> console.log(error));

    res.status(201).json({status:true,message:"Update records"});
}

module.exports = update_diagnosis;
