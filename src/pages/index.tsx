import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';

import { ROUTERS } from 'routers';
import useNearApp from 'utils/near/useNearApp';
import useMarketplace, { type Product } from 'utils/near/useMarketplace';

const Home: NextPageProps = () => {
    const { login, logout, getAccountId } = useNearApp();
    const { getProducts } = useMarketplace();
    const account = getAccountId();
    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = useCallback(async () => {
        if (account) {
            setProducts(await getProducts());
        }
    }, [account, getProducts]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <>
            <Head>
                <title>{ROUTERS.HOME.title}</title>
            </Head>

            <div>
                {account ? (
                    products.map(product => <div key={product.id}>{product.name}</div>)
                ) : (
                    <button
                        onClick={login}
                        type="button"
                        className="mr-2 mb-2 rounded-lg bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800">
                        Connect Wallet
                    </button>
                )}

                <button
                    onClick={logout}
                    type="button"
                    className="mr-2 mb-2 rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800">
                    Logout
                </button>
            </div>
        </>
    );
};

export default Home;
