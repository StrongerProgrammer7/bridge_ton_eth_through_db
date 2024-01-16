// @ts-nocheck
import React, { createContext,useEffect,useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer/Footer";
import UserStore from './store/UserStore';


export const Context = createContext(null);
export const ContextAuthRegistration = createContext(null);

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
      
      if(window.localStorage.getItem("registration_db"))
        setIsRegisteredDB(true);
      if(window.localStorage.getItem("registration_contract"))
        setIsRegisteredContract(true);
      if(window.localStorage.getItem("registrationSuccess"))
        setIsRegistered(true);
      if(window.localStorage.getItem("isAuth"))
        setIsAuth(true);
      user.setIsAuth(isAuth);
      setLoading(false);
    } catch (error) 
    {
      console.log("Error with get data from localStorage");
      console.error(error);  
    }
    
  },[])

  return (
    <ContextAuthRegistration.Provider value={
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
        setName
      }
    }>
    <Context.Provider value={
          {
            user
            
          }
        }>
          <BrowserRouter>
            <Navbar></Navbar>
           <AppRouter></AppRouter>
            <Footer></Footer>
          </BrowserRouter>
        </Context.Provider>

    </ContextAuthRegistration.Provider>
    
    
    
  );
}

export default App;
