import { TicketAPI } from "../API/TicketAPI.js";

export const TicketDataAccess = {
    async getFAQs() {
        return await TicketAPI.getFAQs();
    },

    async getTicketsByUser(userId) {
        return await TicketAPI.getTicketsByUser(userId);
    },

    async createTicket(ticketData) {
        return await TicketAPI.createTicket(ticketData);
    }
};