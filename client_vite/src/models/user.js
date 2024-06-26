// @ts-nocheck
import ActionTypes from "../store/enums/ActionTypes";
import { setWhoIs, pushList, removeElemFromList, addExtraDataPersonalInfo, clearPersonalData } from "./methods";

const initialState =
{
    accountWallet: null,
    personalInfo:
    {
        name: "",
        isDoctor: false,
        isPatient: false,
        nameWallet: null,
        id: null
    },
    contract: null,
    listDoctorsAccess: [],
    web3Connect: null,
    isAuth: false,
    loading: true,
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
        case ActionTypes.ISDOCTOR:
            return { ...state, personalInfo: { ...state.personalInfo, isDoctor: action.payload } };
        case ActionTypes.ISPATIENT:
            return { ...state, personalInfo: { ...state.personalInfo, isPatient: action.payload } };
        case ActionTypes.EXTRA_DATA:
            return { ...state, personalInfo: addExtraDataPersonalInfo(state, action.payload.key, action.payload.data) };
        case ActionTypes.ADD_DOCTOR:
            state.listDoctorsAccess.push(action.payload);
            return { ...state };
        case ActionTypes.REMOVE_DOCTOR:
            return { ...state, listDoctorsAccess: removeElemFromList(state.listDoctorsAccess, action.payload) };
        case ActionTypes.NEW_LIST_DOCTOR:
            return { ...state, listDoctorsAccess: action.payload };
        case ActionTypes.IS_AUTH:
            return { ...state, isAuth: action.payload };
        case ActionTypes.NAME_WALLET:
            return { ...state, personalInfo: { ...state.personalInfo, nameWallet: action.payload } };
        case ActionTypes.WEB3_CONNECT:
            return { ...state, web3Connect: action.payload };
        case ActionTypes.LOADING:
            return { ...state, loading: action.payload };
        case ActionTypes.CLEAR_DATA:
            return { ...state, personalInfo: clearPersonalData() };
        default:
            return state;
    }
}


export const UserControls =
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
    setPatient: (value) => ({
        type: ActionTypes.ISPATIENT,
        payload: value
    }),
    setDoctor: (value) => ({
        type: ActionTypes.ISDOCTOR,
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
    }),
    setAuth: (value) => ({
        type: ActionTypes.IS_AUTH,
        payload: value
    }),
    setWeb3Connect: (value) => ({
        type: ActionTypes.WEB3_CONNECT,
        payload: value
    }),
    setNameWallet: (value) => ({
        type: ActionTypes.NAME_WALLET,
        payload: value
    }),
    setLoading: (value) => ({
        type: ActionTypes.LOADING,
        payload: value
    }),
    clearData: () => ({
        type: ActionTypes.CLEAR_DATA
    })
}
