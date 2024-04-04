// @ts-nocheck
import React, { useEffect, useContext } from 'react';
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer/Footer";
import { getLocalStorageItem } from './utils/helper';
import { useDispatch } from 'react-redux';
import { checkRegistrationControls } from './models/checkIsRegistered';
import { UserControls } from './models/user';
import { Context } from './main';
import { keyLocalStorage } from './store/enums/WorkWithWallet';


function App() 
{
  const dispatch = useDispatch();
  const { setLoading } = useContext(Context);

  useEffect(() =>
  {
    try 
    {

      dispatch(checkRegistrationControls.setRegisteredDB((getLocalStorageItem(keyLocalStorage.REGISTRATION_DB_SUCCESS) && true) || false));
      dispatch(checkRegistrationControls.setRegisteredContract((getLocalStorageItem(keyLocalStorage.REGISTRATION_CONTRACT_SUCCESS) && true) || false));

      dispatch(checkRegistrationControls.setRegistered((getLocalStorageItem(keyLocalStorage.REGISTRATION_SUCCESS) && true) || false));
      dispatch(UserControls.setAuth((getLocalStorageItem(keyLocalStorage.AUTH) && true) || false));
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
