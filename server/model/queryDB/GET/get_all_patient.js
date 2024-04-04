const ApiError = require('../../../error/ApiError');
const query_db = require('../query_db');
const { getAllPatient } = require('../GET_queries');
const get_all_patients = async (req, res, next) =>
{
    query_db(getAllPatient)
        .then(async (result, err) =>
        {
            if (err)
                return next(ApiError.internal('Error database bad query: select_all_patients'));

            if (result[0].length === 0)
            {
                return res.status(201).json({ status: false, message: "List empty!" })
            } else
            {
                let all_patients = [];

                let patiens_data = result[0];

                for (let i = 0; i < patiens_data.length; i++)
                {
                    //console.log(patiens_data[i]);
                    let patient_object = {};
                    patient_object.num = i + 1;
                    patient_object.id = patiens_data[i].id;
                    let lastname = patiens_data[i].lastname !== null && patiens_data[i].lastname !== '' ? `${ patiens_data[i].lastname[0].toUpperCase() }.` : "";
                    patient_object.initials = `${ patiens_data[i].surname } ${ patiens_data[i].name[0].toUpperCase() }. ${ lastname }`;
                    patient_object.mail = patiens_data[i].mail !== null ? patiens_data[i].mail : "";
                    patient_object.city = patiens_data[i].city;
                    patient_object.meta = patiens_data[i].account_wallet;
                    patient_object.list_doc_have_access_to_patient = patiens_data[i].list_doc;
                    patient_object.name_wallet = patiens_data[i].name_wallet;
                    patient_object.account_contract = patiens_data[i].account_contract;
                    all_patients.push(patient_object);
                }

                return res.status(200).json({ data: all_patients, message: "Success" });

            }

        })
        .catch((err) => 
        {
            console.log(err);
            return next(ApiError.internal('Error problem with server'));
        });

}

module.exports = get_all_patients;