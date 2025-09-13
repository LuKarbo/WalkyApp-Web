// WalkerAPI.js
export const WalkerAPI = {
    // Datos simulados para settings de walkers
    walkerSettings: {
        1: {
            location: "Buenos Aires, Palermo",
            pricePerPet: 15000,
            hasGPSTracker: true,
            hasDiscount: false,
            discountPercentage: 0,
            updatedAt: '2025-01-15T10:30:00Z'
        },
        2: {
            location: "Córdoba, Nueva Córdoba",
            pricePerPet: 12000,
            hasGPSTracker: false,
            hasDiscount: true,
            discountPercentage: 10,
            updatedAt: '2025-01-10T15:45:00Z'
        },
        3: {
            location: "Rosario, Centro",
            pricePerPet: 13500,
            hasGPSTracker: false,
            hasDiscount: false,
            discountPercentage: 0,
            updatedAt: '2025-01-12T09:20:00Z'
        },
        4: {
            location: "Mendoza, Ciudad",
            pricePerPet: 14000,
            hasGPSTracker: true,
            hasDiscount: true,
            discountPercentage: 15,
            updatedAt: '2025-01-08T16:30:00Z'
        },
        5: {
            location: "Buenos Aires, Belgrano",
            pricePerPet: 16000,
            hasGPSTracker: true,
            hasDiscount: false,
            discountPercentage: 0,
            updatedAt: '2025-01-14T11:15:00Z'
        }
    },

    async getAllWalkers() {
        // Se Simula la llamada a la API
        return [
            {
                id: 1,
                name: "Sarah Johnson",
                rating: 4.9,
                experience: "3 years",
                specialties: "Training, Senior Dogs",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
                location: "Buenos Aires",
                verified: true
            },
            {
                id: 2,
                name: "Mike Wilson",
                rating: 4.8,
                experience: "5 years",
                specialties: "Puppies, Group Walks",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
                location: "Córdoba",
                verified: true
            },
            {
                id: 3,
                name: "Emma Davis",
                rating: 4.7,
                experience: "2 years",
                specialties: "Behavioral Training",
                image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
                location: "Rosario",
                verified: false
            },
            {
                id: 4,
                name: "John Smith",
                rating: 4.9,
                experience: "4 years",
                specialties: "Special Needs Dogs",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
                location: "Mendoza",
                verified: true
            },
            {
                id: 5,
                name: "Lisa Rodriguez",
                rating: 4.8,
                experience: "6 years",
                specialties: "Large Breeds, Exercise",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
                location: "Buenos Aires",
                verified: true
            }
        ];
    },

    async getWalkerById(id) {
        // Se Simula la llamada a la API
        const walkers = await this.getAllWalkers();
        return walkers.find(walker => walker.id === parseInt(id));
    },

    async getWalkerSettings(walkerId) {
        
        const walkerIdInt = parseInt(walkerId);
        const settings = this.walkerSettings[walkerIdInt];
        
        if (!settings) {
            // Retornar configuración por defecto si no existe
            return {
                location: "",
                pricePerPet: 15000,
                hasGPSTracker: false,
                hasDiscount: false,
                discountPercentage: 0,
                updatedAt: new Date().toISOString()
            };
        }
        
        return settings;
    },

    async updateWalkerSettings(walkerId, settings) {
        
        const walkerIdInt = parseInt(walkerId);
        const currentSettings = this.walkerSettings[walkerIdInt] || {
            location: "",
            pricePerPet: 15000,
            hasGPSTracker: false,
            hasDiscount: false,
            discountPercentage: 0
        };

        this.walkerSettings[walkerIdInt] = {
            ...currentSettings,
            ...settings,
            updatedAt: new Date().toISOString()
        };
        
        // Log
        console.log(`Walker ${walkerId} settings updated:`, this.walkerSettings[walkerIdInt]);
        
        return this.walkerSettings[walkerIdInt];
    },

    async getWalkerEarningsSettings(walkerId) {
        
        const settings = await this.getWalkerSettings(walkerId);
        
        return {
            pricePerPet: settings.pricePerPet,
            hasDiscount: settings.hasDiscount,
            discountPercentage: settings.discountPercentage,
            effectivePrice: settings.hasDiscount ? 
                settings.pricePerPet * (1 - settings.discountPercentage / 100) : 
                settings.pricePerPet
        };
    },

    async updateWalkerLocation(walkerId, location) {
        return await this.updateWalkerSettings(walkerId, { location });
    },

    async updateWalkerPricing(walkerId, pricingData) {
        const { pricePerPet, hasDiscount, discountPercentage } = pricingData;
        
        const updatedSettings = {
            pricePerPet,
            hasDiscount,
            discountPercentage: hasDiscount ? discountPercentage : 0
        };
        
        return await this.updateWalkerSettings(walkerId, updatedSettings);
    },
};