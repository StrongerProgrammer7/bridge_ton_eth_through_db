// @ts-nocheck

import { useEffect, useState } from 'react'

/**
 * @param { (): Promise<import("ton").TonClient | undefined>; (): Promise<any>; (): Promise<any>; (): import("react").SetStateAction<undefined> | PromiseLike<import("react").SetStateAction<undefined>>; } func
 * @param {import("react").DependencyList | undefined} deps
 */
function useAsyncInitialize(func, deps) 
{
    const [state, setState] = useState();
    useEffect(() =>
    {
        (async () =>
        {
            setState(await func())
        })()
    }, deps)
    return state;
}

export default useAsyncInitialize
