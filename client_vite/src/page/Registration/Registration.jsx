// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";


import { getData } from "../../http/getDataAPI";

import { optionCities, optionContacts_doctors, optionHospitals, optionCategory, optionProfession, checkData, registrationContractAndInDatabase } from './utils';
//import { $host } from "../../http";
import css from './registration.module.css';
import { setLocalStorageItem } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { checkRegistrationControls } from "../../models/checkIsRegistered";

const Registration = () =>
{
    const user = useSelector(state => state.userReducer);
    const isRegisteredUser = useSelector(state => state.checkRegistrationDataReducer);
    const dispatch = useDispatch();

    //const registration_data = useContext(Context);

    const [options_cities, setOptionsCities] = useState([]);
    const [options_hospitals, setOptionsHospitals] = useState([]);
    const [options_contacts, setOptionsContacts] = useState([]);
    const [options_categoriesDoctor, setOptionsCategoriesDoctors] = useState([]);
    const [options_professions, setOptionsProfessions] = useState([]);

    const [isDoctorRegistering, setIsDoctorRegistered] = useState(false);
    const [error, setError] = useState({ status: false, error: '' });
    const [successRegistration, setSuccessRegistration] = useState({ status: false, message: '' });
    // State for from's fields
    const [name, setName] = useState('Голан');
    const [surname, setSurname] = useState('Стью');
    const [lastname, setLastname] = useState('');
    // Selects
    const [addressOfResidence, setAddressOfResidence] = useState('1');
    const [addressRegistered, setAddressRegistered] = useState('2');
    const [contacts_id, setContacts] = useState('1');
    const [hospital_id, setHospital] = useState('1');
    const [categoriesDoctors, setCategoriesDoctors] = useState('высшая');
    const [professionDoctors, setProfessionDoctors] = useState("АНЕСТЕЗИОЛОГ-РЕАНИМАТОЛОГ");
    //-----------------
    const [phone, setPhone] = useState('+78545685225');
    const [email, setEmail] = useState('doctor@mail.ru');
    const [birthDate, setBirthDate] = useState('22.06.1999');
    const [insurancePolicy, setInsurancePolicy] = useState('196-1586-649-649');
    const [password, setPassword] = useState('+JwfM8b^BC*jIK');
    const [repeatPassword, setRepeatPassword] = useState('+JwfM8b^BC*jIK');

    useEffect(() =>
    {
        async function fetchData(query, setOptions)
        {
            try
            {
                const response = await getData(query);
                if (response !== undefined)
                {
                    // console.log(response.data.data);
                    setOptions([...response.data.data]);
                }
            } catch (err)
            {
                console.log("Error with get data for select options");
                console.error(err);
                let message = " Error ";
                if (err.message)
                    message = err.message;
                if (err.response && err.response.data && err.response.message)
                    message = err.response.data.message;
                setError({ status: true, error: message });
            }


        }
        fetchData('api/get_cities', setOptionsCities);
        fetchData('api/get_hospitals', setOptionsHospitals);
        fetchData('api/get_contacts_doctors', setOptionsContacts);
        fetchData('api/get_contacts_doctors', setOptionsContacts);
        fetchData('api/get_all_categories_doctors', setOptionsCategoriesDoctors);
        fetchData('api/get_all_profession_doctors', setOptionsProfessions);

    }, []);

    const registrationPerson = async (event) =>
    {
        event.preventDefault();
        if (password !== repeatPassword)
        {
            setError({ status: true, error: 'Пароли не совпадают' });
            setTimeout(() =>
            {
                setError({ status: false, error: '' });
            }, 5000);
            return;
        }
        const wallet = user.accountWallet;
        const data = {
            name,
            surname,
            lastname,
            addressOfResidence,
            addressRegistered,
            insurancePolicy,
            phone,
            email,
            bdate: birthDate,
            meta: wallet,
            password,
            isDoctorRegistering,
            contacts_id,
            hospital_id,
            category: categoriesDoctors,
            profession: professionDoctors
        }
        if (!checkData(data))
        {
            setError({ status: true, error: 'Данные не корректны проверьте введенные данные' });
            setTimeout(() =>
            {
                setError({ status: false, error: '' });
            }, 5000);
            return;
        }
        const response = await registrationContractAndInDatabase(data, user, dispatch);
        console.log(response);
        if (response && response.status && response.status >= 200 && response.status < 300)
        {
            if (error.status === true)
                setError({ status: false, error: '' });
            setSuccessRegistration({ status: true, message: response.data.success });

            if (isRegisteredUser.isRegisteredDB)
                setLocalStorageItem('registration_db', isRegisteredUser.isRegisteredDB);
            if (isRegisteredUser.isRegisteredContract)
                setLocalStorageItem('registration_contract', isRegisteredUser.isRegisteredContract);
            if (isRegisteredUser.isRegisteredDB && isRegisteredUser.isRegisteredContract)
            {
                dispatch(checkRegistrationControls.setRegistered(true));
                //registration_data.setIsRegistered(true);
                setLocalStorageItem('registrationSuccess', true);
            }
            setTimeout(() =>
            {
                window.open("/", '_self');
            }, 8000)
        } else
        {
            setError({ status: true, error: response.data.message });
        }

    }

    return (
        <>
            <div className={ 'container-fluid text-center ' + css.background } id="title">
                <h1 id="">Регистрация</h1>
                <div className="d-flex justify-content-center align-items-center p-0">
                    <Form className="col-md-6">
                        <div className="d-flex justify-content-around">
                            <div>
                                <label htmlFor="nameId" className="form-label">Имя</label>
                                <input type="text" className="form-control" id="nameId" required defaultValue="Максимка" onChange={ e => setName(e.target.value) } />
                                <p className={ css.warning }>Не используйте пробел или спец символы</p>
                            </div>
                            <div className="ms-2">
                                <label htmlFor="surnameId" className="form-label">Фамилия</label>
                                <input type="text" className="form-control" id="surnameId" required defaultValue="Диланский"
                                    onChange={ e => setSurname(e.target.value) } />
                                <p className={ css.warning }>Не используйте пробел или спец символы</p>
                            </div>
                            <div className="ms-2">
                                <label htmlFor="lastnameId" className="form-label">Отчество</label>
                                <input type="text" className="form-control" id="lastnameId"
                                    onChange={ e => setLastname(e.target.value) } />
                                <p className={ css.warning }>Если есть отчество: <br />Не используйте пробел или спец символы</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-evenly">
                            <div className="m-3" style={ { display: isDoctorRegistering ? "none" : "block" } }>
                                <label htmlFor="addressOfResidence" className="form-label">Адрес проживания</label>
                                <select className="form-control" name="cities" id="addressOfResidence" required={ !isDoctorRegistering }
                                    onChange={ e => setAddressOfResidence(e.target.value) }>
                                    <option value="">--Please choose an option--</option>
                                    { options_cities.map((option) =>
                                    {
                                        return (
                                            <option key={ option.id } value={ option.id }>
                                                { optionCities(option) }
                                            </option>
                                        )
                                    }) }
                                </select>
                            </div>
                            <div className="m-3" style={ { display: isDoctorRegistering ? "none" : "block" } }>
                                <label htmlFor="addressRegistered" className="form-label">Адрес по прописке</label>
                                <select className="form-control" name="cities" id="addressRegistered" required={ !isDoctorRegistering }
                                    onChange={ e => setAddressRegistered(e.target.value) }>
                                    <option value="">--Please choose an option--</option>
                                    { options_cities.map((option) =>
                                    {
                                        return (
                                            <option key={ option.id } value={ option.id }>
                                                { optionCities(option) }
                                            </option>
                                        )
                                    }) }
                                </select>
                            </div>
                            <div className="m-3" style={ { display: isDoctorRegistering ? "block" : "none" } }>
                                <label htmlFor="contacts_id" className="form-label">Контакт</label>
                                <select className="form-control" name="contacts_doctors" id="contacts_id" required={ isDoctorRegistering }
                                    onChange={ e => setContacts(e.target.value) }>
                                    <option value="">--Please choose an option--</option>
                                    { options_contacts.map((option) =>
                                    {
                                        return (
                                            <option key={ option.id } value={ option.id }>
                                                { optionContacts_doctors(option) }
                                            </option>
                                        )
                                    }) }
                                </select>
                            </div>
                            <div className="m-3" style={ { display: isDoctorRegistering ? "block" : "none" } }>
                                <label htmlFor="hospital_id" className="form-label">Больница</label>
                                <select className="form-control" name="hospitals" id="hospital_id" required={ isDoctorRegistering }
                                    onChange={ e => setHospital(e.target.value) }>
                                    <option value="">--Please choose an option--</option>
                                    { options_hospitals.map((option) =>
                                    {
                                        return (
                                            <option key={ option.id } value={ option.id }>
                                                { optionHospitals(option) }
                                            </option>
                                        )
                                    }) }
                                </select>
                            </div>
                        </div>
                        <div className="justify-content-evenly" style={ { display: isDoctorRegistering ? "block" : "none" } }>
                            <div className="mb-3">
                                <label htmlFor="categories" className="form-label">Категория</label>
                                <select className="form-control" name="category" required={ isDoctorRegistering }
                                    onChange={ e => setCategoriesDoctors(e.target.value) }>
                                    <option value="">--Please choose an option--</option>
                                    { options_categoriesDoctor.map((option) =>
                                    {
                                        return (
                                            <option key={ optionCategory(option) } value={ optionCategory(option) }>
                                                { optionCategory(option) }
                                            </option>
                                        )
                                    }) }
                                </select>
                            </div>
                            <div className="mb-3" >
                                <label htmlFor="professions" className="form-label">Специальность</label>
                                <select className="form-control" name="profession" required={ isDoctorRegistering }
                                    onChange={ e => setProfessionDoctors(e.target.value) }>
                                    <option value="">--Please choose an option--</option>
                                    { options_professions.map((option) =>
                                    {
                                        return (
                                            <option key={ optionProfession(option) } value={ optionProfession(option) }>
                                                { optionProfession(option) }
                                            </option>
                                        )
                                    }) }
                                </select>
                            </div>
                        </div>
                        <div className="d-flex justify-content-around">
                            <div className="m-3">
                                <label htmlFor="phone" className="form-label">Телефон</label>
                                <input type="phone" className="form-control" required defaultValue="+78545685225"
                                    onChange={ e => setPhone(e.target.value) } />
                            </div>
                            <div className="m-3">
                                <label htmlFor="email" className="form-label">Почта</label>
                                <input type="email" className="form-control" defaultValue="mai78l@mail.ru"
                                    onChange={ e => setEmail(e.target.value) } />
                            </div>
                            <div className="m-3" style={ { display: isDoctorRegistering ? "none" : "block" } }>
                                <label htmlFor="birthDate" className="form-label">Дата рождения</label>
                                <input type="date" className="form-control text-center" required={ !isDoctorRegistering } defaultValue="1999-06-22"
                                    onChange={ e => setBirthDate(e.target.value) } />
                            </div>
                        </div>
                        <div className="mb-3" style={ { display: isDoctorRegistering ? "none" : "block" } }>
                            <label htmlFor="insurancePolicy" className="form-label">Страховой полис</label>
                            <input type="text" className="form-control" required={ !isDoctorRegistering } defaultValue="196-1586-649-649"
                                onChange={ e => setInsurancePolicy(e.target.value) } />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="meta" className="form-label">Ваш аккаунт</label>
                            <input type="text" autoComplete="none" className="form-control" id="meta" value={ user.accountWallet } disabled />
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="mb-3 pass">
                                <label htmlFor="password" className="form-label">Пароль</label>
                                <input type="password" autoComplete="new-password" className="form-control" value="+JwfM8b^BC*jIK" required
                                    onChange={ e => setPassword(e.target.value) } />
                            </div>
                            <div className="mb-3 pass">
                                <label htmlFor="password_repeat" className="form-label">Повторить пароль</label>
                                <input type="password" autoComplete="none" className="form-control" value="+JwfM8b^BC*jIK" required
                                    onChange={ e => setRepeatPassword(e.target.value) } />
                            </div>
                        </div>
                        <div className="mb-3" style={ { display: isDoctorRegistering ? "block" : "none" } }>
                            <label htmlFor="formFileSm" className="form-label">Подтверждающий документ</label>
                            <input className="form-control form-control-sm" type="file" />
                            <p className={ css.warning }>Если вы являетесь врачом: <br />Приложите подтверждающий документ</p>
                        </div>
                        <div className={ css.form__check_doctor_div }>
                            <div className={ css.form_check }>
                                <input className={ css.form_check_input } type="checkbox" value="" id="isDoctor"
                                    onChange={ e => setIsDoctorRegistered(e.target.checked) } />
                                <label className={ css.form_check_label } htmlFor="isDoctor">
                                    Регистрация для доктора
                                </label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-info text-white m-4"
                            onClick={ registrationPerson }>Зарегистрироваться!</button>
                    </Form>
                </div>
                <div className="alert alert-danger mb-0" role="alert" style={ { display: error.status ? "block" : "none" } }>
                    Сообщение об ошибке: <br />
                    { error.error }
                    <br />
                    Подробнее в консоли
                </div>
                <div className="alert alert-success mb-0" role="alert" style={ { display: successRegistration.status ? "block" : "none" } }>Успех! <br />
                    { successRegistration.message }
                </div>
            </div>

        </>
    )
};

export default Registration;


