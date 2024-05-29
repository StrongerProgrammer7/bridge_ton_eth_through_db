import "@stdlib/deploy";
import "./patient.tact";
message NewPatientRegistration {
    count: Int as uint256;
    address: Address;
}

contract Patients with Deployable {
    countPatients: Int as uint256 = 0;
    init(){}

    receive(msg: Registration){
        self.countPatients = (self.countPatients + 1);
        let init: StateInit = initOf Patient(myAddress(), sender());
        send(SendParameters{
                to: contractAddress(init),
                body: Registration{id: msg.id}.toCell(),
                value: ton("0.3"),
                mode: SendIgnoreErrors,
                code: init.code,
                data: init.data
            }
        );
        self.reply(NewPatientRegistration{count: self.countPatients, address: contractAddress(init)}.toCell());
    }

    get fun ContractPatient(owner: Address): Address {
        let init: StateInit = initOf Patient(myAddress(), owner);
        return contractAddress(init);
    }

    get fun countPatients(): Int {
        return self.countPatients;
    }
}