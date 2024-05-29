import { toNano } from '@ton/core';
import { Patients } from '../wrappers/Patients';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const patients = provider.open(await Patients.fromInit());

    await patients.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(patients.address);

    // run methods on `patients`
}
