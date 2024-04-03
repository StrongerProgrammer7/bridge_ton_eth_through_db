// @ts-nocheck
const ActionTypes =
{
    ACCOUNT_WALLET: 'ACCOUNT_WALLET',
    CONTRACT: 'CONTRACT',
    WHOIS: 'WHOIS',
    ADD_DOCTOR: 'ADD_DOCTOR',
    REMOVE_DOCTOR: 'REMOVE_DOCTOR',
    NEW_LIST_DOCTOR: 'NEW_LIST_DOCTOR',
    EXTRA_DATA: 'EXTRA_DATA',
    IS_AUTH: 'IS_AUTH',
    LOADING: 'LOADING',
    NAME_WALLET: 'NAME_WALLET',
    CLEAR_DATA: 'CLEAR_DATA',
    WEB3_CONNECT: 'WEB3_CONNECT'
};

export const ActionRegistration =
{
    IS_EXISTS_DATA_IN_DB: 'IS_EXISTS_DATA_IN_DB',
    IS_EXISTS_DATA_IN_CONTRACT: 'IS_EXISTS_DATA_IN_CONTRACT',
    IS_REGISTRATION: 'IS_REGISTRATION',
}

export const NameWallet =
{
    TON: "TON",
    ETH: "ETH"
}

export const MessageForTON =
{
    REGISTRAION: "Registration",
    REMOVE_ADDRESS: "Remove",
    ADD_ADDRESS: "Push",

}

export default ActionTypes;