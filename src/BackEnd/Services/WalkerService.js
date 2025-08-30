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
    }
};