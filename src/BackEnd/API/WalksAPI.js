export const WalksAPI = {
    async getAllWalks() {
        //// Se Simula la llamada a la API

        return [
            {
                id: "W001",
                dogName: "Max",
                walkerId: 1,
                ownerId: 3,
                walkerName: "Sarah Johnson",
                startTime: "2024-01-20T10:00:00",
                endTime: "2024-01-20T11:00:00",
                status: "Active",
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
                status: "Scheduled",
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
                status: "Completed",
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
                status: "Cancelled",
                duration: null,
                distance: null,
                notes: "Owner cancelled due to weather"
            },
            {
                id: "W005",
                dogName: "ASDASD",
                walkerId: 2,
                ownerId: 3,
                walkerName: "Mike Wilson",
                startTime: "2024-01-20T11:30:00",
                endTime: null,
                status: "Waiting",
                duration: null,
                distance: null,
                notes: null
            }
        ];
    },

    async getWalkById(id) {
        //// Se Simula la llamada a la API

        const walks = await this.getAllWalks();
        return walks.find(walk => walk.id === id);
    },

    async getWalksByStatus(status) {
        //// Se Simula la llamada a la API

        const walks = await this.getAllWalks();
        return walks.filter(walk => walk.status.toLowerCase() === status.toLowerCase());
    },

    async getWalksByWalkerId(walkerId) {
        //// Se Simula la llamada a la API

        const walks = await this.getAllWalks();
        return walks.filter(walk => walk.walkerId === parseInt(walkerId));
    },

    async getWalkByOwner(id) {
        //// Se Simula la llamada a la API

        const walks = await this.getAllWalks();
        return walks.filter(walk => walk.ownerId === id);
    },
};