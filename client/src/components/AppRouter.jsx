// @ts-nocheck
import React, { useContext } from "react";
import { Route, Routes } from 'react-router-dom';
import { Context } from "../";
import { privateRoutes,publicRouters } from "../router/Router";
import Spinner from 'react-bootstrap/Spinner';
import { useSelector } from "react-redux";


const AppRouter = () =>
{
    const { isLoading } = useContext(Context);
    const user = useSelector(state => state.userReducer);

    if(user.loading)
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
        user.isAuth
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