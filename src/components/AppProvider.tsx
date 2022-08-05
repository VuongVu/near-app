import { type ReactNode } from 'react';
import type { NextComponentType, NextPageContext } from 'next';
import { Provider } from 'react-redux';

import Toast from 'components/toast';

import store from 'store';

function Noop({ children }: { children: ReactNode }) {
    return <>{children}</>;
}

type AppProviderProps = {
    Component: NextComponentType<NextPageContext, any, any>;
    pageProps: any;
};

function AppProvider(props: AppProviderProps) {
    const { Component, pageProps } = props;

    const Layout = (Component as any).Layout || Noop;

    return (
        <Provider store={store}>
            <Toast />

            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    );
}

export default AppProvider;
