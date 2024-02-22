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
import { Context } from './';


function App() 
{
  const registration = useSelector(state => state.checkRegistrationDataReducer);

  const dispatch = useDispatch();
  const { setLoading } = useContext(Context);
  // const [isAuth, setIsAuth] = useState(false);
  // const [isLogIn, setLogIn] = useState(false);
  // const [isRegistredDB, setIsRegisteredDB] = useState(false);
  // const [isRegistredContract, setIsRegisteredContract] = useState(false);
  // const [isRegistred, setIsRegistered] = useState(false);
  // const [isLoading, setLoading] = useState(true);
  // const [name, setName] = useState("Who");

  // const user = new UserStore();

  useEffect(() =>
  {
    try 
    {
      //setIsRegisteredDB((getLocalStorageItem('registration_db') && true) || false);

      dispatch(checkRegistrationControls.setRegisteredDB((getLocalStorageItem('registration_db') && true) || false));

      //setIsRegisteredContract((getLocalStorageItem('registration_contract') && true) || false);

      dispatch(checkRegistrationControls.setRegisteredContract((getLocalStorageItem('registration_contract') && true) || false));

      // setIsRegistered((getLocalStorageItem('registrationSuccess') && true) || false);

      dispatch(checkRegistrationControls.setRegistered((getLocalStorageItem('registrationSuccess') && true) || false));

      // setIsAuth((getLocalStorageItem('isAuth') && true) || false);
      dispatch(UserControls.setAuth((getLocalStorageItem('isAuth') && true) || false));
      setLoading(false);
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
