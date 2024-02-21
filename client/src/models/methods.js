// @ts-nocheck

export function setWhoIs(personalInfo, data)
{
    if (data.patient)
        personalInfo.isPatient = true;

    if (data.doctor)
        personalInfo.isDoctor = true;

    if (data.name_walletDoctor && data.name_walletPatient)
    {
        personalInfo.nameWallet = { doctor: data.name_walletDoctor, patietn: data.name_walletPatient };
        personalInfo.id = { id_doctor: data.id_doctor, id_patient: data.id_patient };
    }
    personalInfo.nameWallet = data.name_walletPatient ? data.name_walletPatient : data.name_walletDoctor;
    personalInfo.name = data.name;
    personalInfo.id = data.id_doctor ? data.id_doctor : data.id_patient;
    return personalInfo;
}

export function pushList(list, elem);
{
    list.push(elem);
    return listen;
}

export function removeElemFromList(list, id)
{
    list = list.filter((elems) =>
    {
        return elems !== id;
    });
    return list;
}

export function addExtraDataPersonalInfo(state, key, data)
{
    state.personalInfo[key] = data;
    return state.personalInfo;
}