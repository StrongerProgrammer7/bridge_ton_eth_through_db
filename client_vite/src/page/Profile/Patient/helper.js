import { getData, postData } from "../../../http/getDataAPI";
import { changeButton, addActionForListDoctors } from "./utils";
import { isExistsDatas } from '../total_utlls';
import { UserControls } from "../../../models/user";
import { MessageForTON, NameWallet } from "../../../store/enums/WorkWithWallet";
import { Address } from "@ton/core";
import { Patient } from "../../../utils/contractTon/wrappers/Patient";
import { waitingTransaction } from "../../../utils/helper";
async function updatelistDoctorsInDB(list_doctors, table_doctors, accountWallet, button)
{
    postData("api/update_list_doctors", { meta: accountWallet, list_doctors_have_access: list_doctors })
        .then((data) =>
        {
            if (button.id === "btn_action_giveAccess")
            {
                changeButton(button, 'btn-info', 'btn-danger', 'btn_action_revokeAccess', 'Забрать доступ');
                addActionForListDoctors(table_doctors.data(), list_doctors);
                table_doctors.draw();
            } else
            {
                changeButton(button, 'btn-danger', 'btn-info', 'btn_action_giveAccess', 'Дать доступ');
                addActionForListDoctors(table_doctors.data(), list_doctors);
                table_doctors.draw();
            }
        })
        .catch(error => console.log("Error with update DB"));
}

function updateListDoctorsByETHContractMethod(user, name_method, meta_person)
{
    return user.contract.methods[name_method](meta_person).send({ from: user.accountWallet })
        .then((res) =>
        {
            user.contract.getPastEvents("allEvents",
                {
                    fromBlock: 'latest',
                    toBlock: 'latest'
                })
                .then((events) => 
                {
                    console.log(events);
                })
                .catch((err) => console.error(err));
        })
        .catch((error) =>
        {
            console.log("Error with work contract");
            console.error(error);
            throw error;
        })
}

async function updateListDoctorsByTONContractMessage(contract_total, wallet, utils_ton, mnemonic)
{
    if (!mnemonic || !utils_ton.client || !utils_ton.sender || !utils_ton.msg)
        return;

    const contract_user_address = await contract_total.getContractPatient(Address.parse(wallet));
    console.log(contract_user_address.toString());
    const contract_user = Patient.fromAddress(contract_user_address);
    const opened_contract_user = utils_ton.client.open(contract_user);
    console.log(contract_user);
    console.log(opened_contract_user);
    const result = await waitingTransaction(opened_contract_user, utils_ton.msg, "0.3", utils_ton.sender, utils_ton.client, mnemonic);
    if (result)
        console.log((await opened_contract_user.getAllDocs()).values());
    else
        console.log(result, "Error");

    return result;
}


export async function updateListDoctorsGiveRoleETH(id_doctor, meta_doctor, user, dispatch, dt, button)
{
    console.log("update", id_doctor, meta_doctor, button);
    if (!isExistsDatas({ id_doctor, meta_doctor }, ['id_doctor', 'meta_doctor']))
    {
        console.log("Data is not correct");
        return;
    }
    updateListDoctorsByETHContractMethod(user, 'giveRole', meta_doctor)
        .then(async () =>
        {
            dispatch(UserControls.addDoctor(id_doctor));
            let temp_list = user.listDoctorsAccess.toString();
            updatelistDoctorsInDB(temp_list, dt, user.accountWallet, button);
        })
        .catch((err) =>
        {
            console.log('Error with contract or user denied', err);
        });

}

