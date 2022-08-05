import { memo, useMemo } from 'react';
import { formatNearAmount } from 'near-api-js/lib/utils/format';
import clsx from 'clsx';
import toNumber from 'lodash/toNumber';
import toString from 'lodash/toString';
import truncate from 'lodash/truncate';

import type { Ticket } from 'utils/near/useTicket';

interface TicketCardProps {
    ticket: Ticket;
    onBuyTicket: () => void;
}

function TicketCard({ ticket, onBuyTicket }: TicketCardProps) {
    const price = useMemo(() => formatNearAmount(toString(ticket.price), 2), [ticket.price]);
    const remaining = useMemo(() => toNumber(ticket.remaining), [ticket.remaining]);
    const sold = useMemo(() => toNumber(ticket.sold), [ticket.sold]);

    return (
        <div className="card card-side bg-base-100 shadow-xl">
            <figure className="h-72 w-52">
                <img src={ticket.image} className="h-full w-full object-cover" alt="ticket_img" />
            </figure>
            <div className="card-body w-[350px]">
                <h2 className="card-title">{truncate(ticket.name, { length: 30 })}</h2>
                <p className="mb-2 flex-grow-0">
                    {truncate(ticket.description, {
                        length: 80,
                    })}
                </p>
                <p
                    className={clsx('flex-grow-0', {
                        'line-through': !remaining,
                    })}>
                    Price: <span className="font-semibold">{price}Ⓝ</span>
                </p>
                <p>
                    Remaining:{' '}
                    <span className="font-semibold">
                        {remaining > 0 ? `${remaining} ticket(s) - ${sold} sold` : 'sold out'}
                    </span>
                </p>

                <div className="card-actions justify-end">
                    <button
                        onClick={onBuyTicket}
                        className={clsx('btn btn-primary', {
                            'btn-disabled': !remaining,
                        })}>
                        Buy ticket
                    </button>
                </div>
            </div>
        </div>
    );
}

export default memo(TicketCard);
