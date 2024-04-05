import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import MyNavbar from './UI/Navbar/MyNavbar';

import { Button } from 'react-bootstrap';
import PopupPersonalData from './UI/Popups/personalData/PopupPersonalData';
import PopupSignIn from './UI/Popups/signIn/PopupSignIn';
import { removeLocalStorageItem } from '../utils/helper';
import { PROFILE_ROUTE, PROFILEDOCTOR_ROUTER, MAIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserControls } from '../models/user';
import ConnectWallets from './UI/Popups/connectWallets/ConnectWallets';
import SwitchCircle from './UI/checkboxes/SwitchCircle';
import BlackLoading from './UI/loadings/blackloading/BlackLoadings';

const getTitle = (curentPath) =>
{
    if (curentPath === PROFILEDOCTOR_ROUTER)
        return `Профиль: Врач `;
    else if (curentPath === PROFILE_ROUTE)
        return `Профиль: Пациент `;
    return "Система взаимодействия";
}


function logout(dispatch, user)
{
    try 
    {
        const isPatient = user.isPatient;
        const isDoctor = user.isDoctor;
        const nameWallet = user.nameWallet;

        dispatch(UserControls.setAuth(false));
        dispatch(UserControls.setNewListDoctor([]));
        dispatch(UserControls.clearData());
        dispatch(UserControls.setPatient(isPatient));
        dispatch(UserControls.setDoctor(isDoctor));
        dispatch(UserControls.setNameWallet(nameWallet));
        removeLocalStorageItem('isAuth');

    } catch (error) 
    {
        console.log("Error with logout");
        console.error(error);
    }
}

const Navbar = () => 
{
    const location = useLocation();
    const navigate = useNavigate();
    // @ts-ignore
    const user = useSelector(state => state.userReducer);
    // @ts-ignore
    const isExistsUser = useSelector((state) => state.checkRegistrationDataReducer.isRegistered);
    const dispatch = useDispatch();

    const [titleNavbar, setTitleNavbar] = useState("Система взаимодействия");

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() =>
    {
        const curentPath = location.pathname;
        let title = getTitle(curentPath);
        if (curentPath !== MAIN_ROUTE && curentPath !== REGISTRATION_ROUTE)
            title = getTitle(curentPath) + `(${ user.personalInfo.nameWallet }) ` + user.personalInfo.name;

        setTitleNavbar(title);
    }, [user.personalInfo.name, location.pathname]);

    useEffect(() =>
    {
        if (!user.isAuth)
            return;
        if (user.personalInfo.isDoctor)
            navigate(PROFILEDOCTOR_ROUTER);
        else if (user.personalInfo.isPatient)
            navigate(PROFILE_ROUTE);
    }, [user.isAuth, user.personalInfo.isDoctor, user.personalInfo.isPatient]);

    if (user.loading)
    {
        return (
            <BlackLoading />
        );
    }

    return (
        <>
            <MyNavbar
                title={ titleNavbar }
                title_mainPage="Главная" >
                <>
                    {
                        isExistsUser && <Button
                            variant="light"
                            onClick={ e => handleShow() }
                            className="me-2"
                        >
                            { user.isAuth ? 'Личные данные' : 'Войти' }
                        </Button>
                    }
                    {
                        user.isAuth
                            ?
                            <>
                                <PopupPersonalData
                                    show={ show }
                                    handleClose={ handleClose }
                                    titleModal={ "Изменить данные" }
                                />

                                <Button
                                    className="me-2"
                                    variant="danger"
                                    onClick={ e => logout(dispatch, user.personalInfo) }>
                                    Выход
                                </Button>
                            </>
                            :
                            <PopupSignIn
                                show={ show }
                                handleClose={ handleClose }
                                titleModal={ "Вход в профиль" }
                                wallet={ user.accountWallet }
                                isDoctor={ user.personalInfo.isDoctor } />
                    }
                </>
                <ConnectWallets />
                <SwitchCircle depend={ user.accountWallet } />
            </MyNavbar>
        </>
    )
}
export default Navbar;