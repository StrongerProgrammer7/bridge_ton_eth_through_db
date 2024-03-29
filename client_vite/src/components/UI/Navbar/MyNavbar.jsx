// @ts-nocheck

import { Outlet } from "react-router-dom";
import css from "./navbar.module.css";
import React,{memo }  from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import SwitchCircle from "../checkboxes/SwitchCircle";
import { REGISTRATION_ROUTE,MAIN_ROUTE, PROFILEDOCTOR_ROUTER, PROFILE_ROUTE } from "../../../utils/consts";
import Spinner from 'react-bootstrap/Spinner';
import { useSelector } from "react-redux";


//rfac


const MyNavbar = ({title,title_mainPage,location,...props}) =>
{
    const user = useSelector(state => state.userReducer);
    const isRegistredUser = useSelector(state => state.checkRegistrationDataReducer);
    
    if(user.loading)
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
                    {curentPath !== MAIN_ROUTE ? 
                    <Nav.Link href={MAIN_ROUTE} className={css.hoverLink}>{title_mainPage}</Nav.Link> 
                    : 
                    user.isAuth === true ?
                    <Nav.Link href={ user.personalInfo.isDoctor ? PROFILEDOCTOR_ROUTER : PROFILE_ROUTE} 
                    className={css.hoverLink}>
                        Профиль</Nav.Link> 
                            : null
                    }
                    { isRegistredUser.isRegistered === true ?    
                        props.children
                        :
                        curentPath !== REGISTRATION_ROUTE ? 
                        <Nav.Link href="/registration" className={css.hoverLink}>Зарегистрироваться</Nav.Link> : null
                        
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
export default memo(MyNavbar);
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

