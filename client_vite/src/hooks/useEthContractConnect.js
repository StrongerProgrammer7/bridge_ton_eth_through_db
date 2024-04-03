// @ts-nocheck
import { useEffect, useState } from "react";
import * as abi from "../http/ABIandAddress";
import { connectContractETH } from "../utils/helper";

export function useEthContractConnect(web3)
{
    const [contract, setContract] = useState(null);

    useEffect(() =>
    {
        async function getContractEth()
        {
            const dataOfContract = await abi.getDataOfContract();
            if (!dataOfContract || (dataOfContract.status && dataOfContract.status >= 300))
            {
                console.error("Don't get data for contract (ABI and address )");
                console.error("Data don't get: ", dataOfContract?.data?.message || dataOfContract?.message);
                return null;
            }

            const data = dataOfContract.data.data;
            const contract = await connectContractETH(web3, data.abi, data.address);
            window.contract = contract;
            setContract(contract);
        }
        if (!contract && web3)
            getContractEth();
    }, [web3])

    return contract;
}