export const WalkTrackingAPI = {
    async getWalkRoute(tripId) {
        // Simulamos datos de rutas por tripId
        const mockRoutes = {
            "W001": [
                { lat: -34.6037, lng: -58.3816 }, // Buenos Aires centro
                { lat: -34.6047, lng: -58.3826 }, // Plaza San Martín
                { lat: -34.6057, lng: -58.3836 }, // Puerto Madero
            ],
            "W003": [
                { lat: -34.6037, lng: -58.3816 },
                { lat: -34.6020, lng: -58.3800 }, // Recoleta
                { lat: -34.6010, lng: -58.3790 }, // Retiro
                { lat: -34.6000, lng: -58.3780 }, // Palermo
            ]
        };

        // Simulamos delay de red
        await new Promise(resolve => setTimeout(resolve, 300));
        
        return mockRoutes[tripId] || [];
    },

    async saveWalkPoint(pointData) {
        console.log('Guardando punto de seguimiento:', pointData);
        
        // Simulamos guardado
        const savedPoint = {
            id: `POINT${String(Date.now()).slice(-6)}`,
            tripId: pointData.tripId,
            lat: pointData.lat,
            lng: pointData.lng,
            address: pointData.address,
            timestamp: new Date().toISOString(),
            order: pointData.order || 0
        };

        // Simulamos delay de guardado
        await new Promise(resolve => setTimeout(resolve, 200));
        
        console.log('Punto guardado:', savedPoint);
        return savedPoint;
    },

    async getWalkRecords(tripId) {
        // Simulamos datos de registros por tripId
        const mockRecords = {
            "W001": [
                {
                    id: "REC001",
                    tripId: "W001",
                    time: "10:15",
                    timeFull: "2024-01-20T10:15:00",
                    address: "Av. Corrientes 1000, Buenos Aires",
                    lat: -34.6037,
                    lng: -58.3816
                },
                {
                    id: "REC002", 
                    tripId: "W001",
                    time: "10:25",
                    timeFull: "2024-01-20T10:25:00", 
                    address: "Plaza San Martín, Retiro",
                    lat: -34.6047,
                    lng: -58.3826
                }
            ],
            "W003": [
                {
                    id: "REC003",
                    tripId: "W003",
                    time: "14:30",
                    timeFull: "2024-01-20T14:30:00",
                    address: "Recoleta Cemetery, Buenos Aires",
                    lat: -34.6020,
                    lng: -58.3800
                }
            ]
        };

        await new Promise(resolve => setTimeout(resolve, 250));
        return mockRecords[tripId] || [];
    },

    async clearWalkData(tripId) {
        console.log(`Limpiando datos del paseo ${tripId}`);
        
        // Simulamos limpieza
        await new Promise(resolve => setTimeout(resolve, 100));
        
        return { success: true, tripId, clearedAt: new Date().toISOString() };
    }
};