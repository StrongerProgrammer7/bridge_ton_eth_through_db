
import { Blockchain, EventAccountCreated, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Address, toNano } from '@ton/core';
import { Push, Patients, Registration } from '../wrappers/Patients';
import '@ton/test-utils';
import { Patient } from '../wrappers/Patient';


describe('Patients', () =>
{
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let patients: SandboxContract<Patients>;

    beforeEach(async () =>
    {
        blockchain = await Blockchain.create();

        patients = blockchain.openContract(await Patients.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await patients.send(
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
            to: patients.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () =>
    {
        // the check is done inside beforeEach
        // blockchain and patients are ready to use
    });

    it('reg', async () =>
    {
        const message: Registration =
        {
            $$type: 'Registration',
            id: BigInt(1)
        }

        await patients.send(deployer.getSender(),
            {
                value: toNano("0.5")
            }, message);

        const count = await patients.getCountPatients();
        //const patient = blockchain.openContract(Patient.fromAddress(addressContract));
        const addr = await patients.getContractPatient(Address.parse(deployer.address.toString()));
        console.log(addr);
        const patr = await Patient.fromAddress(addr);
        const patient = await blockchain.openContract(patr);

        const push: Push =
        {
            $$type: 'Push',
            address: deployer.address.toString(),
        };
        await patient.send(deployer.getSender(),
            {
                value: toNano("0.2")
            }, push).catch(error =>
            {
                console.log(error);
            });
        let docs = await (await patient.getAllDocs()).values();
        console.log(docs);
        expect(count > 0 && docs.length > 0);

    });


});
