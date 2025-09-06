import { WalksDataAccess } from "../DataAccess/WalksDataAccess.js";

export const WalksService = {
    async getWalksForHome() {
        const walks = await WalksDataAccess.getAllWalks();

        const walksDTO = walks.map(walk => ({
            id: walk.id,
            dogName: walk.dogName,
            walker: walk.walkerName,
            startTime: walk.startTime,
            status: walk.status
        }));

        const relevantStatuses = ['Activo', 'Agendado', 'Finalizado', 'Esperando pago'];
        return walksDTO.filter(walk => relevantStatuses.includes(walk.status));
    },

    async getWalkDetails(id) {
        const walk = await WalksDataAccess.getWalkById(id);
        
        if (!walk) {
            throw new Error("Walk not found");
        }

        const walkDetailsDTO = {
            id: walk.id,
            dogName: walk.dogName,
            walker: {
                id: walk.walkerId,
                name: walk.walkerName
            },
            schedule: {
                startTime: walk.startTime,
                endTime: walk.endTime,
                duration: walk.duration
            },
            status: walk.status,
            metrics: {
                distance: walk.distance,
                duration: walk.duration
            },
            notes: walk.notes || "No notes available"
        };

        return walkDetailsDTO;
    },

    async getActiveWalks() {
        const activeWalks = await WalksDataAccess.getWalksByStatus('Activo');
        
        return activeWalks.map(walk => ({
            id: walk.id,
            dogName: walk.dogName,
            walker: walk.walkerName,
            startTime: walk.startTime,
            status: walk.status,
            duration: walk.duration || 0
        }));
    },

    async getScheduledWalks() {
        const scheduledWalks = await WalksDataAccess.getWalksByStatus('Agendado');
        
        return scheduledWalks.map(walk => ({
            id: walk.id,
            dogName: walk.dogName,
            walker: walk.walkerName,
            scheduledTime: walk.startTime,
            status: walk.status
        }));
    },

    async getWalksAwaitingPayment() {
        const walksAwaitingPayment = await WalksDataAccess.getWalksByStatus('Esperando pago');
        
        return walksAwaitingPayment.map(walk => ({
            id: walk.id,
            dogName: walk.dogName,
            walker: walk.walkerName,
            scheduledTime: walk.startTime,
            status: walk.status
        }));
    },

    async getRequestedWalks() {
        const requestedWalks = await WalksDataAccess.getWalksByStatus('Solicitado');
        
        return requestedWalks.map(walk => ({
            id: walk.id,
            dogName: walk.dogName,
            walker: walk.walkerName,
            requestedTime: walk.startTime,
            status: walk.status
        }));
    },

    async getWalksByWalker(walkerId) {
        if (!walkerId) {
            throw new Error("Walker ID is required");
        }

        const walks = await WalksDataAccess.getWalksByWalkerId(walkerId);
        
        return walks.map(walk => ({
            id: walk.id,
            dogName: walk.dogName,
            startTime: walk.startTime,
            endTime: walk.endTime,
            status: walk.status,
            duration: walk.duration,
            distance: walk.distance,
            notes: walk.notes
        }));
    },

    async getWalksByOwner(ownerId) {
        if (!ownerId) {
            throw new Error("Owner ID is required");
        }

        const walks = await WalksDataAccess.getWalkByOwner(ownerId);

        if (!walks) {
            return [];
        }

        return Array.isArray(walks) ? walks.map(walk => ({
            id: walk.id,
            dogName: walk.dogName,
            walker: walk.walkerName,
            startTime: walk.startTime,
            endTime: walk.endTime,
            status: walk.status,
            duration: walk.duration,
            distance: walk.distance,
            notes: walk.notes
        })) : [{
            id: walks.id,
            dogName: walks.dogName,
            walker: walks.walkerName,
            startTime: walks.startTime,
            endTime: walks.endTime,
            status: walks.status,
            duration: walks.duration,
            distance: walks.distance,
            notes: walks.notes
        }];
    },

    async createWalkRequest(walkRequestData) {
        if (!walkRequestData.walkerId) {
            throw new Error("Walker ID is required");
        }
        if (!walkRequestData.ownerId) {
            throw new Error("Owner ID is required");
        }
        if (!walkRequestData.petIds || walkRequestData.petIds.length === 0) {
            throw new Error("At least one pet must be selected");
        }
        if (!walkRequestData.scheduledDateTime) {
            throw new Error("Scheduled date and time is required");
        }

        walkRequestData.status = 'Solicitado';

        const newWalkRequest = await WalksDataAccess.createWalkRequest(walkRequestData);
        
        return {
            id: newWalkRequest.id,
            walkerId: newWalkRequest.walkerId,
            ownerId: newWalkRequest.ownerId,
            petIds: newWalkRequest.petIds,
            scheduledDateTime: newWalkRequest.scheduledDateTime,
            description: newWalkRequest.description,
            totalPrice: newWalkRequest.totalPrice,
            status: newWalkRequest.status,
            createdAt: newWalkRequest.createdAt
        };
    },

    async updateWalkStatus(walkId, status) {
        if (!walkId) {
            throw new Error("Walk ID is required");
        }
        if (!status) {
            throw new Error("Status is required");
        }

        const validStatuses = ['Solicitado', 'Esperando pago', 'Agendado', 'Activo', 'Finalizado', 'Rechazado'];
        if (!validStatuses.includes(status)) {
            throw new Error("Invalid status. Valid statuses: " + validStatuses.join(', '));
        }

        const updatedWalk = await WalksDataAccess.updateWalkStatus(walkId, status);
        
        return {
            id: updatedWalk.id,
            status: updatedWalk.status,
            updatedAt: updatedWalk.updatedAt
        };
    },

    async validateStatusTransition(walkId, newStatus) {
        const walk = await WalksDataAccess.getWalkById(walkId);
        if (!walk) {
            throw new Error("Walk not found");
        }

        const currentStatus = walk.status;
        const validTransitions = {
            'Solicitado': ['Esperando pago', 'Rechazado'],
            'Esperando pago': ['Agendado'],
            'Agendado': ['Activo'],
            'Activo': ['Finalizado'],
            'Finalizado': [], // Estado final
            'Rechazado': [] // Estado final
        };

        if (!validTransitions[currentStatus] || !validTransitions[currentStatus].includes(newStatus)) {
            throw new Error(`Invalid status transition from '${currentStatus}' to '${newStatus}'`);
        }

        return true;
    },

    async changeWalkStatus(walkId, newStatus) {
        await this.validateStatusTransition(walkId, newStatus);
        return await this.updateWalkStatus(walkId, newStatus);
    }
};