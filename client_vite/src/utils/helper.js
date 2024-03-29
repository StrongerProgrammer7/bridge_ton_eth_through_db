// @ts-nocheck
import Web3 from 'web3';

// @ts-nocheck
export const getLocalStorageItem = (key) =>
{
    if(!localStorage || !localStorage.getItem(key)) return null;
    
    const elem = window.localStorage.getItem(key);
    try 
    {
        const arr = JSON.parse(elem); 
        return arr;   
    } catch (error) 
    {
        console.log("Error with JSON parse from localStorage");
        console.error(error);
    }
}

export const setLocalStorageItem =(key,value) =>
{
    try
    {
        localStorage.setItem(key,value);
    }
    catch(error)
    {
        console.log("Error with set to local storage key:" , key, " value:",value);
        console.error(error);
    }
}


export const removeLocalStorageItem =(key) =>
{
    try
    {
        const elem = getLocalStorageItem(key);
        if(!elem) return;
        localStorage.removeItem(key);
    }
    catch(error)
    {
        console.log("Error with remove from local storage key:" , key);
        console.error(error);
    }
}

export const getWeb3 = async () =>
{
    try
    {
        return new Web3(window.ethereum);
    }
    catch(error)
    {
        console.log("Error with get web3");
        console.error(error);   
    }
}
export const getAccountsEth = async (web3,setSwitchOn=null) =>
{
    try 
    {
        return await web3.eth.requestAccounts();
    } catch (error) 
    {
        if(error.message)
        {
            console.log(error.message);
            if(error.message === "Returned error: User rejected the request.");
                setSwitchOn(false);
            if(error.message.includes("Please wait") === false && error.message.includes("User rejected the request.") === false)
                console.error(error);

        }else
            console.error(error);       
    }
}

export const connectContractETH = async (web3,abi,address) =>
{
    try
    {
        return new web3.eth.Contract(abi,address);
    }
    catch(error) 
    {
        console.log("Error with connect to contract");
        console.error(error);
        throw error;
    }
}