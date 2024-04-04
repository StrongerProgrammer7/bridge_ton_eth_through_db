function getData(params, table, condition = '')
{
    if (condition !== '')
        return `Select ${ params } FROM ${ table } WHERE ${ condition }`;
    else
        return `Select ${ params } FROM ${ table }`;
}

module.exports =
{
    getData,
    getAllCities: getData('id,region, city', 'City'),
    getAllClassificationDoctors: getData('*', ' Classification'),
    getAllDoctors: "Select Doctor.id,surname,name,lastname,profession, mail,City.city as city,Doctor.account_wallet  FROM Doctor INNER JOIN (Hospital INNER JOIN City ON City.id = Hospital.city_id) ON Hospital.id= Doctor.hospital_id",
    getAllIlls: getData('*', 'Name_ills'),
    getAllPatient: "Select Patient.id,surname,name,lastname, City.city as city, mail, account_wallet,list_doctors_have_access as list_doc,name_wallet,account_contract FROM Patient INNER JOIN City ON City.id = Patient.city_id",
    getAllProfession: getData('*', 'Profession'),
    getAllCategoriesDoctors: getData('*', 'Category_doctor'),
    getAllContactsOfDoctors: getData('*', 'Contacts_doc'),
    getAllHospitals: "SELECT Hospital.id,city,number_hospital FROM Hospital INNER JOIN City ON City.id = Hospital.city_id"
}