import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { formatNearAmount } from 'near-api-js/lib/utils/format';

import { nearEnv } from 'utils/near/initializeContract';
import { ROUTERS } from 'routers';
import { useAppSelector } from 'store';

export default function useNearApp() {
    const nearState = useAppSelector(state => state.near);
    const router = useRouter();

    const getAccountBalance = useCallback(async () => {
        const accountBalance = await nearState.walletConnection?.account().getAccountBalance();

        return accountBalance?.total ? formatNearAmount(accountBalance.total, 2) : 0;
    }, [nearState.walletConnection]);

    const getAccountId = useCallback(() => {
        return nearState.walletConnection?.getAccountId();
    }, [nearState.walletConnection]);

    const login = useCallback(() => {
        nearState.walletConnection?.requestSignIn(nearEnv.contractName);
    }, [nearState.walletConnection]);

    const logout = useCallback(() => {
        nearState.walletConnection?.signOut();
        // force to home page
        router.replace(ROUTERS.HOME.path);
    }, [nearState.walletConnection, router]);

    return { nearState, getAccountBalance, getAccountId, login, logout };
}
