// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";


import { getData } from "../../http/getDataAPI";

import { optionCities, optionContacts_doctors, optionHospitals, optionCategory, optionProfession, checkData, registrationContractEthAndInDatabase, registrationContractTonAndinDatabase } from './utils';
//import { $host } from "../../http";
import css from './registration.module.css';
import { setLocalStorageItem } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { checkRegistrationControls } from "../../models/checkIsRegistered";
import { keyLocalStorage, NameWallet } from "../../store/enums/WorkWithWallet";
import { Address } from "@ton/core";
import useTonClient from "../../hooks/useTonClient";
import { useTonConnect } from "../../hooks/useTonConnect";
import Spinner from 'react-bootstrap/Spinner';

const Registration = () =>
{
    const user = useSelector(state => state.userReducer);
    const isRegisteredUser = useSelector(state => state.checkRegistrationDataReducer);
    const dispatch = useDispatch();
    const { client } = useTonClient();
    const { sender } = useTonConnect();

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
    const [mnemonicTon, setMnemonicTon] = useState("orient uncle light cause emotion wonder rose skin scout solution expand lady frown subject weather void wasp claw easily economy remember dance ice pelican");

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

    if ((user.personalInfo.nameWallet === NameWallet.TON && !sender && !client) || user.loading)
    {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    }

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
        let response;
        console.log(data);
        if (user.personalInfo.nameWallet === NameWallet.ETH)
            response = await registrationContractEthAndInDatabase(data, user, dispatch);
        else
            response = await registrationContractTonAndinDatabase(data, user, dispatch, sender, client, mnemonicTon);
        console.log(response);
        if (response && response.status && response.status >= 200 && response.status < 300)
        {
            if (error.status === true)
                setError({ status: false, error: '' });


            if (isRegisteredUser.isRegisteredDB)
                setLocalStorageItem(keyLocalStorage.REGISTRATION_DB_SUCCESS, isRegisteredUser.isRegisteredDB);
            if (isRegisteredUser.isRegisteredContract)
                setLocalStorageItem(keyLocalStorage.REGISTRATION_CONTRACT_SUCCESS, isRegisteredUser.isRegisteredContract);
            if (isRegisteredUser.isRegisteredDB && isRegisteredUser.isRegisteredContract)
            {
                dispatch(checkRegistrationControls.setRegistered(true));
                //registration_data.setIsRegistered(true);
                setLocalStorageItem(keyLocalStorage.REGISTRATION_SUCCESS, true);
            }
            setSuccessRegistration({ status: true, message: response.data.success });
            setTimeout(() =>
            {
                window.open("/", '_self');
            }, 8000)
        } else
        {
            if (response && response.data)
                setError({ status: true, error: response.data.message });
            else
                setError({ status: true, error: "Неизвестная ошибка" });
        }

    }

    return (
        <>
            <div className={ 'container-fluid text-center ' + css.background } id="title">
                <h1 id="">Регистрация</h1>
                <div className="d-flex justify-content-center align-items-center p-0">
                    {
                        user.accountWallet && <Form className="col-md-6">
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
                                <input
                                    type="text"
                                    autoComplete="none"
                                    className="form-control"
                                    id="meta"
                                    value={ user.personalInfo.nameWallet === NameWallet.ETH ? user.accountWallet : Address.parse(user?.accountWallet).toString() }
                                    disabled />
                            </div>
                            {
                                user.personalInfo.nameWallet === NameWallet.TON &&
                                <div className="mb-3" style={ { display: "block" } }>
                                    <label htmlFor="insurancePolicy" className="form-label">Секретные слова(они не будут переданы по сети, остаются в рамках вашего ПК)</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        required={ user.personalInfo.nameWallet === NameWallet.TON } defaultValue="orient uncle light cause emotion wonder rose skin scout solution expand lady frown subject weather void wasp claw easily economy remember dance ice pelican"
                                        onChange={ e => setMnemonicTon(e.target.value) }
                                        autoComplete="none" />
                                </div>
                            }
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
                    }
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


