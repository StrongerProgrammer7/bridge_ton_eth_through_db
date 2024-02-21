// @ts-nocheck
import ActionTypes from "../store/enums/ActionTypes";
import { setWhoIs, pushList, removeElemFromList, addExtraDataPersonalInfo } from "./methods";
const initialState =
{
    accountWallet: '',
    personalInfo:
    {
        name: "",
        isDoctor: false,
        isPatient: false,
        nameWallet: '',
        id: undefined
    },
    contract: '',
    listDoctorsAccess: []
}


export function userReducer(state = initialState, action)
{
    switch (action.type)
    {
        case ActionTypes.ACCOUNT_WALLET:
            return { ...state, accountWallet: action.payload };
        case ActionTypes.CONTRACT:
            return { ...state, contract: action.payload };
        case ActionTypes.WHOIS:
            return { ...state, personalInfo: setWhoIs(state.personalInfo, action.payload) };
        case ActionTypes.EXTRA_DATA:
            return { ...state, personalInfo: addExtraDataPersonalInfo(state, action.payload.key, action.payload.data) };
        case ActionTypes.ADD_DOCTOR:
            return { ...state, listDoctorsAccess: pushList(listDoctorsAccess, action.payload) };
        case ActionTypes.REMOVE_DOCTOR:
            return { ...state, listDoctorsAccess: removeElemFromList(listDoctorsAccess, action.payload) };
        case ActionTypes.NEW_LIST_DOCTOR:
            return { ...state, listDoctorsAccess: action.payload };
    }
}


export const Controls =
{
    setAccountWallet: (value) => ({
        type: ActionTypes.ACCOUNT_WALLET,
        payload: value,
    }),
    setContract: (value) => ({
        type: ActionTypes.CONTRACT,
        payload: value,
    }),
    setWhoIs: (value) => ({
        type: ActionTypes.WHOIS,
        payload: value
    }),
    addDoctor: (value) => ({
        type: ActionTypes.ADD_DOCTOR,
        payload: value,
    }),
    removeDoctor: (value) => ({
        type: ActionTypes.REMOVE_DOCTOR,
        payload: value,
    }),
    setNewListDoctor: (value) => ({
        type: ActionTypes.NEW_LIST_DOCTOR,
        payload: value,
    }),
    addExtraDataPersonalInfo: (value) => ({
        type: ActionTypes.EXTRA_DATA,
        payload: value
    })
}
