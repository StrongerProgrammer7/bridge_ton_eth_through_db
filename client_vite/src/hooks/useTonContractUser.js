// @ts-nocheck
import { useTonConnect } from "./useTonConnect";
import { Address } from "@ton/core";
import { Patient } from "../utils/contractTon/wrappers/Patient";
import useTonClient from "./useTonClient";
import useAsyncInitialize from "./useAsyncInitialize";
import useTonContract from "./useTonContract";

const useTonContractUser = () =>
{
    const { client } = useTonClient();
    const { wallet } = useTonConnect();
    const { contract_patients } = useTonContract();

    const contract_user = useAsyncInitialize(async () =>
    {
        if (!client || !wallet || !contract_patients) return;

        const contract_address = await contract_patients.getContractPatient(Address.parse(wallet));
        if (!contract_address)
            return;

        const contract = Patient.fromAddress(contract_address);

        return client.open(contract);
    }, [client, wallet, contract_patients]);
    return {
        contract_user: contract_user,
        contract_address_user: contract_user?.address.toString()
    }
}

export default useTonContractUser;