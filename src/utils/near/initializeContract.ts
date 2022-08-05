import { connect, Contract, WalletConnection, keyStores } from 'near-api-js';

import { APP_CONFIGS } from 'configs/env';
import environment from 'utils/near/environment';
import store from 'store';
import { nearActions } from 'utils/near/slice';

export const nearEnv = environment('testnet');

export default async function initializeContract() {
    // @ts-expect-error: let's ignore by library conflict types
    const near = await connect(Object.assign({ keyStore: new keyStores.BrowserLocalStorageKeyStore() }, nearEnv));

    const walletConnection = new WalletConnection(near, APP_CONFIGS.APP_PREFIX!);
    const accountId = walletConnection.getAccountId();
    const contract = new Contract(walletConnection.account(), nearEnv.contractName!, {
        viewMethods: ['getTicket', 'getTickets'],
        changeMethods: ['buyTicket', 'initialTicket'],
    });

    store.dispatch(nearActions.initializeContract({ walletConnection, accountId, contract }));
}
