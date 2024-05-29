import { toNano } from '@ton/core';
import { Patient } from '../wrappers/Patient';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const patient = provider.open(await Patient.fromInit());

    await patient.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(patient.address);

    // run methods on `patient`
}
