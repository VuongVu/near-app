import { soldTicketsStorage, Ticket, ticketsStorage } from './model';
import { context, ContractPromiseBatch } from 'near-sdk-as';

export function initialTicket(newTicket: Ticket): void {
    let ticket = ticketsStorage.get(newTicket.id);
    if (ticket) {
        throw new Error(`A ticket with id=${ticket.id} already exists`);
    }

    ticketsStorage.set(newTicket.id, Ticket.initial(newTicket));
}

export function increaseTickets(ticketId: string, quantity: u32): void {
    let ticket = ticketsStorage.get(ticketId);
    if (!ticket) {
        throw new Error('Ticket not found');
    }
    if (ticket.owner != context.sender) {
        throw new Error("You don't have permission");
    }

    ticket.remaining += quantity;
    ticketsStorage.set(ticketId, ticket);
}

export function reduceTickets(ticketId: string, quantity: u32): void {
    let ticket = ticketsStorage.get(ticketId);
    if (!ticket) {
        throw new Error('Ticket not found');
    }
    if (ticket.owner != context.sender) {
        throw new Error("You don't have permission");
    }

    if (ticket.remaining < quantity) {
        ticket.remaining = 0;
    } else {
        ticket.remaining -= quantity;
    }
    ticketsStorage.set(ticketId, ticket);
}

export function buyTicket(ticketId: string): void {
    const ticket = getTicket(ticketId);
    if (!ticket) {
        throw new Error('Ticket not found');
    }

    if (!ticket.checkTicketAvailable()) {
        throw new Error('Tickets sold out');
    }

    if (ticket.price.toString() > context.attachedDeposit.toString()) {
        throw new Error("Attached deposit should be greater than the ticket's price");
    }

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
