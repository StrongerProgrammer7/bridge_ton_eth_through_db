// @ts-nocheck
import React , { useContext,useState} from 'react';
import { useLocation } from "react-router-dom";
import MyNavbar from './UI/Navbar/MyNavbar';
import { Context } from "../App";
import { observer } from 'mobx-react-lite';
import { ContextAuthRegistration } from "../App";
import { PROFILEDOCTOR_ROUTER, PROFILE_ROUTE } from '../utils/consts';
import { useEffect } from 'react';


 const Navbar = observer(() => 
{
    const location = useLocation();
    const { user } = useContext(Context);
    const { isRegistred,isAuth } = useContext(ContextAuthRegistration);

    user.setIsAuth(isAuth);
    const curentPath = location.pathname;
    let title = "Система взаимодействия";
    if(curentPath === PROFILEDOCTOR_ROUTER)
        title = `Профиль: Врач ${user.user.name}`;
    if(curentPath === PROFILE_ROUTE)
        title = `Профиль: Пациент ${user.user.name}`;

    useEffect(()=>
    {   

    },[user.user.name])
    return (
        <>
        <MyNavbar title={title} title_mainPage="Главная" location={location} user={user} isRegistred={isRegistred}></MyNavbar>
        </>
    )
})
export default Navbar;