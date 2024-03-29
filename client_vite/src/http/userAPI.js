import { $host } from ".";

export const registration = async ({
    name,
    surname,
    lastname,
    addressOfResidence,
    addressRegistered,
    insurancePolicy,
    phone,
    email,
    bdate:birthDate,
    meta:wallet,
    password,
    isDoctorRegistering,
    contacts_id,
    hospital_id,
    category,
    profession,
    account_contract,
    name_wallet}) =>
{
    let response = undefined;
    try 
    {
        response = await $host.post('api/register',
        {
            name,
            surname,
            lastname,
            addressOfResidence,
            addressRegistered,
            insurancePolicy,
            phone,
            email,
            bdate:birthDate,
            meta:wallet,
            password,
            isDoctorRegistering,
            contacts_id,
            hospital_id,
            category ,
            profession,
            account_contract,
            name_wallet
        });
       // console.log(response);
        return response; 
    } catch (error) 
    {
        console.log('Error registration (userAPI)');
        console.error(error);
        if(error.message)
            console.log(error.message);
        if(error.response)
            response = error.response;
    }
    finally
    {
        return response;
    }
}