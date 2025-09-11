import { WalkerDataAccess } from "../DataAccess/WalkerDataAccess.js";

export const WalkerService = {
    async getWalkersForHome() {
        const walkers = await WalkerDataAccess.getAllWalkers();

        const walkersDTO = walkers.map(walker => ({
            id: walker.id,
            name: walker.name,
            rating: walker.rating,
            experience: walker.experience,
            specialties: walker.specialties,
            image: walker.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
            location: walker.location,
            verified: walker.verified
        }));

        const walkerPlaceholder = {
            id: 6,
            isPlaceholder: true,
            title: "¿Eres paseador?",
            subtitle: "¡Únete a nosotros!",
            description: "Esperamos tu gran servicio para completar nuestro equipo",
            image: "https://images.unsplash.com/photo-1560807707-8cc77767d783"
        };

        return [...walkersDTO, walkerPlaceholder];
    },

    async getWalkerProfile(id) {
        const walker = await WalkerDataAccess.getWalkerById(id);
        
        if (!walker) {
            throw new Error("Walker not found");
        }

        // Transformar los datos para el perfil
        const walkerProfileDTO = {
            id: walker.id,
            fullName: walker.name,
            rating: walker.rating,
            experienceYears: walker.experience,
            specialties: walker.specialties.split(', '),
            profileImage: walker.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
            location: walker.location,
            verified: walker.verified
        };

        return walkerProfileDTO;
    },

    async getWalkerSettings(walkerId) {
        if (!walkerId) {
            throw new Error("Walker ID is required");
        }

        const walkerSettings = await WalkerDataAccess.getWalkerSettings(walkerId);
        
        return {
            location: walkerSettings.location || "",
            pricePerPet: walkerSettings.pricePerPet || 0,
            hasGPSTracker: walkerSettings.hasGPSTracker || false,
            hasDiscount: walkerSettings.hasDiscount || false,
            discountPercentage: walkerSettings.discountPercentage || 0
        };
    },

    async updateWalkerSettings(walkerId, settings) {
        if (!walkerId) {
            throw new Error("Walker ID is required");
        }

        if (!settings) {
            throw new Error("Settings data is required");
        }

        if (settings.pricePerPet !== undefined && settings.pricePerPet < 0) {
            throw new Error("Price per pet cannot be negative");
        }

        if (settings.discountPercentage !== undefined && 
            (settings.discountPercentage < 0 || settings.discountPercentage > 100)) {
            throw new Error("Discount percentage must be between 0 and 100");
        }

        if (settings.hasDiscount === false) {
            settings.discountPercentage = 0;
        }

        const updatedSettings = await WalkerDataAccess.updateWalkerSettings(walkerId, settings);
        
        return {
            location: updatedSettings.location,
            pricePerPet: updatedSettings.pricePerPet,
            hasGPSTracker: updatedSettings.hasGPSTracker,
            hasDiscount: updatedSettings.hasDiscount,
            discountPercentage: updatedSettings.discountPercentage,
            updatedAt: updatedSettings.updatedAt
        };
    },

    async updateWalkerLocation(walkerId, location) {
        if (!walkerId) {
            throw new Error("Walker ID is required");
        }

        if (!location || location.trim() === '') {
            throw new Error("Location is required");
        }

        const updatedSettings = await WalkerDataAccess.updateWalkerSettings(walkerId, { 
            location: location.trim() 
        });
        
        return {
            location: updatedSettings.location,
            updatedAt: updatedSettings.updatedAt
        };
    },

    async updateWalkerPricing(walkerId, pricingData) {
        if (!walkerId) {
            throw new Error("Walker ID is required");
        }

        if (!pricingData) {
            throw new Error("Pricing data is required");
        }

        const { pricePerPet, hasDiscount, discountPercentage } = pricingData;

        if (pricePerPet !== undefined && pricePerPet < 0) {
            throw new Error("Price per pet cannot be negative");
        }

        if (discountPercentage !== undefined && 
            (discountPercentage < 0 || discountPercentage > 100)) {
            throw new Error("Discount percentage must be between 0 and 100");
        }

        const settingsToUpdate = {
            pricePerPet,
            hasDiscount,
            discountPercentage: hasDiscount ? discountPercentage : 0
        };

        const updatedSettings = await WalkerDataAccess.updateWalkerSettings(walkerId, settingsToUpdate);
        
        return {
            pricePerPet: updatedSettings.pricePerPet,
            hasDiscount: updatedSettings.hasDiscount,
            discountPercentage: updatedSettings.discountPercentage,
            updatedAt: updatedSettings.updatedAt
        };
    },

    async validateWalkerSettings(settings) {
        const errors = [];

        if (settings.pricePerPet !== undefined && settings.pricePerPet < 0) {
            errors.push("El precio por mascota no puede ser negativo");
        }

        if (settings.discountPercentage !== undefined) {
            if (settings.discountPercentage < 0 || settings.discountPercentage > 100) {
                errors.push("El porcentaje de descuento debe estar entre 0 y 100");
            }
        }

        if (settings.hasDiscount && (!settings.discountPercentage || settings.discountPercentage <= 0)) {
            errors.push("Debe especificar un porcentaje de descuento válido");
        }

        if (settings.location !== undefined && settings.location.trim() === '') {
            errors.push("La ubicación no puede estar vacía");
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    },

    async calculateWalkerEarnings(walkerId, walks) {
        if (!walkerId || !walks) {
            return {
                monthly: 0,
                total: 0,
                completedWalks: 0
            };
        }

        const walkerSettings = await this.getWalkerSettings(walkerId);
        const defaultPrice = walkerSettings.pricePerPet || 15000;

        const completedWalks = walks.filter(walk => walk.status === 'Finalizado');
        
        const monthlyEarnings = completedWalks.reduce((total, walk) => {
            const walkDate = new Date(walk.startTime);
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();
            
            if (walkDate.getMonth() === currentMonth && walkDate.getFullYear() === currentYear) {
                let price = walk.price || defaultPrice;
                
                if (walkerSettings.hasDiscount && walkerSettings.discountPercentage > 0) {
                    price = price * (1 - walkerSettings.discountPercentage / 100);
                }
                
                return total + price;
            }
            return total;
        }, 0);
        
        const totalEarnings = completedWalks.reduce((total, walk) => {
            let price = walk.price || defaultPrice;
            
            if (walkerSettings.hasDiscount && walkerSettings.discountPercentage > 0) {
                price = price * (1 - walkerSettings.discountPercentage / 100);
            }
            
            return total + price;
        }, 0);
        
        return {
            monthly: monthlyEarnings,
            total: totalEarnings,
            completedWalks: completedWalks.length
        };
    }
};