export async function updateListDoctorsGiveRoleTON(id_doctor, meta_doctor, user, dispatch, dt, button, utils_ton)
{
    console.log("update", id_doctor, meta_doctor, button);
    if (!isExistsDatas({ id_doctor, meta_doctor }, ['id_doctor', 'meta_doctor']))
    {
        console.log("Data is not correct");
        return;
    }

    if (!utils_ton.mnemonic || !utils_ton.client || !utils_ton.sender)
        return;
    const message =
    {
        $$type: MessageForTON.ADD_ADDRESS,
        address: meta_doctor,
    }
    utils_ton["msg"] = message;
    updateListDoctorsByTONContractMessage(user.contract, user.accountWallet, utils_ton, utils_ton.mnemonic)
        .then((result) =>
        {
            if (result)
            {
                dispatch(UserControls.addDoctor(id_doctor));
                let temp_list = user.listDoctorsAccess.toString();
                updatelistDoctorsInDB(temp_list, dt, user.accountWallet, button);
            }
        })
        .catch((error) =>
        {
            console.log('Error with contract or user denied', error);
        });
}
export async function updateListDoctorsRevokeRoleETH(id_doctor, meta_doctor, user, dispatch, dt, button)
{
    if (!isExistsDatas({ id_doctor, meta_doctor }, ['id_doctor', 'meta_doctor']))
    {
        console.log("Data is not correct");
        return;
    }
    if (!user.accountWallet || !user.contract)
        return;

    if (user.personalInfo.nameWallet === NameWallet.ETH)
    {
        updateListDoctorsByETHContractMethod(user, 'anualRole', meta_doctor)
            .then(async () =>
            {
                const listDoctors = user.listDoctorsAccess;
                const index = listDoctors.indexOf(id_doctor);
                if (index === -1) return;
                let _list = listDoctors;
                _list.splice(index, 1);
                const _list_str = _list.toString();
                dispatch(UserControls.removeDoctor(id_doctor));


                updatelistDoctorsInDB(_list_str, dt, user.accountWallet, button);
            })
            .catch((err) =>
            {
                console.log('Error with contract or user denied', err);
            });
    }
    else
    {
        console.log("Revoke role doctor TON")
    }
}

export async function updateListDoctorsRevokeRoleTON(id_doctor, meta_doctor, user, dispatch, dt, button, utils_ton)
{
    console.log("update", id_doctor, meta_doctor, button);

    if (!isExistsDatas({ id_doctor, meta_doctor }, ['id_doctor', 'meta_doctor']))
    {
        console.log("Data is not correct");
        return;
    }

    if (!utils_ton.mnemonic || !utils_ton.client || !utils_ton.sender)
        return;
    const message =
    {
        $$type: MessageForTON.REMOVE_ADDRESS,
        address: meta_doctor,
    }
    utils_ton["msg"] = message;
    console.log(utils_ton);
    updateListDoctorsByTONContractMessage(user.contract, user.accountWallet, utils_ton, utils_ton.mnemonic)
        .then((result) =>
        {
            if (result)
            {
                const _listDoctors = user.listDoctorsAccess;
                let index = _listDoctors.indexOf(id_doctor);
                if (index === -1) return;
                _listDoctors.splice(index, 1);

                const _list_str = _listDoctors.toString();
                dispatch(UserControls.removeDoctor(id_doctor));
                updatelistDoctorsInDB(_list_str, dt, user.accountWallet, button);
            }
        })
        .catch((error) =>
        {
            console.log('Error with contract or user denied', error);
        });
}

export async function getListIllsPatients(accountWallet, queryDoctor = false)
{
    try
    {
        return await getData("api/get_all_ill_s_patient", true, { meta: accountWallet, queryDoctor });
    } catch (err)
    {
        console.log("Error: getListIllsPatients")
        return [];
    }

}

export async function getListActualIllsPatients(accountWallet)
{
    try
    {
        return await getData("api/get_all_actuaIllPatient", true, { meta: accountWallet });
    } catch (err)
    {
        console.log("Error: getListActualIllsPatients")
        return [];
    }
}


export async function getListAllDoctors(accountWallet)
{
    return Promise.all([
        await getData("api/getCity", true, { meta: accountWallet }),
        await getData("api/get_all_doctors"),
        await getData("api/get_list_doctors_haveAccess", true, { meta: accountWallet })
    ])
        .catch(err =>
        {
            console.log("Error: getListAllDoctors");
        })
}
