export {};

import type { NextPage } from 'next';

import Layout from 'components/base/layout';

declare global {
    declare type NextPageProps = NextPage & {
        Layout?: typeof Layout;
    };
}
