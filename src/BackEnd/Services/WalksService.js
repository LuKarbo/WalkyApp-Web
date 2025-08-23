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

        // Filtrar solo los más relevantes para el home
        const relevantStatuses = ['Active', 'Scheduled', 'Completed'];
        return walksDTO.filter(walk => relevantStatuses.includes(walk.status));
    },

    async getWalkDetails(id) {
        const walk = await WalksDataAccess.getWalkById(id);
        
        if (!walk) {
            throw new Error("Walk not found");
        }

        // Transformar los datos para vista detallada
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
        const activeWalks = await WalksDataAccess.getWalksByStatus('Active');
        
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
        const scheduledWalks = await WalksDataAccess.getWalksByStatus('Scheduled');
        
        return scheduledWalks.map(walk => ({
            id: walk.id,
            dogName: walk.dogName,
            walker: walk.walkerName,
            scheduledTime: walk.startTime,
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

    // Normalizamos la salida
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
}

};