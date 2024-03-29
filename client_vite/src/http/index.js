// @ts-nocheck
import axios from 'axios';
import { REACT_APP_API_URL } from "../utils/consts";

//Для тех которые не треб авторизации
const $host = axios.create(
    {
        baseURL: REACT_APP_API_URL,
    }
);

const $authHost = axios.create(
    {
        baseURL: REACT_APP_API_URL
    }
)

const authInterceptopr = config =>
{
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
}

$authHost.interceptors.request.use(authInterceptopr);

export {
    $host,
    $authHost
}