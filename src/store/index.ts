import { useSelector } from 'react-redux';
import { configureStore, MiddlewareArray } from '@reduxjs/toolkit';
import type { AnyAction, Dispatch } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { createInjectorsEnhancer } from 'redux-injectors';
import { useDispatch, type TypedUseSelectorHook } from 'react-redux';

import { IS_PROD } from 'configs/env';

import createReducer from './reducers';
import rootSaga from './sagas';
import type { RootState } from './types';

function initialStore(initialState = {}) {
    const reduxSagaMonitorOptions = {};
    const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
    const { run: runSaga } = sagaMiddleware;

    const middleware = new MiddlewareArray().concat(sagaMiddleware);

    const enhancers = [
        createInjectorsEnhancer({
            createReducer,
            runSaga,
        }),
    ];

    const store = configureStore({
        reducer: createReducer(),
        preloadedState: initialState,
        middleware,
        enhancers,
        devTools: !IS_PROD && {
            shouldHotReload: false,
        },
    });

    sagaMiddleware.run(rootSaga);

    return store;
}

const store = initialStore();

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = (): Dispatch<AnyAction> => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
