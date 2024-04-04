// @ts-nocheck
import { useEffect, useState } from "react";
import { getAccountsEth } from "../utils/helper";

export function useEthConnectAccount(web3)
{
    const [account, setAccount] = useState();

    useEffect(() =>
    {
        async function getAccount()
        {
            const accounts = await getAccountsEth(web3);

            if (!accounts || (accounts && accounts.length === 0))
            {
                console.log("Not connect with wallet or You have not wallet-account!");
                return
            }

            setAccount(accounts[0]);
        }
        if (!account)
            getAccount();
    }, [web3])

    return account;
}