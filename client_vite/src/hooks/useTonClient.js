
import { getHttpEndpoint } from '@orbs-network/ton-access';
import { CHAIN } from '@tonconnect/ui-react';
import { TonClient } from '@ton/ton';
import useAsyncInitialize from './useAsyncInitialize';
import { useTonConnect } from './useTonConnect'

const useTonClient = () => 
{
    const { network } = useTonConnect();
    return {
        client: useAsyncInitialize(async () =>
        {
            let net = network;
            if (!network)
                net = CHAIN.TESTNET;
            return new TonClient(
                {
                    endpoint: await getHttpEndpoint(
                        {
                            network: net === CHAIN.TESTNET ? "testnet" : "mainnet"
                        }
                    )
                }
            )
        }, [network])
    }
}

export default useTonClient
