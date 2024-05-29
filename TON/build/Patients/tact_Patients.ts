import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type Registration = {
    $$type: 'Registration';
    id: bigint;
}

export function storeRegistration(src: Registration) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(320965295, 32);
        b_0.storeUint(src.id, 256);
    };
}

export function loadRegistration(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 320965295) { throw Error('Invalid prefix'); }
    let _id = sc_0.loadUintBig(256);
    return { $$type: 'Registration' as const, id: _id };
}

function loadTupleRegistration(source: TupleReader) {
    let _id = source.readBigNumber();
    return { $$type: 'Registration' as const, id: _id };
}

function storeTupleRegistration(source: Registration) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.id);
    return builder.build();
}

function dictValueParserRegistration(): DictionaryValue<Registration> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRegistration(src)).endCell());
        },
        parse: (src) => {
            return loadRegistration(src.loadRef().beginParse());
        }
    }
}

export type DocsAddress = {
    $$type: 'DocsAddress';
    docs_address: string;
}

export function storeDocsAddress(src: DocsAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.docs_address);
    };
}

export function loadDocsAddress(slice: Slice) {
    let sc_0 = slice;
    let _docs_address = sc_0.loadStringRefTail();
    return { $$type: 'DocsAddress' as const, docs_address: _docs_address };
}

function loadTupleDocsAddress(source: TupleReader) {
    let _docs_address = source.readString();
    return { $$type: 'DocsAddress' as const, docs_address: _docs_address };
}

function storeTupleDocsAddress(source: DocsAddress) {
    let builder = new TupleBuilder();
    builder.writeString(source.docs_address);
    return builder.build();
}

function dictValueParserDocsAddress(): DictionaryValue<DocsAddress> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDocsAddress(src)).endCell());
        },
        parse: (src) => {
            return loadDocsAddress(src.loadRef().beginParse());
        }
    }
}

export type Push = {
    $$type: 'Push';
    address: string;
}

export function storePush(src: Push) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3318127504, 32);
        b_0.storeStringRefTail(src.address);
    };
}

export function loadPush(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3318127504) { throw Error('Invalid prefix'); }
    let _address = sc_0.loadStringRefTail();
    return { $$type: 'Push' as const, address: _address };
}

function loadTuplePush(source: TupleReader) {
    let _address = source.readString();
    return { $$type: 'Push' as const, address: _address };
}

function storeTuplePush(source: Push) {
    let builder = new TupleBuilder();
    builder.writeString(source.address);
    return builder.build();
}

function dictValueParserPush(): DictionaryValue<Push> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePush(src)).endCell());
        },
        parse: (src) => {
            return loadPush(src.loadRef().beginParse());
        }
    }
}

export type Remove = {
    $$type: 'Remove';
    address: string;
}

export function storeRemove(src: Remove) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2460672840, 32);
        b_0.storeStringRefTail(src.address);
    };
}

export function loadRemove(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2460672840) { throw Error('Invalid prefix'); }
    let _address = sc_0.loadStringRefTail();
    return { $$type: 'Remove' as const, address: _address };
}

function loadTupleRemove(source: TupleReader) {
    let _address = source.readString();
    return { $$type: 'Remove' as const, address: _address };
}

function storeTupleRemove(source: Remove) {
    let builder = new TupleBuilder();
    builder.writeString(source.address);
    return builder.build();
}

function dictValueParserRemove(): DictionaryValue<Remove> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRemove(src)).endCell());
        },
        parse: (src) => {
            return loadRemove(src.loadRef().beginParse());
        }
    }
}

export type NewPatientRegistration = {
    $$type: 'NewPatientRegistration';
    count: bigint;
    address: Address;
}

export function storeNewPatientRegistration(src: NewPatientRegistration) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1874067204, 32);
        b_0.storeUint(src.count, 256);
        b_0.storeAddress(src.address);
    };
}

