// @ts-nocheck

import { Outlet } from "react-router-dom";
import css from "./navbar.module.css";
import React,{useContext}  from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import SwitchCircle from "../checkboxes/SwitchCircle";
import { REGISTRATION_ROUTE,MAIN_ROUTE, PROFILE_ROUTE } from "../../../utils/consts";
import MyPopup from "../Popups/signIn/MyPopup";
import { ContextAuthRegistration } from "../../../App";
import Spinner from 'react-bootstrap/Spinner';
import { useEffect } from "react";

//rfac

function logout(user,setIsAuth)
{
    try 
    {
        user.setIsAuth(false);
        setIsAuth(false);
        if(window.localStorage.getItem("isAuth"))
            window.localStorage.removeItem("isAuth");
        setTimeout(()=>
        {
            window.open("/","_self");
        },1000);
    } catch (error) 
    {
        console.log("Error with logout");
        console.error(error);    
    }
}
const MyNavbar = ({title,title_mainPage,location,user,isRegistred,...props}) =>
{
    const { isLoading,setIsAuth,setLogIn,isLogIn } = useContext(ContextAuthRegistration);

    useEffect(()=>
    {
        if(isLogIn)
        {
            setIsAuth(true);
            user.setIsAuth(true);
        }
    },[])
    if(isLoading)
    {
        return(
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          );
    }
    const curentPath = location.pathname;

    return (
        <>
        <Navbar expand="sm" key='sm' bg="dark" data-bs-theme="dark" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">{title}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" >
                <Nav className="justify-content-end align-items-center flex-grow-1 me-auto">
                    {curentPath !== MAIN_ROUTE ? <Nav.Link href={MAIN_ROUTE} className={css.hoverLink}>{title_mainPage}</Nav.Link> : ''}
                    { isRegistred === true ?    
                        // user.isAuth && curentPath !== PROFILE_ROUTE ?  <Nav.Link href="/profile" className={css.hoverLink}>Профиль</Nav.Link>
                        // :
                        user.isAuth === true ?  
                       <>
                        <MyPopup 
                        titleModal="Изменить данные"  
                        titleButton="Личные данные" 
                        isSignIn={false}>
                        </MyPopup> 
                          <Button className="me-2" variant="danger" onClick={e => 
                            {
                                logout(user,setIsAuth);
                            }}>
                              Выход
                            </Button>
                        </>
                        : 
                        <MyPopup
                        titleModal="Вход в профиль"  
                        titleButton="Войти" 
                        isSignIn={true}
                        isLogIn={isLogIn}
                        setLogIn={setLogIn}>
                        </MyPopup>
                        :
                        curentPath !== REGISTRATION_ROUTE ? <Nav.Link href="/registration" className={css.hoverLink}>Зарегистрироваться</Nav.Link> : ''
                        
                    }
                    <SwitchCircle></SwitchCircle>
                    <Outlet />
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
       
        </>
        
    )
}
export default MyNavbar;
// const Navbar = (props) =>
// {

//     return (
//         <>
//         <div className={css.navbar}>
//             {props.user.isAuth === true ?
//               <>
//               <button>
//               Get out!
//             </button>
//             <div className={css.navbar__links}>
//               <Link to='/profile' style={{marginLeft: 15}}>Profile</Link>
//               <Link to='/' style={{marginLeft: 15}}>Main</Link>
//             </div>
//             </>
//             :
//            <>
//             <div className={css.center}>
//               <h1 >It's navbar</h1>
               
//             </div>
//              <div className={css.navbar__links}>
//                 <Link to="/registration" style={{marginLeft: 15}}>Registration</Link>
//             </div>
//            </>
//           }
//           </div>
//           <Outlet />
       
//         </>
        
//     )
// }

