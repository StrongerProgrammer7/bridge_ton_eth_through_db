// @ts-nocheck
import { applyMiddleware, createStore, combineReducers } from "redux";
import { userReducer } from "../models/user";
import { checkRegistrationDataReducer } from "../models/checkIsRegistered";
import { loggerMiddleware, asyncActionsMiddleware } from './middlewares/middlewares';

const combine = combineReducers({
    userReducer,
    checkRegistrationDataReducer
});
export const store = createStore(
    combine,
    {},
    applyMiddleware(loggerMiddleware, asyncActionsMiddleware)
);