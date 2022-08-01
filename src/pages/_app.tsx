import 'assets/styles/main.css';

import { useEffect } from 'react';
import { type AppProps } from 'next/app';
import NextHead from 'next/head';

import AppProvider from 'components/AppProvider';

import initializeContract from 'utils/near/initializeContract';

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        initializeContract();
    }, []);

    return (
        <>
            <NextHead>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </NextHead>

            <AppProvider Component={Component} pageProps={pageProps} />
        </>
    );
}

export default MyApp;
