import { type CaseReducer, type PayloadAction } from '@reduxjs/toolkit';
import type { WalletConnection } from 'near-api-js';

import { createSlice } from 'utils/toolkit';

export interface NearState {
    walletConnection: WalletConnection | null;
    accountId: string | number | null;
    contract: any;
}

const initialState: NearState = {
    walletConnection: null,
    accountId: null,
    contract: null,
};

const initializeContract: CaseReducer<NearState, PayloadAction<NearState>> = (state, action) => {
    const { walletConnection, accountId, contract } = action.payload;
    Object.assign(state, { walletConnection, accountId, contract });
};

const slice = createSlice({
    name: 'near',
    initialState,
    reducers: {
        initializeContract,
    },
});

export const { name: nearStoreName, reducer: nearReducer, actions: nearActions } = slice;
