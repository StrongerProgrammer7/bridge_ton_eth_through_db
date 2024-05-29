import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Patient } from '../wrappers/Patient';
import '@ton/test-utils';

describe('Patient', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let patient: SandboxContract<Patient>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        patient = blockchain.openContract(await Patient.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await patient.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: patient.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and patient are ready to use
    });
});
