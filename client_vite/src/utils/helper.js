// @ts-nocheck
import Web3 from 'web3';
import { WalletContractV4 } from '@ton/ton';
import { mnemonicToWalletKey } from 'ton-crypto';
import { toNano } from "@ton/core";
// @ts-nocheck
export const getLocalStorageItem = (key) =>
{
    if (!localStorage || !localStorage.getItem(key)) return null;

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

export const setLocalStorageItem = (key, value) =>
{
    try
    {
        localStorage.setItem(key, value);
    }
    catch (error)
    {
        console.log("Error with set to local storage key:", key, " value:", value);
        console.error(error);
    }
}


export const removeLocalStorageItem = (key) =>
{
    try
    {
        const elem = getLocalStorageItem(key);
        if (!elem) return;
        localStorage.removeItem(key);
    }
    catch (error)
    {
        console.log("Error with remove from local storage key:", key);
        console.error(error);
    }
}

export const getWeb3 = async () =>
{
    try
    {
        return new Web3(window.ethereum);
    }
    catch (error)
    {
        console.log("Error with get web3");
        console.error(error);
    }
}
export const getAccountsEth = async (web3, setSwitchOn = null) =>
{
    try 
    {
        return await web3.eth.requestAccounts();
    } catch (error) 
    {
        if (error.message)
        {
            console.log(error.message);
            if (error.message === "Returned error: User rejected the request.");
            setSwitchOn(false);
            if (error.message.includes("Please wait") === false && error.message.includes("User rejected the request.") === false)
                console.error(error);

        } else
            console.error(error);
    }
}

export const connectContractETH = async (web3, abi, address) =>
{
    try
    {
        return new web3.eth.Contract(abi, address);
    }
    catch (error) 
    {
        console.log("Error with connect to contract");
        console.error(error);
        throw error;
    }
}
function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}


export async function waitingTransaction(contract, message, nano, sender, client, mnemonic)
{
    const key = await mnemonicToWalletKey(mnemonic.split(" "));
    const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });
    try 
    {
        const walletContract = await client.open(wallet);
        const seqno = await walletContract.getSeqno();
        let flag = false;
        let maxWait = 500;
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
        if (ind >= maxWait)
        {
            console.log("deploy transaction is not success confirmed!");
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
