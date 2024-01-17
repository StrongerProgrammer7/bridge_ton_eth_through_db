// @ts-nocheck
import React, { createContext,useEffect,useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer/Footer";
import UserStore from './store/UserStore';
import { getLocalStorageItem } from './utils/helper';

export const Context = createContext(null);

function App() 
{
  const [isAuth,setIsAuth] = useState(false);
  const [isLogIn,setLogIn] = useState(false);
  const [isRegistredDB, setIsRegisteredDB] = useState(false);
  const [isRegistredContract, setIsRegisteredContract] = useState(false);
  const [isRegistred, setIsRegistered] = useState(false);
  const [isLoading,setLoading] = useState(true);
  const [name,setName] = useState("Who");

  const user = new UserStore();

  useEffect(()=>
  {
    try 
    {
      setIsRegisteredDB((getLocalStorageItem('registration_db')&& true) || false);
      setIsRegisteredContract((getLocalStorageItem('registration_contract')&& true) || false);
      setIsRegistered((getLocalStorageItem('registrationSuccess') && true) || false);
      setIsAuth((getLocalStorageItem('isAuth') && true) || false);
      setLoading(false);
    } catch (error) 
    {
      console.log("Error with get data from localStorage");
      console.error(error);  
    }
    
  },[])

  return (
    <Context.Provider value={
      {
        isAuth,
        setIsAuth,
        isRegistred,
        setIsRegistered,
        isRegistredContract,
        setIsRegisteredContract,
        isRegistredDB,
        setIsRegisteredDB,
        isLoading,
        isLogIn,
        setLogIn,
        name,
        setName,
        user
      }
    }>
      <BrowserRouter>
        <Navbar></Navbar>
        <AppRouter></AppRouter>
        <Footer></Footer>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
