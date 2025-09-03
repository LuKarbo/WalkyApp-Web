import { TicketDataAccess } from "../DataAccess/TicketDataAccess.js";

export const TicketService = {
    async getFAQs() {
        const faqs = await TicketDataAccess.getFAQs();
        
        return faqs.map(faq => ({
            id: faq.id,
            question: faq.question,
            answer: faq.answer,
            category: faq.category
        }));
    },

    async getTicketsByUser(userId) {
        if (!userId) {
            throw new Error("User ID is required");
        }

        const tickets = await TicketDataAccess.getTicketsByUser(userId);
        
        return tickets
            .map(ticket => ({
                id: ticket.id,
                subject: ticket.subject,
                message: ticket.message,
                category: this.getCategoryLabel(ticket.category),
                status: ticket.status,
                createdAt: ticket.createdAt,
                updatedAt: ticket.updatedAt,
                response: ticket.response,
                cancellationReason: ticket.cancellationReason
            }))
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },

    async createTicket(ticketData) {
        
        if (!ticketData.subject || !ticketData.message || !ticketData.userId) {
            throw new Error("Missing required fields");
        }

        if (ticketData.subject.trim().length < 5) {
            throw new Error("Subject must be at least 5 characters long");
        }

        if (ticketData.message.trim().length < 10) {
            throw new Error("Message must be at least 10 characters long");
        }

        const ticketToCreate = {
            userId: ticketData.userId,
            subject: ticketData.subject.trim(),
            message: ticketData.message.trim(),
            category: ticketData.category || "general"
        };

        const createdTicket = await TicketDataAccess.createTicket(ticketToCreate);
        
        return {
            id: createdTicket.id,
            subject: createdTicket.subject,
            message: createdTicket.message,
            category: this.getCategoryLabel(createdTicket.category),
            status: createdTicket.status,
            createdAt: createdTicket.createdAt,
            updatedAt: createdTicket.updatedAt
        };
    },

    getCategoryLabel(categoryValue) {
        const categoryLabels = {
            "general": "Consulta General",
            "technical": "Problema Técnico",
            "billing": "Facturación",
            "account": "Cuenta de Usuario",
            "walker": "Paseadores",
            "service": "Servicios de Paseo"
        };

        return categoryLabels[categoryValue] || categoryValue;
    }
};