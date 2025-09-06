// WalkerAPI.js
export const WalkerAPI = {
    async getAllWalkers() {
        //// Se Simula la llamada a la API

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
        //// Se Simula la llamada a la API

        const walkers = await this.getAllWalkers();
        console.log(id);
        return walkers.find(walker => walker.id === parseInt(id));
    }
};