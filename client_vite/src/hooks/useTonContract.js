// @ts-nocheck
import { useTonConnect } from "./useTonConnect";
import { Address } from "@ton/core";
import { Patients } from "../utils/contractTon/wrappers/Patients";
import useTonClient from "./useTonClient";
import useAsyncInitialize from "./useAsyncInitialize";
import { getDataOfContractTon } from "../http/getDataAboutContracts";

const useTonContract = () =>
{
    const { client } = useTonClient();
    const { wallet } = useTonConnect();

    const contract_patients = useAsyncInitialize(async () =>
    {
        if (!client || !wallet) return;

        const contract_address = (await getDataOfContractTon()).data.data.address;
        if (!contract_address)
            return;

        const contract = Patients.fromAddress(Address.parse(contract_address));

        return client.open(contract);
    }, [client, wallet]);
    return {
        contract_patients: contract_patients,
        contract_address_patients: contract_patients?.address.toString()
    }
}

export default useTonContract;