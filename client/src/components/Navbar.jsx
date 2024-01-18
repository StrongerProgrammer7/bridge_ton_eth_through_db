// @ts-nocheck
import React , { useState,useContext} from 'react';
import { useLocation } from "react-router-dom";
import MyNavbar from './UI/Navbar/MyNavbar';
import { Context } from "../App";

import { Button } from 'react-bootstrap';
import PopupPersonalData from './UI/Popups/personalData/PopupPersonalData';
import PopupSignIn from './UI/Popups/signIn/PopupSignIn';
import { removeLocalStorageItem } from '../utils/helper';
import { PROFILE_ROUTE, PROFILEDOCTOR_ROUTER, MAIN_ROUTE } from '../utils/consts';
import { useEffect } from 'react';
const getTitle = (curentPath) =>
{
    if(curentPath === PROFILEDOCTOR_ROUTER)
        return `Профиль: Врач `;
    else if (curentPath === PROFILE_ROUTE)
        return `Профиль: Пациент `;
    return "Система взаимодействия";
}


function logout(setIsAuth)
{
    try 
    {
        setIsAuth(false);
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
    const { user,isAuth,isLogIn,setIsAuth , name} = useContext(Context);
    const [titleNavbar,setTitleNavbar] = useState("Система взаимодействия");

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true); 

    useEffect(()=>
    {
        const curentPath = location.pathname;
        let title = getTitle(curentPath);
        if(curentPath !== MAIN_ROUTE)
            title = getTitle(curentPath) + user.user.name;

        setTitleNavbar(title);
    },[name,user.user.name,location.pathname])
 
    return (
        <>
        <MyNavbar 
        title={titleNavbar} 
        title_mainPage="Главная" 
        location={location} >
                
        <>
            <Button 
            variant="light" 
            onClick={e => 
            {
                if(isLogIn)
                    window.open("/profile","_self");
                else
                    handleShow();
            }}
            className="me-2"
            >
            {isAuth ? 'Личные данные': 'Войти'}
            </Button>
            {
                isAuth  ?  
                <>
                <PopupPersonalData 
                    show={show} 
                    handleClose={handleClose}
                    titleModal={"Изменить данные"}/>
                  
                    <Button className="me-2" variant="danger" onClick={e => 
                        {
                            logout(setIsAuth);
                        }}>
                        Выход
                    </Button>
                </>
                : 
                    <PopupSignIn 
                    show={show} 
                    handleClose={handleClose} 
                    titleModal={"Вход в профиль"} 
                    wallet={user.accountWallet}
                    isDoctor={user.user.isDoctor}/>
            }
        </>
        </MyNavbar>
        </>
    )
}
export default Navbar;