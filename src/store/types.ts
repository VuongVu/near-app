import type { NearState } from 'utils/near/slice';

export type RootState = {
    near: NearState;
};

export type RequiredRootState = Required<RootState>;

export type RootStateKey = keyof RootState;
