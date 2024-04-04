// @ts-nocheck
import { registration } from "../../http/userAPI";
import { WalletContractV4 } from '@ton/ton';
import { mnemonicToWalletKey } from 'ton-crypto';
import { Address, toNano } from "@ton/core";
import { checkRegistrationControls } from "../../models/checkIsRegistered";
import { MessageForTON, NameWallet } from "../../store/enums/WorkWithWallet";
export function optionCities(element)
{
    return `${ element.region }:${ element.city }`
}

export function optionContacts_doctors(element)
{
    return `${ element.office_phone }:${ element.office_mail }`
}

export function optionHospitals(element)
{
    return `${ element.city }:${ element.number_hospital }`
}

export function optionCategory(element)
{
    return `${ element.category }`
}

export function optionProfession(element)
{
    return `${ element.profession }`
}

function isExistsData(data)
{
    for (const property in data)
    {
        if (data[property] === undefined || data[property] === null)
        {
            if (data.isDoctorRegistering === true)
                return false;
            else if (property !== 'contacts_id' && property !== 'hospital_id' && property !== 'category' && property !== 'profession')
            {
                return false;
            }
        }

    }
}

function isEmpty(data)
{
    for (const property in data)
    {
        if (data[property] === "" && property !== "lastname")
        {
            if (data.isDoctorRegistering === true)
                return false;
            else if (property !== 'contacts_id' && property !== 'hospital_id' && property !== 'category' && property !== 'profession')
            {
                return false;
            }
        }

    }
}

export function checkData(data)
{
    if (isExistsData(data) === false || isEmpty(data) === false)
    {
        return false;
    }
    var notOnlyWord = new RegExp("^.*[^A-zА-яЁё].*$");
    if (notOnlyWord.test(data.name) && notOnlyWord.test(data.surname))
    {
        return false;
    }
    if (data.lastname !== undefined && data.lastname !== null && data.lastname != "")
    {
        if (notOnlyWord.test(data.lastname))
        {
            return false;
        }
    }

    const passReg = new RegExp(/^(?=.*[\d])(?=.*[!@#$%^&+*;:})({])[\w!@#$%^&+*;:})({]{10,255}$/);
    if (data.password !== undefined && passReg.test(data.password) === false) 
    {
        console.log(passReg.test(data.password))
        return false;
    }

    return true;
}

function convertDateFormat(inputDate) 
{
    if (inputDate.includes('-'))
    {
        const parts = inputDate.split('-');
        return `${ parts[0] }-${ parts[1] }-${ parts[2] }`;
    }
    else
    {
        const parts = inputDate.split('.');
        return `${ parts[2] }-${ parts[1] }-${ parts[0] }`;
    }

}
export async function registrationContractEthAndInDatabase(data, user, dispatch)
{
    if (!user.contract)
        return;

    return await user.contract.methods.createPatient().send({ from: data.meta }, (error, result) =>
    {
        if (error)
            return console.error(error);
        console.log('txHash:', result);
    })
        .then(async (receipt) =>
        {
            dispatch(checkRegistrationControls.setRegisteredContract(true));
            console.log(receipt);
            return await user.contract.getPastEvents("NewPatient",
                {
                    fromBlock: 0,
                    toBlock: 'latest'
                }).then(async (events) => 
                {

                    console.log('Contract ', events[0].returnValues[3]);
                    data["account_contract"] = events[0].returnValues[3];
                    data.bdate = convertDateFormat(data.bdate);
                    data["name_wallet"] = NameWallet.ETH;
                    const response = await registration(data);
                    if (response && response.status && response.status >= 200 && response.status < 300)
                        dispatch(checkRegistrationControls.setRegisteredDB(true));//registration_data.setIsRegisteredDB(true);
                    return response;
                })
                .catch((err) => 
                {

                    console.error(err);
                    return { status: 501, data: { message: "Problem with get data from contract, but contract created!" } };
                });

        })
        .catch((err) =>
        {
            console.log("Denied");
            console.error(err);
            return { status: 4001, data: { message: err.message } };
        });
}

function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitingTransaction(contract, message, nano, sender, client, mnemonic)
{
    const key = await mnemonicToWalletKey(mnemonic.split(" "));
    const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });
    try 
    {
        const walletContract = await client.open(wallet);
        const seqno = await walletContract.getSeqno();
        let flag = false;
        let maxWait = 100;
        contract.send(sender,
            {
                value: toNano(nano)
            }, message)
            .catch(err =>
            {
                console.log(err);
                flag = true;
                return;
            });

        let currentSeqno = seqno;
        let ind = 0;
        while (currentSeqno == seqno)
        {
            ind++;
            console.log("waiting for deploy transaction to confirm...");
            await sleep(5);
            currentSeqno = await walletContract.getSeqno();
            if (flag === true || ind >= maxWait)
                return false;
        }
        console.log("deploy transaction confirmed!");
        return true;
    } catch (error) 
    {
        console.warn(error);
        return false;
    }
}

export async function registrationContractTonAndinDatabase(data, user, dispatch, sender, client, mnemonic)
{
    if (!user.contract || !user.accountWallet || !sender || !client)
        return;
    const contract = user.contract;
    const wallet = user.accountWallet;

    const countPatients = await contract.getCountPatients();
    console.log(countPatients);
    if (!countPatients)
        return;

    const msg =
    {
        $$type: MessageForTON.REGISTRAION,
        id: BigInt(Number(countPatients) + 1)
    };

    const result_registration_contract = await waitingTransaction(contract, msg, "0.3", sender, client, mnemonic);
    if (!result_registration_contract)
        return;
    dispatch(checkRegistrationControls.setRegisteredContract(true));
    const address_contract_of_patient = (await contract.getContractPatient(Address.parse(wallet))).toString();
    console.log(address_contract_of_patient);
    data["account_contract"] = address_contract_of_patient;
    data.bdate = convertDateFormat(data.bdate);
    data["name_wallet"] = NameWallet.TON;
    const response = await registration(data);
    if (response && response.status && response.status >= 200 && response.status < 300)
        dispatch(checkRegistrationControls.setRegisteredDB(true));
    return response;

}