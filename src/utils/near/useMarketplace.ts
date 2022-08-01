import { useCallback } from 'react';
import { nanoid } from 'nanoid';
import { parseNearAmount } from 'near-api-js/lib/utils/format';

import useNearApp from 'utils/near/useNearApp';

const GAS = 100_000_000_000_000;

export interface Product {
    id: string;
    name: string;
    description: string;
    image: string;
    location: string;
    price: string | null;
    owner: string;
}

export default function useMarketplace() {
    const { nearState } = useNearApp();

    const createProduct = useCallback(
        (product: Product) => {
            product.id = nanoid();
            product.price = parseNearAmount(product.price + '');

            return nearState.contract.setProduct({ product });
        },
        [nearState.contract],
    );

    const getProducts = useCallback(() => {
        return nearState.contract.getProducts();
    }, [nearState.contract]);

    const buyProduct = useCallback(
        ({ id, price }: { id: string; price: string | number }) => {
            return nearState.contract.buyProduct({ productId: id }, GAS, price);
        },
        [nearState.contract],
    );

    return { createProduct, getProducts, buyProduct };
}
