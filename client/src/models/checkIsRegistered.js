// @ts-nocheck
import { ActionRegistration } from "../store/enums/ActionTypes";
const initialState =
{
    isRegisteredDB: false,
    isRegisteredContract: false,
    isRegistered: false
}


export function checkRegistrationDataReducer(state = initialState, action)
{
    switch (action.type)
    {
        case ActionRegistration.IS_EXISTS_DATA_IN_CONTRACT:
            return { ...state, isRegisteredContract: action.payload };
        case ActionRegistration.IS_EXISTS_DATA_IN_DB:
            return { ...state, isRegisteredDB: action.payload };
        case ActionRegistration.IS_REGISTRATION:
            return { ...state, isRegistered: action.payload };
        default:
            return state;

    }
}


export const checkRegistrationControls =
{
    setRegisteredContract: (value) => ({
        type: ActionRegistration.IS_EXISTS_DATA_IN_CONTRACT,
        payload: value,
    }),
    setRegisteredDB: (value) => ({
        type: ActionRegistration.IS_EXISTS_DATA_IN_DB,
        payload: value,
    }),
    setRegistered: (value) => ({
        type: ActionRegistration.IS_REGISTRATION,
        payload: value,
    })
}
