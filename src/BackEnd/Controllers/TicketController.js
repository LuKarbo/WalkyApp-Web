import { TicketService } from "../Services/TicketService.js";

export const TicketController = {
    async fetchFAQs() {
        return await TicketService.getFAQs();
    },

    async fetchTicketsByUser(userId) {
        return await TicketService.getTicketsByUser(userId);
    },

    async createTicket(ticketData) {
        return await TicketService.createTicket(ticketData);
    }
};