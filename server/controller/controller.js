const Router = require('express');
const router = new Router();
const { check } = require('express-validator');
const register = require("../model/register");
const login = require("../model/login");
/*--------------------------Query DB---------------------------*/
const isExistsPatient_Doctor = require("../model/queryDB/POST/isExistsPatient_Doctor");
const get_all_cities = require("../model/queryDB/GET/get_all_cities");
const get_contacts_doctors = require('../model/queryDB/GET/get_contacts_doctors');
const get_hospitals = require('../model/queryDB/GET/get_hospitals');
const get_all_profession_doctors = require('../model/queryDB/GET/get_all_profession_doctors');
const get_all_categories_doctors = require('../model/queryDB/GET/get_categories_doctor');
const get_all_doctors = require('../model/queryDB/GET/get_all_doctors');
const get_all_patients = require('../model/queryDB/GET/get_all_patient');
const get_all_details_info_about_doctor = require('../model/queryDB/POST/get_all_details_info_about_doctor');
const get_all_ill_s_Patient = require('../model/queryDB/POST/get_all_ill_s_Patient');
const get_all_actuaIllPatient = require('../model/queryDB/POST/get_all_actual_ill');
const get_list_doctors_haveAccess = require('../model/queryDB/POST/get_list_doctors_haveAccess');
const update_list_doctors = require('../model/queryDB/POST/update_list_doctors');
const getCity = require('../model/queryDB/POST/post_get_city');
const get_all_personalInfo_patient = require('../model/queryDB/POST/get_all_personalInfo_patient')
const get_all_personalInfo_doctor = require('../model/queryDB/POST/get_all_personalInfo_doctor');
const update_pesonalInfo_patient = require('../model/queryDB/POST/updatePersonalInfoPatient');
const get_all_classificationIlls = require('../model/queryDB/GET/get_all_classificationIlls');
const get_all_name_ills = require('../model/queryDB/GET/get_all_name_ills');
const set_diagnosis = require('../model/queryDB/POST/set_diagnosis');
const update_diagnosis = require('../model/queryDB/POST/update_diagnosis');
const getABIandAddress = require('../model/getABIandAddress');
/*-----------------------------------*/

router.post("/register",register);
router.post("/login",[
    check('meta',"Account shouldn`t empty!").notEmpty(),
    check('pass',"Password should be length 6 or more and less 255").isLength({min:6,max:255})
],login);
//-------DB
/*----------------POST------------------------*/
router.post("/get_all_info_about_doctor",get_all_details_info_about_doctor);
router.post("/isExistsPatient_Doctor",isExistsPatient_Doctor);
router.post("/get_all_ill_s_patient",get_all_ill_s_Patient);
router.post('/get_list_doctors_haveAccess',get_list_doctors_haveAccess);
router.post('/update_list_doctors',update_list_doctors);
router.post('/getCity',getCity);
router.post('/get_all_personalInfo_patient',get_all_personalInfo_patient);
router.post('/get_all_personalInfo_doctor',get_all_personalInfo_doctor);
router.post('/update_pesonalInfo_patient',update_pesonalInfo_patient);
router.post('/set_diagnosis',set_diagnosis);
router.post('/update_diagnosis',update_diagnosis);
router.post('/get_all_actuaIllPatient',get_all_actuaIllPatient);

/*----------------GET------------------------*/
router.get("/get_cities",get_all_cities);
router.get("/get_all_patients",get_all_patients);
router.get("/get_all_doctors",get_all_doctors);
router.get("/get_contacts_doctors",get_contacts_doctors);
router.get("/get_hospitals",get_hospitals);
router.get("/get_all_profession_doctors",get_all_profession_doctors);
router.get("/get_all_categories_doctors",get_all_categories_doctors);
router.get("/get_all_classificationIlls",get_all_classificationIlls);
router.get("/get_all_name_ills",get_all_name_ills);
router.get('/getABIandAddress',getABIandAddress);

module.exports = router;