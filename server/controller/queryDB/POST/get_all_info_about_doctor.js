const mysql = require('../../../routers/connectionMySQL');
const ApiError = require('../../../error/ApiError');
const select_all_info_about_doctor = async (req,res,next) =>
{
    const
    {
        id
    } = req.body;
     await mysql.promise().query(`Select Doctor.id,surname,name,lastname,profession, mail,City.city as city,category,Hospital.hospital,Hospital.number_hospital,Hospital.hospital_phone, Contacts_doc.office_phone, Contacts_doc.office_mail FROM Doctor INNER JOIN (Hospital INNER JOIN City ON City.id = Hospital.city_id) ON Hospital.id= Doctor.hospital_id INNER JOIN Contacts_doc ON Contacts_doc.id = Doctor.contacts_id WHERE Doctor.id = ?`,[id])
    .then(async (result,err) =>
    {
        if(err)
            return next(ApiError.internal('Error database bad query: select_all_info_about_doctor'));
        
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

module.exports = select_all_info_about_doctor;