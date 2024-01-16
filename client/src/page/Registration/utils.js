// @ts-nocheck
import { registration } from "../../http/userAPI";
import Web3 from 'web3';
export function optionCities(element)
{
    return `${element.region}:${element.city}`
}

export function optionContacts_doctors(element)
{
    return `${element.office_phone}:${element.office_mail}`
}

export function optionHospitals(element)
{
    return `${element.city}:${element.number_hospital}`
}

export function optionCategory(element)
{
    return `${element.category}`
}

export function optionProfession(element)
{
    return `${element.profession}`
}

function isExistsData(data)
{
    for (const property in data)
    {
        if (data[property] === undefined || data[property] === null)
        {
            if(data.isDoctorRegistering === true)
                return false;
            else if( property !== 'contacts_id' && property !== 'hospital_id' && property !== 'category' && property !== 'profession')
            {
                return false;
            }
        }
            
    }
}

function isEmpty(data)
{
    for(const property in data)
    {
        if (data[property] === "" && property !== "lastname")
        {
            if(data.isDoctorRegistering === true)
                return false;
            else if( property !== 'contacts_id' && property !== 'hospital_id' && property !== 'category' && property !== 'profession')
            {
                return false;
            }
        }
            
    }
}

export function checkData(data)
{
    if(isExistsData(data) === false || isEmpty(data) === false)
    {
        return false;
    }
    var notOnlyWord = new RegExp("^.*[^A-zА-яЁё].*$");
    if(notOnlyWord.test(data.name) && notOnlyWord.test(data.surname))
    {
        return false; 
    }
    if(data.lastname !== undefined && data.lastname !== null && data.lastname != "")
    {
        if(notOnlyWord.test(data.lastname))
        {
            return false; 
        }
    }

    const passReg = new RegExp(/^(?=.*[\d])(?=.*[!@#$%^&+*;:})({])[\w!@#$%^&+*;:})({]{10,255}$/);
    if(data.password !== undefined && passReg.test(data.password) === false) 
    {
        console.log(passReg.test(data.password))
        return false;
    }

    return true;
}

function convertDateFormat(inputDate) 
{
    if(inputDate.includes('-'))
    {
        const parts = inputDate.split('-');
        return `${parts[0]}-${parts[1]}-${parts[2]}`;
    }
    else
    {
        const parts = inputDate.split('.');
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
        
}
export async function registrationContractAndInDatabase(data,user,registration_data)
{
    if(user.contract)
    {   
        return await user.contract.methods.createPatient().send({from :data.meta}, (error,result) =>
        {
            if(error)
                return console.error(error);
            console.log('txHash:',result);
        })
        .then(async (receipt) =>
        {
            registration_data.setIsRegisteredContract(true);
            console.log(receipt);
            return await user.contract.getPastEvents("NewPatient",
            {                               
                fromBlock: 0,     
                toBlock: 'latest'     
            }).then(async (events) => 
            { 

                console.log('Contract ' ,events[0].returnValues[3]);
                data["account_contract"] = events[0].returnValues[3];
                data.bdate = convertDateFormat(data.bdate);
                data["name_wallet"] = "ETH";
                const response = await registration(data);
                if (response && response.status && response.status >= 200 && response.status < 300)
                    registration_data.setIsRegisteredDB(true);
                return response;
            })
            .catch((err) => 
            {

                console.error(err);
                return {status:501, data: { message: "Problem with get data from contract, but contract created!"} };
            });
            
        })
        .catch((err) =>
        {
            console.log("Denied");
            console.error(err);
            return {status:4001, data: { message: err.message} };
        })
        
    }
    
}