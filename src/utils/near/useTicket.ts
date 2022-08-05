import { useCallback } from 'react';
import { nanoid } from 'nanoid';
import { parseNearAmount } from 'near-api-js/lib/utils/format';

import useNearApp from 'utils/near/useNearApp';

const GAS = 100_000_000_000_000;

export interface Ticket {
    id: string;
    name: string;
    description: string;
    image: string;
    price: string | null;
    owner: string;
    remaining: number;
    sold: number;
}

export default function useTicket() {
    const { nearState } = useNearApp();

    const initialTicket = useCallback(
        (newTicket: Ticket) => {
            newTicket.id = nanoid();
            newTicket.price = parseNearAmount(newTicket.price + '');
            newTicket.remaining = newTicket.remaining;

            console.log(newTicket);

            return nearState.contract.initialTicket({ newTicket });
        },
        [nearState.contract],
    );

    const getTickets = useCallback(() => {
        return nearState.contract.getTickets();
    }, [nearState.contract]);

    const buyTicket = useCallback(
        ({ id, price }: { id: string; price: string | null }) => {
            return nearState.contract.buyTicket({ ticketId: id }, GAS, price);
        },
        [nearState.contract],
    );

    return { initialTicket, getTickets, buyTicket };
}
