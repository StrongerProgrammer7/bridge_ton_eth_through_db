// @ts-nocheck
import React, { useEffect, useContext } from 'react';
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer/Footer";
import { getLocalStorageItem } from './utils/helper';
import { useDispatch, useSelector } from 'react-redux';
import { checkRegistrationControls } from './models/checkIsRegistered';
import { UserControls } from './models/user';
import { Context } from './main';


function App() 
{
  const dispatch = useDispatch();
  const { setLoading } = useContext(Context);

  useEffect(() =>
  {
    try 
    {

      dispatch(checkRegistrationControls.setRegisteredDB((getLocalStorageItem('registration_db') && true) || false));
      dispatch(checkRegistrationControls.setRegisteredContract((getLocalStorageItem('registration_contract') && true) || false));

      dispatch(checkRegistrationControls.setRegistered((getLocalStorageItem('registrationSuccess') && true) || false));
      dispatch(UserControls.setAuth((getLocalStorageItem('isAuth') && true) || false));
      dispatch(UserControls.setLoading(false));
      //setLoading(false);
    } catch (error) 
    {
      console.log("Error with get data from localStorage");
      console.error(error);
    }

  }, [])

  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <AppRouter></AppRouter>
      <Footer></Footer>
    </BrowserRouter>

  );
}

export default App;