export function loadNewPatientRegistration(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1874067204) { throw Error('Invalid prefix'); }
    let _count = sc_0.loadUintBig(256);
    let _address = sc_0.loadAddress();
    return { $$type: 'NewPatientRegistration' as const, count: _count, address: _address };
}

function loadTupleNewPatientRegistration(source: TupleReader) {
    let _count = source.readBigNumber();
    let _address = source.readAddress();
    return { $$type: 'NewPatientRegistration' as const, count: _count, address: _address };
}

function storeTupleNewPatientRegistration(source: NewPatientRegistration) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.count);
    builder.writeAddress(source.address);
    return builder.build();
}

function dictValueParserNewPatientRegistration(): DictionaryValue<NewPatientRegistration> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeNewPatientRegistration(src)).endCell());
        },
        parse: (src) => {
            return loadNewPatientRegistration(src.loadRef().beginParse());
        }
    }
}

 type Patients_init_args = {
    $$type: 'Patients_init_args';
}

function initPatients_init_args(src: Patients_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
    };
}

async function Patients_init() {
    const __code = Cell.fromBase64('te6ccgECFwEABEwAART/APSkE/S88sgLAQIBYgIDApjQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxZ2zzy4ILI+EMBzH8BygABAcv/ye1UEgQCASAKCwLKAZIwf+BwIddJwh+VMCDXCx/eIIIQEyGKr7qOlTDTHwGCEBMhiq+68uCB0/8BMds8f+CCEJRqmLa6jqfTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gMHAFBwPYAaT4Q/go+ELbPFxwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiATIAYIQEyGKr1jLH8v/yRSCEBHhowByU0Z/BkVV2zxYDQgGAfBwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFIQyFmCEG+z/wRQA8sfy/8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyfhCAX9t2zwHATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPAgByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsACQCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAJJvxhBBrpMCAhd15cEQQa4WFEECCf915aETBhN15cERtngDtnhjBIMAgEgDg8BkPhD+ChY2zxwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiA0A2gLQ9AQwbQGCAKinAYAQ9A9vofLghwGCAKinIgKAEPQXyAHI9ADJAcxwAcoAQANZINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFskCAW4QEQIBSBUWAg+tIe2ebZ4YwBITAJWt6ME4LnYerpZXPY9CdhzrJUKNs0E4TusalpWyPlmRadeW/vixHME4ECrgDcAzscpnLB1XI5LZYcE4TsunLVmnZbmdB0s2yjN0UkABPO1E0NQB+GPSAAGU0/8BMeAw+CjXCwqDCbry4InbPBQAAiAAAnAAEbCvu1E0NIAAYAB1sm7jQ1aXBmczovL1FtZEZRZW5hVHlZUU5yNFdUaVpGVTJmYmdmN1FLZWR0anRITlVKZzFuYnNScG6CA=');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initPatients_init_args({ $$type: 'Patients_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Patients_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    36880: { message: `Only owner!` },
    54404: { message: `Parent only` },
}

const Patients_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Registration","header":320965295,"fields":[{"name":"id","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"DocsAddress","header":null,"fields":[{"name":"docs_address","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"Push","header":3318127504,"fields":[{"name":"address","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"Remove","header":2460672840,"fields":[{"name":"address","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"NewPatientRegistration","header":1874067204,"fields":[{"name":"count","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
]

const Patients_getters: ABIGetter[] = [
    {"name":"ContractPatient","arguments":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"countPatients","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

const Patients_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"Registration"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class Patients implements Contract {
    
    static async init() {
        return await Patients_init();
    }
    
    static async fromInit() {
        const init = await Patients_init();
        const address = contractAddress(0, init);
        return new Patients(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Patients(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Patients_types,
        getters: Patients_getters,
        receivers: Patients_receivers,
        errors: Patients_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: Registration | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Registration') {
            body = beginCell().store(storeRegistration(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getContractPatient(provider: ContractProvider, owner: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(owner);
        let source = (await provider.get('ContractPatient', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getCountPatients(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('countPatients', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}