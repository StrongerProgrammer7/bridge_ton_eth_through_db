// @ts-nocheck



export default class UserStore
{
    
    _accountWallet = '';
    user = {
        name:"",
        isDoctor:false,
        isPatient:false,
        nameWallet:"",
        id:undefined
    };
    _contract = undefined;
    _list_doctors_access = [];
 

    setAccountWallet(account)
    {
        this._accountWallet = account;
    }

    setIsConnectedWallet(connected)
    {
        this._isConnectWallet = connected;
    }

    setContract(contract)
    {
        this._contract = contract;
    }

    setWhoIs(data)
    {
       // console.log(data);
        if(data.patient)
            this.user.isPatient = true;
            
        if(data.doctor)
            this.user.isDoctor = true;

        if(data.name_walletDoctor && data.name_walletPatient)
        {
            this.user.nameWallet = {doctor:data.name_walletDoctor, patietn: data.name_walletPatient};
            this.user.id = { id_doctor:data.id_doctor , id_patient:data.id_patient};
        }
        this.user.nameWallet = data.name_walletPatient ? data.name_walletPatient : data.name_walletDoctor;
        this.user.name = data.name;
        this.user.id = data.id_doctor ? data.id_doctor : data.id_patient;
    }


    addExtraData(key,data)
    {
        this.user[key] = data;
    }

    pushList_doctors(id_doctor)
    {
        this._list_doctors_access.push(id_doctor);
    }

    setNewListDoctors(list)
    {
        this._list_doctors_access = list;
    }

    get accountWallet()
    {
        return this._accountWallet;
    }

    get isConnectedWallet()
    {
        return this._isConnectWallet;
    }

    get contract()
    {
        return this._contract;
    }

    get listDoctors()
    {
        return this._list_doctors_access;
    }
}
