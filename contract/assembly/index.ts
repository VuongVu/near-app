import { soldTicketsStorage, Ticket, ticketsStorage } from './model';
import { context, ContractPromiseBatch } from 'near-sdk-as';


/**
 * @dev allows users to create a new ticket Event
 * @param newTicket object containing values to create a new instance of Ticket
 */
export function initialTicket(newTicket: Ticket): void {
    let ticket = ticketsStorage.get(newTicket.id);
    if (ticket) {
        throw new Error(`A ticket with id=${ticket.id} already exists`);
    }
    assert(newTicket.remaining > u32.MIN_VALUE, "At least one ticket must be available");
    ticketsStorage.set(newTicket.id, Ticket.initial(newTicket));
}

/**
 * @dev allows a ticket event's owner to increase the number of tickets remaining
 * @param ticketId id of Ticket
 * @param quantity increasing amount for number of tickets
 */
export function increaseTickets(ticketId: string, quantity: u32): void {
    let ticket = ticketsStorage.get(ticketId);
    if (!ticket) {
        throw new Error('Ticket not found');
    }
    if (ticket.owner != context.sender) {
        throw new Error("You don't have permission");
    }
    assert(quantity > u32.MIN_VALUE, "Quantity must be at least one");
    ticket.increaseTickets(quantity);
    ticketsStorage.set(ticketId, ticket);
}

/**
 * @dev allows a ticket event's owner to decrease the number of tickets remaining
 * @param ticketId id of Ticket
 * @param quantity decreasing amount for number of tickets
 */
export function reduceTickets(ticketId: string, quantity: u32): void {
    let ticket = ticketsStorage.get(ticketId);
    if (!ticket) {
        throw new Error('Ticket not found');
    }
    if (ticket.owner != context.sender) {
        throw new Error("You don't have permission");
    }
    assert(quantity > u32.MIN_VALUE, "Quantity must be at least one");
    ticket.decreaseTickets(quantity);
    ticketsStorage.set(ticketId, ticket);
}

/**
 * @dev allows users to buy tickets from a ticket event
 * @param ticketId id of Ticket
 */
export function buyTicket(ticketId: string): void {
    const ticket = getTicket(ticketId);
    if (!ticket) {
        throw new Error('Ticket not found');
    }

    if (!ticket.checkTicketAvailable()) {
        throw new Error('Tickets sold out');
    }
    assert(context.sender.toString() != ticket.owner.toString(), "You can't buy your own tickets");
    assert(ticket.price.toString() == context.attachedDeposit.toString(), "Attached deposit must be equal to the ticket's price");
    ContractPromiseBatch.create(ticket.owner).transfer(context.attachedDeposit);
    ticket.soldTicket();
    ticketsStorage.set(ticket.id, ticket);

    let prevTickets = soldTicketsStorage.get(context.sender);

    if (!prevTickets) {
        prevTickets = new Array<string>();
    }
    prevTickets.push(ticketId);
    soldTicketsStorage.set(context.sender, prevTickets);
}

export function getTicket(id: string): Ticket | null {
    return ticketsStorage.get(id);
}

export function getTickets(): Ticket[] {
    return ticketsStorage.values();
}

export function getUserTickets(): Ticket[] {
    let tickets = soldTicketsStorage.get(context.sender);

    let ticketArray: Ticket[] = [];

    if (tickets) {
        for (let i = 0; i < tickets.length; i++) {
            let ticket = ticketsStorage.get(tickets[i]);
            if (ticket) {
                ticketArray.push(ticket);
            }
        }
    }
    return ticketArray;
}
