// @ts-nocheck
import { useEffect, useState } from "react";
import { getWeb3 } from "../utils/helper";

export function useEthConnect()
{
    const [web3, setWeb3] = useState();

    useEffect(() =>
    {
        async function getConnectWeb3()
        {
            const web3 = await getWeb3();

            setWeb3(web3);
        }
        if (!web3)
            getConnectWeb3();
    }, [])

    return web3;
}