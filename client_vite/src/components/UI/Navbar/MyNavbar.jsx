// @ts-nocheck

import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Outlet, useLocation } from "react-router-dom";
import { MAIN_ROUTE, PROFILEDOCTOR_ROUTER, PROFILE_ROUTE, REGISTRATION_ROUTE } from "../../../utils/consts";
import css from "./navbar.module.css";

import { useSelector } from "react-redux";


//rfac

const MyNavbar = ({ title, title_mainPage, ...props }) =>
{
    const location = useLocation();
    const user = useSelector(state => state.userReducer);
    const isRegistredUser = useSelector(state => state.checkRegistrationDataReducer);
    const curentPath = location.pathname;

    return (
        <>
            <Navbar expand="sm" key='sm' bg="dark" data-bs-theme="dark" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/">{ title }</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" >
                        <Nav className="justify-content-end align-items-center flex-grow-1 me-auto gap-2">
                            { curentPath !== MAIN_ROUTE &&
                                <Nav.Link><Link to={ MAIN_ROUTE } className={ css.hoverLink }>{ title_mainPage }</Link></Nav.Link>
                            }
                            {
                                user.isAuth === true && curentPath === MAIN_ROUTE &&
                                <Nav.Link>
                                    <Link
                                        to={ user.personalInfo.isDoctor ? PROFILEDOCTOR_ROUTER : PROFILE_ROUTE }
                                        className={ css.hoverLink }>
                                        Профиль
                                    </Link>
                                </Nav.Link>
                            }
                            { isRegistredUser.isRegistered === false &&
                                curentPath !== REGISTRATION_ROUTE && user.accountWallet !== '' && user.contract &&
                                <Nav.Link>
                                    <Link to="/registration" className={ css.hoverLink }>Зарегистрироваться</Link>
                                </Nav.Link>

                            }
                            { props.children }

                            <Outlet />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default MyNavbar;