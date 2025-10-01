export const WalkTrackingAPI = {
    async getWalkRoute(tripId) {
        const mockMaps = {
            "1": {
                hasMap: true,
                mapId: 1,
                walkId: 1,
                locations: [
                    {
                        id: 1,
                        lat: -34.575300,
                        lng: -58.414200,
                        elevation: 25.5,
                        address: "Av. del Libertador 1500, Palermo, Buenos Aires",
                        recordedAt: "2024-01-20T10:05:00.000Z"
                    },
                    {
                        id: 2,
                        lat: -34.575800,
                        lng: -58.413900,
                        elevation: 26.0,
                        address: "Av. del Libertador 1650, Palermo, Buenos Aires",
                        recordedAt: "2024-01-20T10:10:00.000Z"
                    },
                    {
                        id: 3,
                        lat: -34.576200,
                        lng: -58.413500,
                        elevation: 26.2,
                        address: "Av. del Libertador 1800, Palermo, Buenos Aires",
                        recordedAt: "2024-01-20T10:15:00.000Z"
                    }
                ]
            },
            "3": {
                hasMap: true,
                mapId: 3,
                walkId: 3,
                locations: [
                    {
                        id: 10,
                        lat: -32.944600,
                        lng: -60.650700,
                        elevation: 28.0,
                        address: "Av. Pellegrini 1000, Rosario, Santa Fe",
                        recordedAt: "2024-01-20T14:00:00.000Z"
                    },
                    {
                        id: 11,
                        lat: -32.945100,
                        lng: -60.650300,
                        elevation: 27.8,
                        address: "Av. Pellegrini 1200, Rosario, Santa Fe",
                        recordedAt: "2024-01-20T14:05:00.000Z"
                    }
                ]
            },
            "2": {
                hasMap: false,
                mapId: null,
                walkId: 2,
                locations: []
            }
        };
        
        return mockMaps[tripId] || {
            hasMap: false,
            mapId: null,
            walkId: tripId,
            locations: []
        };
    },

    async saveNewLocation(walkId, lat, lng) {
        console.log('Guardando nueva ubicación:', { walkId, lat, lng });
        
        const savedLocation = {
            id: Date.now(),
            lat: lat,
            lng: lng,
            elevation: 0, 
            address: 'Dirección calculada por el backend',
            recordedAt: new Date().toISOString()
        };
        
        console.log('Ubicación guardada:', savedLocation);
        return savedLocation;
    },

    async getWalkRecords(tripId) {
        const mapData = await this.getWalkRoute(tripId);
        
        if (!mapData.hasMap || mapData.locations.length === 0) {
            return [];
        }

        return mapData.locations.map(location => ({
            id: location.id,
            time: new Date(location.recordedAt).toLocaleTimeString('es-AR', {
                hour: '2-digit',
                minute: '2-digit'
            }),
            timeFull: location.recordedAt,
            address: location.address,
            lat: location.lat,
            lng: location.lng
        }));
    }
};