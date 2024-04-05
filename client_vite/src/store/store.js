// @ts-nocheck
import { applyMiddleware, createStore, combineReducers } from "redux";
import { userReducer } from "../models/user";
import { checkRegistrationDataReducer } from "../models/checkIsRegistered";
import { loggerMiddleware, asyncActionsMiddleware } from './middlewares/middlewares';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// const persistConfig = {
//     key: 'root', // ключ для сохранения в локальное хранилище
//     storage, // выбор места хранения (локальное хранилище, сессионное хранилище и т. д.)
//     whitelist: ['userReducer', 'checkRegistrationDataReducer'] // редюсеры, которые будут сохранены
// };

const userPersistConfig = {
    key: 'user',
    storage,
    whitelist: ['accountWallet', 'personalInfo', 'isAuth'] // указываем только те поля, которые хотим сохранить
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

const combine = combineReducers({
    userReducer: persistedUserReducer,
    checkRegistrationDataReducer
});

//const persistedReducer = persistReducer(persistConfig, combine);

export const store = createStore(
    combine,
    {},
    applyMiddleware(loggerMiddleware, asyncActionsMiddleware)
);
export const persistor = persistStore(store);