import { Ticket, ticketsStorage } from './model';
import { context, ContractPromiseBatch } from 'near-sdk-as';

export function initialTicket(newTicket: Ticket): void {
    let ticket = ticketsStorage.get(newTicket.id);
    if (ticket) {
        throw new Error(`A ticket with id=${ticket.id} already exists`);
    }

    ticketsStorage.set(newTicket.id, Ticket.initial(newTicket));
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
}

export function getTicket(id: string): Ticket | null {
    return ticketsStorage.get(id);
}

export function getTickets(): Ticket[] {
    return ticketsStorage.values();
}
