const ApiError = require('../../../error/ApiError');
const query_db = require('../query_db');
const { getAllContactsOfDoctors } = require('../GET_queries');

const select_contacts_doctors = async (req,res,next) =>
{
    query_db(getAllContactsOfDoctors)
    .then((result,error) =>
    {
        if(error)
        {
            console.log(error);
            return next(ApiError.internal('Error database bad query: select_contacts_doctors'));
        }
        return res.status(200).json({status:true, data:result[0]});
    })
    .catch((err) => 
    {
        console.log(err);
        return next(ApiError.internal('Error problem with server!'));
    });
    
}

module.exports = select_contacts_doctors;