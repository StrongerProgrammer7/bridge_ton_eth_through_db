
const ApiError = require('../../../error/ApiError');
const query_db = require('../query_db');
const { getAllDoctors } = require('../GET_queries');

const get_all_doctors = async (req,res,next) =>
{
    query_db(getAllDoctors)
    .then((result,err) =>
    {
        if(err)
        {
            console.log(err);
            return next(ApiError.internal('Error database bad query: select_all_doctors'));
        }
        
        if(result[0].length===0)
            return res.status(201).json({status:false, message:"List empty!"})
        else
        {
            
            let all_doctors = [];
            let doctors_data = result[0];
            
            for(let i=0;i<doctors_data.length;i++)
            {
                let doctor_object = {};
                doctor_object.num = i+1;
                doctor_object.id = doctors_data[i].id;
                let lastname = doctors_data[i].lastname!==null && doctors_data[i].lastname!=='' ?`${doctors_data[i].lastname[0].toUpperCase()}.`: "";
                doctor_object.initials = `${doctors_data[i].surname} ${doctors_data[i].name[0].toUpperCase()}. ${lastname}`;
                doctor_object.mail = doctors_data[i].mail !== null? doctors_data[i].mail : "";
                doctor_object.profession = doctors_data[i].profession.toLowerCase();
                doctor_object.city = doctors_data[i].city;
                doctor_object.meta = doctors_data[i].account_wallet;
                all_doctors.push(doctor_object);
            }
            return res.status(200).json({data:all_doctors,message:"Success"});
            
        }
        
    })
    .catch((err) => 
    {
        console.log(err);
        return next(ApiError.internal('Error problem with server'));
    });
    
}

module.exports = get_all_doctors;