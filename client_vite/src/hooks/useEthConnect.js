// @ts-nocheck
import { useEffect, useState } from "react";
import { getWeb3, getAccountsEth } from "../utils/helper";

export function useEthConnectAccount()
{
    const [eth, setEth] = useState({ web3: undefined, account: undefined });

    useEffect(() =>
    {
        async function getAccountAndWeb3()
        {
            const web3 = await getWeb3();
            const accounts = await getAccountsEth(web3);

            if (!accounts || (accounts && accounts.length === 0))
            {
                console.log("Not connect with wallet or You have not wallet-account!");
                return;
            }
            setEth({ web3: web3, account: accounts[0] });
        }
        if (!eth.web3 || !eth.account)
            getAccountAndWeb3();
    }, [])

    return { ...eth };
}