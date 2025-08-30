export const ReviewsAPI = {
    async getAllReviews() {
        return [
            {
                id: "R001",
                userId: 1,
                walkerId: 1,
                walkerName: "Sarah Johnson",
                walkerImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
                walkId: "W001",
                rating: 5,
                content: "Excelente servicio! Sarah cuidó muy bien a Max, regresó súper feliz y cansado. Definitivamente la recomiendo para futuros paseos.",
                date: "2024-01-20T15:30:00",
                petName: "Max"
            },
            {
                id: "R002",
                userId: 1,
                walkerId: 2,
                walkerName: "Mike Wilson",
                walkerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                walkId: "W002",
                rating: 4,
                content: "Muy buen paseador, puntual y responsable. A Bella le gustó mucho el paseo por el parque. Solo le faltó un poco más de tiempo de juego.",
                date: "2024-01-19T16:45:00",
                petName: "Bella"
            },
            {
                id: "R003",
                userId: 2,
                walkerId: 3,
                walkerName: "Emma Davis",
                walkerImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
                walkId: "W003",
                rating: 5,
                content: "Emma es fantástica! Se nota que realmente ama a los animales. Charlie regresó muy feliz y bien ejercitado. Las fotos que envió durante el paseo fueron un detalle genial.",
                date: "2024-01-18T14:20:00",
                petName: "Charlie"
            },
            {
                id: "R004",
                userId: 3,
                walkerId: 1,
                walkerName: "Sarah Johnson",
                walkerImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
                walkId: "W004",
                rating: 3,
                content: "El servicio fue bueno pero esperaba un poco más. El paseo fue corto y no recibí muchas actualizaciones durante el tiempo que estuvo con Rocky.",
                date: "2024-01-17T17:10:00",
                petName: "Rocky"
            },
            {
                id: "R005",
                userId: 2,
                walkerId: 4,
                walkerName: "John Smith",
                walkerImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
                walkId: "W005",
                rating: 5,
                content: "John es increíble! Muy profesional y cariñoso con Luna. El reporte detallado que me envió al final del paseo fue muy completo. Definitivamente lo contrataré de nuevo.",
                date: "2024-01-16T13:55:00",
                petName: "Luna"
            },
            {
                id: "R006",
                userId: 1,
                walkerId: 3,
                walkerName: "Emma Davis",
                walkerImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
                walkId: "W006",
                rating: 4,
                content: "Segunda vez que contraté a Emma y como siempre, excelente trabajo. Max la adora y siempre regresa feliz. Solo me gustaría que los paseos fueran un poco más largos.",
                date: "2024-01-15T11:30:00",
                petName: "Max"
            },
            {
                id: "R007",
                userId: 3,
                walkerId: 2,
                walkerName: "Mike Wilson",
                walkerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                walkId: "W007",
                rating: 5,
                content: "Mike superó todas mis expectativas. Rocky puede ser difícil con extraños, pero Mike logró conectar con él inmediatamente. Excelente comunicación durante todo el proceso.",
                date: "2024-01-14T09:15:00",
                petName: "Rocky"
            },
            {
                id: "R008",
                userId: 2,
                walkerId: 1,
                walkerName: "Sarah Johnson",
                walkerImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
                walkId: "W008",
                rating: 4,
                content: "Sarah es muy confiable y puntual. Luna disfrutó mucho el paseo. Me gustó que me enviara fotos durante el recorrido. Una experiencia muy positiva en general.",
                date: "2024-01-13T14:45:00",
                petName: "Luna"
            }
        ];
    },

    async getReviewById(id) {
        const reviews = await this.getAllReviews();
        return reviews.find(review => review.id === id);
    },

    async getReviewsByUser(userId) {
        const reviews = await this.getAllReviews();
        return reviews.filter(review => review.userId === parseInt(userId));
    },

    async updateReview(id, reviewData) {
        const review = await this.getReviewById(id);
        if (!review) {
            throw new Error("Review not found");
        }
        
        const updatedReview = {
            ...review,
            ...reviewData,
            updatedAt: new Date().toISOString()
        };
        
        return updatedReview;
    },
};