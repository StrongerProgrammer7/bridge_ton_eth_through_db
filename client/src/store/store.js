// @ts-nocheck
import { applyMiddleware, createStore } from "redux";
import { userReducer } from "../models/user";
import { loggerMiddleware, asyncActionsMiddleware } from './middlewares/middlewares';

export const store = createStore(userReducer, {}, applyMiddleware(loggerMiddleware, asyncActionsMiddleware));