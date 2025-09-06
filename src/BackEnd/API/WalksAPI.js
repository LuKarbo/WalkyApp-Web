export const WalksAPI = {
    async getAllWalks() {
        return [
            {
                id: "W001",
                dogName: "Max",
                walkerId: 1,
                ownerId: 3,
                walkerName: "Sarah Johnson",
                startTime: "2024-01-20T10:00:00",
                endTime: "2024-01-20T11:00:00",
                status: "Activo",
                duration: 60,
                distance: 2.5,
                notes: "Great walk, Max was very energetic"
            },
            {
                id: "W002",
                dogName: "Bella",
                walkerId: 2,
                ownerId: 3,
                walkerName: "Mike Wilson",
                startTime: "2024-01-20T11:30:00",
                endTime: null,
                status: "Agendado",
                duration: null,
                distance: null,
                notes: null
            },
            {
                id: "W003",
                dogName: "Charlie",
                walkerId: 3,
                ownerId: 1,
                walkerName: "Emma Davis",
                startTime: "2024-01-20T14:00:00",
                endTime: "2024-01-20T15:30:00",
                status: "Finalizado",
                duration: 90,
                distance: 3.2,
                notes: "Charlie enjoyed the park visit"
            },
            {
                id: "W004",
                dogName: "Rocky",
                walkerId: 4,
                ownerId: 2,
                walkerName: "John Smith",
                startTime: "2024-01-20T16:00:00",
                endTime: null,
                status: "Rechazado",
                duration: null,
                distance: null,
                notes: "Owner cancelled due to weather"
            },
            {
                id: "W005",
                dogName: "Luna",
                walkerId: 2,
                ownerId: 3,
                walkerName: "Mike Wilson",
                startTime: "2024-01-20T11:30:00",
                endTime: null,
                status: "Solicitado",
                duration: null,
                distance: null,
                notes: null
            },
            {
                id: "W006",
                dogName: "Buddy",
                walkerId: 1,
                ownerId: 2,
                walkerName: "Sarah Johnson",
                startTime: "2024-01-21T09:00:00",
                endTime: null,
                status: "Esperando pago",
                duration: null,
                distance: null,
                notes: "Walker accepted the request"
            },
            {
                id: "W007",
                dogName: "Coco",
                walkerId: 3,
                ownerId: 1,
                walkerName: "Emma Davis",
                startTime: "2024-01-21T15:00:00",
                endTime: null,
                status: "Agendado",
                duration: null,
                distance: null,
                notes: "Payment confirmed, walk scheduled"
            }
        ];
    },

    async getWalkById(id) {
        const walks = await this.getAllWalks();
        return walks.find(walk => walk.id === id);
    },

    async getWalksByStatus(status) {
        const walks = await this.getAllWalks();
        return walks.filter(walk => walk.status.toLowerCase() === status.toLowerCase());
    },

    async getWalksByWalkerId(walkerId) {
        const walks = await this.getAllWalks();
        return walks.filter(walk => walk.walkerId === parseInt(walkerId));
    },

    async getWalkByOwner(id) {
        const walks = await this.getAllWalks();
        return walks.filter(walk => walk.ownerId === id);
    },

    async createWalkRequest(walkRequestData) {
        console.log('Creating walk request:', walkRequestData);
        
        const newId = `WR${String(Date.now()).slice(-6)}`;
        
        const newWalkRequest = {
            id: newId,
            walkerId: walkRequestData.walkerId,
            ownerId: walkRequestData.ownerId,
            petIds: walkRequestData.petIds,
            scheduledDateTime: walkRequestData.scheduledDateTime,
            description: walkRequestData.description || '',
            totalPrice: walkRequestData.totalPrice,
            status: walkRequestData.status || 'Solicitado',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        console.log('Walk request created:', newWalkRequest);
        
        return newWalkRequest;
    },

    async updateWalkStatus(walkId, status) {
        console.log(`Updating walk ${walkId} status to: ${status}`);
        
        const validStatuses = ['Solicitado', 'Esperando pago', 'Agendado', 'Activo', 'Finalizado', 'Rechazado'];
        
        if (!validStatuses.includes(status)) {
            throw new Error(`Invalid status: ${status}. Valid statuses: ${validStatuses.join(', ')}`);
        }
        
        const updatedWalk = {
            id: walkId,
            status: status,
            updatedAt: new Date().toISOString()
        };

        console.log('Walk status updated:', updatedWalk);
        
        return updatedWalk;
    }
};