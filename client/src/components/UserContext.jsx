// @ts-nocheck
import React, { useState } from 'react';
import { Context } from '../';
import UserStore from '../store/UserStore';


export const UserContext = ({ children }) => {
   const [isAuth, setIsAuth] = useState(false);
    const [isLogIn, setLogIn] = useState(false);
    const [isRegistredDB, setIsRegisteredDB] = useState(false);
    const [isRegistredContract, setIsRegisteredContract] = useState(false);
    const [isRegistred, setIsRegistered] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [name, setName] = useState("Who");

    const user = new UserStore();
    
    const data = {
        isAuth,
        setIsAuth,
        setLoading,
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
    };

  
  return (
	<Context.Provider value={data}>
		{children}
	</Context.Provider>
  )
};