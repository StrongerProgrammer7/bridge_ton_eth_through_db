
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
            if (!network) return;
            return new TonClient(
                {
                    endpoint: await getHttpEndpoint(
                        {
                            network: network === CHAIN.TESTNET ? "testnet" : "mainnet"
                        }
                    )
                }
            )
        }, [network])
    }
}

export default useTonClient
