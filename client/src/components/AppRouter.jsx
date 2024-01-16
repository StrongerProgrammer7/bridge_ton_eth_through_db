// @ts-nocheck
import React, { useContext } from "react";
import { Route, Routes } from 'react-router-dom';
import { Context, ContextAuthRegistration } from "../App";
import { privateRoutes,publicRouters } from "../router/Router";
import Spinner from 'react-bootstrap/Spinner';
import { PROFILEDOCTOR_ROUTER } from "../utils/consts";
import { useEffect } from "react";


const AppRouter = () =>
{
    const { user } = useContext(Context);
    const { isAuth,isLoading } = useContext(ContextAuthRegistration);

    if(isLoading)
    {
        return(
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          );
    }

    return (
        <>
        {
        isAuth
        ?
        <Routes>
            <Route path="/">
                {privateRoutes.map((link) =>
                {
  
                    return (
                        <Route key={link.key} path={link.path} element={link.component} />
                    )  
                    
                }
                )}
            </Route>
        </Routes>
            :
        <Routes>
            <Route path="/">
                {publicRouters.map((link) =>
                {
                    return (
                        <Route key={link.key} path={link.path} element={link.component} />
                    )   
                }
                )}
            </Route>
        </Routes>
        }
        </>
    )
}

export default AppRouter;