import { type ReactNode } from 'react';
import type { NextComponentType, NextPageContext } from 'next';
import { Provider } from 'react-redux';

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
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    );
}

export default AppProvider;
