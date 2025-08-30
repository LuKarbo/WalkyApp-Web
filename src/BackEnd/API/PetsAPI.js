export const PetsAPI = {
    async getAllPets() {
        return [
            {
                id: "P001",
                name: "Max",
                ownerId: 1,
                image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=300&fit=crop&crop=face",
                weight: 25.5,
                age: 3,
                description: "Un golden retriever muy amigable y juguetón. Le encanta correr en el parque."
            },
            {
                id: "P002",
                name: "Luna",
                ownerId: 2,
                image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=300&fit=crop&crop=face",
                weight: 18.2,
                age: 2,
                description: "Una border collie muy inteligente y activa. Perfecta para paseos largos."
            },
            {
                id: "P003",
                name: "Bella",
                ownerId: 3,
                image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=300&fit=crop&crop=face",
                weight: 12.8,
                age: 5,
                description: "Una beagle dulce y tranquila. Le gusta explorar nuevos lugares."
            },
            {
                id: "P004",
                name: "Rocky",
                ownerId: 3,
                image: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=300&h=300&fit=crop&crop=face",
                weight: 30.0,
                age: 4,
                description: "Un pastor alemán leal y protector. Excelente compañero para actividades al aire libre."
            }
        ];
    },

    async getPetById(id) {
        const pets = await this.getAllPets();
        return pets.find(pet => pet.id === id);
    },

    async getPetsByOwner(ownerId) {
        const pets = await this.getAllPets();
        return pets.filter(pet => pet.ownerId === parseInt(ownerId));
    },

    async createPet(petData) {
        
        const pets = await this.getAllPets();
        const newPet = {
            id: `P${String(pets.length + 1).padStart(3, '0')}`,
            ...petData,
            ownerId: parseInt(petData.ownerId)
        };
        
        return newPet;
    },

    async updatePet(id, petData) {
        
        const pet = await this.getPetById(id);
        if (!pet) {
            throw new Error("Pet not found");
        }
        
        const updatedPet = {
            ...pet,
            ...petData
        };
        
        return updatedPet;
    },

    async deletePet(id) {
        
        const pet = await this.getPetById(id);
        if (!pet) {
            throw new Error("Pet not found");
        }
        
        return { success: true, message: "Pet deleted successfully" };
    }
};