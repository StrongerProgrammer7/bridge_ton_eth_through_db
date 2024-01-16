// @ts-nocheck
import { Navigate } from "react-router-dom";
import ProfileDoctor from '../page/Profile_doctor/ProfileDoctor';
import Profile from '../page/Profile/Patient/Profile';
import Registration from '../page/Registration/Registration';

import Main from '../page/Main/Main';
import { PROFILE_ROUTE, PROFILEDOCTOR_ROUTER, REGISTRATION_ROUTE,MAIN_ROUTE } from "../utils/consts";

 
export const privateRoutes = 
[
    { key:"0x824231" ,path:MAIN_ROUTE, index: true, component: <Main/>},
    { key:"0x82423" ,path: PROFILE_ROUTE, component: <Profile/>},
    { key:"0x824546" ,path: PROFILEDOCTOR_ROUTER, component: <ProfileDoctor/>},
    //{ key:"0x82412" ,path: 'error', component: <Error/>},
    //{ key:"0x8242112" ,path: 'login', component: <Navigate to="/" />},
    { key:"0x824543" ,path: '*', component: <Navigate to="/error" replace={true}/>}
]

export const publicRouters = 
[
    { key:"0x8242171" ,path: REGISTRATION_ROUTE, component: <Registration/>},
 //   { key:"0x8242141" ,path: '/login', component: <Login/>},
    { key:"0x8245412" ,path: MAIN_ROUTE, component: <Main/>},
    { key:"0x824541" ,path: '*', component: <Navigate to="/" />}
]