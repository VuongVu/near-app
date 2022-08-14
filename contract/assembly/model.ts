import { PersistentUnorderedMap, context, u128 } from 'near-sdk-as';

@nearBindgen
export class Ticket {
    id: string;
    name: string;
    description: string;
    image: string;
    price: u128;
    owner: string;
    sold: u32;
    remaining: u32;

    public static initial(payload: Ticket): Ticket {
        const ticket = new Ticket();
        ticket.id = payload.id;
        ticket.name = payload.name;
        ticket.description = payload.description;
        ticket.image = payload.image;
        ticket.price = payload.price;
        ticket.owner = context.sender;
        ticket.remaining = payload.remaining;

        return ticket;
    }

    public soldTicket(): void {
        this.sold = this.sold + 1;
        this.remaining = this.remaining - 1;
    }
    public increaseTickets(quantity: u32 ): void {
        this.remaining = this.remaining + quantity;
    }

    public decreaseTickets(quantity: u32): void {
        if (this.remaining < quantity) {
            this.remaining = 0;
        } else {
            this.remaining = this.remaining -  quantity;
        }
    }

    public checkTicketAvailable(): boolean {
        return this.remaining > 0;
    }
}

export const ticketsStorage = new PersistentUnorderedMap<string, Ticket>('TICKETS');

export const soldTicketsStorage = new PersistentUnorderedMap<string, Array<string>>('SOLD_TICKETS');
