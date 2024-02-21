import { createStore } from "redux";
import { userReducer } from "../models/user";

export const store = createStore(userReducer);