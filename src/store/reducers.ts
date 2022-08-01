import { combineReducers } from '@reduxjs/toolkit';

import { nearReducer } from 'utils/near/slice';
import type { InjectedReducersType } from 'hooks/injectorsEnhancer/types';

export default function createReducer(injectedReducers: InjectedReducersType = {}) {
    return combineReducers({
        near: nearReducer,
        ...injectedReducers,
    });
}
