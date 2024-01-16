function getDataAboutPersonByAccountWallet(params,name_table)
{
    return `Select ${params} FROM ${name_table} WHERE account_wallet = ?`;
}

module.exports =
{
    getCityOfPatient: " SELECT city FROM Patient INNER JOIN City ON City.id = Patient.city_id WHERE Patient.account_wallet = ?",
    getIDPatientByAccountWallet: getDataAboutPersonByAccountWallet('id','Patient'),
    getActualIllsOfPatient: "SELECT Records.id,Diseased.name_ill, Diseased.treatment, Diseased.classification,Records.date_ill,Records.date_cured,Records.status FROM Records INNER JOIN Doctor ON Doctor.id = Records.id_doctor INNER JOIN  Diseased ON Diseased.id = Records.id_ill Where Records.status LIKE 'ill' AND Records.id_patient = ?",
    getIDDoctorByAccountWallet: getDataAboutPersonByAccountWallet('id','Doctor') ,
    getAllIllsOfPatient:"SELECT Records.id,Diseased.name_ill, Diseased.treatment, Diseased.classification,Records.date_ill,Records.date_cured,Records.status FROM Records INNER JOIN Doctor ON Doctor.id = Records.id_doctor INNER JOIN  Diseased ON Diseased.id = Records.id_ill Where Records.id_patient = ?",
    getAllIllsOfPatientForDoctor:"SELECT Records.id,Patient.surname as surname,Patient.id as id_patient,Patient.account_wallet as meta,Diseased.name_ill, Diseased.treatment, Diseased.classification,Records.date_ill,Records.date_cured,Records.status, Patient.list_doctors_have_access as list_doc,Records.id_doctor FROM Records INNER JOIN Doctor ON Doctor.id = Records.id_doctor INNER JOIN Diseased ON Diseased.id = Records.id_ill INNER JOIN  Patient ON Patient.id = Records.id_patient    Where Records.id_doctor = ? OR Patient.list_doctors_have_access LIKE '%?%'",
    getDataAboutPerson:getDataAboutPersonByAccountWallet,
    getAllDetailPersonalInfoAboutDoctor:`Select Doctor.id,surname,name,lastname,profession, mail,City.city as city,category,Hospital.hospital,Hospital.number_hospital,Hospital.hospital_phone, Contacts_doc.office_phone, Contacts_doc.office_mail FROM Doctor INNER JOIN (Hospital INNER JOIN City ON City.id = Hospital.city_id) ON Hospital.id= Doctor.hospital_id INNER JOIN Contacts_doc ON Contacts_doc.id = Doctor.contacts_id WHERE Doctor.id = ?`,
    getAllPersonalInfoAboutDoctor: getDataAboutPersonByAccountWallet('id,contacts_id,hospital_id,category,profession,surname,name,lastname,phone,mail','Doctor'),
    getAllInfoAboutPatient:`SELECT name,surname,lastname,mail,phone,insurance_policy,datebirthd, c1.city as city, residence.city as addressResidence FROM Patient 
    INNER JOIN City c1 ON c1.id = Patient.city_id
    INNER JOIN City residence ON residence.id = Patient.address_of_residence
    WHERE Patient.account_wallet = ?`,
    getListDoctorsHaveAccess: getDataAboutPersonByAccountWallet('list_doctors_have_access as list_doc','Patient'),
    getNewRecordsIll:`SELECT Records.id,Patient.surname as surname,Patient.id as id_patient,Patient.account_wallet as meta,Patient.list_doctors_have_access as list_doc ,Diseased.name_ill, Diseased.treatment, Diseased.classification,Records.date_ill,Records.date_cured,Records.status FROM Records 
    INNER JOIN 
    Doctor ON Doctor.id = Records.id_doctor
    INNER JOIN 
    Diseased ON Diseased.id = Records.id_ill
    INNER JOIN
    Patient ON Patient.id = Records.id_patient
    Where Records.id = ?`,
    
}