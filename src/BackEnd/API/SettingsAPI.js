export const SettingsAPI = {
    
    userSettings: {
        1: {
            email: 'juan.perez@example.com',
            notifications: {
                walkStatus: true,
                announcements: true,
                subscription: false,
                messages: true,
                systemAlerts: true
            },
            updatedAt: '2025-01-15T10:30:00Z'
        },
        2: {
            email: 'maria.garcia@example.com',
            notifications: {
                walkStatus: true,
                announcements: false,
                subscription: true,
                messages: true,
                systemAlerts: false
            },
            updatedAt: '2025-01-10T15:45:00Z'
        },
        3: {
            email: 'carlos.lopez@example.com',
            notifications: {
                walkStatus: false,
                announcements: true,
                subscription: true,
                messages: false,
                systemAlerts: true
            },
            updatedAt: '2025-01-12T09:20:00Z'
        }
    },

    userSubscriptions: {
        1: {
            plan: 'silver',
            startDate: '2024-12-01T00:00:00Z',
            expiryDate: '2025-01-01T00:00:00Z',
            isActive: true
        },
        2: {
            plan: 'bronze',
            startDate: '2024-11-15T00:00:00Z',
            expiryDate: '2025-02-15T00:00:00Z',
            isActive: true
        },
        3: {
            plan: 'free',
            startDate: null,
            expiryDate: null,
            isActive: true
        }
    },

    subscriptionPlans: [
        {
            id: 'free',
            name: 'Free Plan',
            price: 0,
            duration: 'forever',
            category: 'basic',
            features: [
                'Up to 2 walks per month',
                'Basic walkers',
                'Email support',
                'Basic notifications'
            ],
            description: 'Perfecto para comenzar y probar nuestros servicios básicos',
            maxWalks: 2,
            hasGPS: false,
            hasPhotos: false,
            hasPremiumWalkers: false,
            supportLevel: 'email',
            cancellationPolicy: 'none',
            isActive: true,
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z'
        },
        {
            id: 'bronze',
            name: 'Bronze',
            price: 9.99,
            duration: 'monthly',
            category: 'standard',
            features: [
                'Up to 8 walks per month',
                'Real-time GPS tracking',
                'Walk photos',
                'Verified walkers',
                'Priority support',
                'Activity reports'
            ],
            description: 'Ideal para mascotas que necesitan paseos regulares con seguimiento',
            maxWalks: 8,
            hasGPS: true,
            hasPhotos: true,
            hasPremiumWalkers: false,
            supportLevel: 'priority',
            cancellationPolicy: 'standard',
            isActive: true,
            createdAt: '2024-06-01T00:00:00Z',
            updatedAt: '2024-06-01T00:00:00Z'
        },
        {
            id: 'silver',
            name: 'Silver',
            price: 19.99,
            duration: 'monthly',
            category: 'premium',
            features: [
                'Up to 15 walks per month',
                'Premium walkers access',
                'Real-time GPS tracking',
                'Photos and videos',
                'Free cancellation 24h',
                '24/7 support',
                'Detailed reports',
                '10% discount on extras'
            ],
            description: 'La opción más popular con acceso premium y beneficios exclusivos',
            maxWalks: 15,
            hasGPS: true,
            hasPhotos: true,
            hasVideos: true,
            hasPremiumWalkers: true,
            supportLevel: '24/7',
            cancellationPolicy: 'flexible',
            discountPercentage: 10,
            isActive: true,
            createdAt: '2024-06-01T00:00:00Z',
            updatedAt: '2024-06-01T00:00:00Z'
        },
        {
            id: 'gold',
            name: 'Gold',
            price: 39.99,
            duration: 'monthly',
            category: 'vip',
            features: [
                'Unlimited walks',
                'VIP walker access',
                'Premium GPS with history',
                'HD videos',
                'Free cancellation anytime',
                'Dedicated 24/7 support',
                'Monthly vet reports',
                '20% discount on extras',
                'Emergency service',
                'Night walks available'
            ],
            description: 'El plan más completo para el máximo cuidado de tu mascota',
            maxWalks: -1, 
            hasGPS: true,
            hasPhotos: true,
            hasVideos: true,
            hasHDVideos: true,
            hasPremiumWalkers: true,
            hasVIPWalkers: true,
            supportLevel: 'dedicated',
            cancellationPolicy: 'anytime',
            discountPercentage: 20,
            hasEmergencyService: true,
            hasNightWalks: true,
            hasVetReports: true,
            isActive: true,
            createdAt: '2024-06-01T00:00:00Z',
            updatedAt: '2024-06-01T00:00:00Z'
        },
        {
            id: 'platinum',
            name: 'Platinum',
            price: 59.99,
            duration: 'monthly',
            category: 'exclusive',
            features: [
                'Unlimited premium walks',
                'Personal dedicated walker',
                'Live video streaming',
                'Veterinary consultations included',
                'Pet grooming discounts',
                'Priority emergency response',
                'Custom walk schedules',
                'Monthly health reports'
            ],
            description: 'El plan más exclusivo con servicios personalizados',
            maxWalks: -1,
            hasGPS: true,
            hasPhotos: true,
            hasVideos: true,
            hasHDVideos: true,
            hasPremiumWalkers: true,
            hasVIPWalkers: true,
            hasPersonalWalker: true,
            supportLevel: 'dedicated',
            cancellationPolicy: 'anytime',
            discountPercentage: 25,
            hasEmergencyService: true,
            hasNightWalks: true,
            hasVetReports: true,
            hasLiveStreaming: true,
            hasVetConsultations: true,
            isActive: false,
            createdAt: '2024-09-01T00:00:00Z',
            updatedAt: '2024-09-01T00:00:00Z'
        }
    ],

    async getUserSettings(userId) {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const userIdInt = parseInt(userId);
        const settings = this.userSettings[userIdInt];
        
        if (!settings) {
            return {
                email: '',
                notifications: {
                    walkStatus: true,
                    announcements: true,
                    subscription: true,
                    messages: true,
                    systemAlerts: true
                },
                updatedAt: new Date().toISOString()
            };
        }
        
        return settings;
    },

    async updateUserSettings(userId, settings) {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const userIdInt = parseInt(userId);
        const currentSettings = this.userSettings[userIdInt] || {};

        this.userSettings[userIdInt] = {
            ...currentSettings,
            ...settings,
            updatedAt: new Date().toISOString()
        };
        
        return this.userSettings[userIdInt];
    },

    async getUserSubscription(userId) {
        await new Promise(resolve => setTimeout(resolve, 200));
        
        const userIdInt = parseInt(userId);
        const subscription = this.userSubscriptions[userIdInt];
        
        return subscription || null;
    },

    async updateSubscription(userId, subscriptionData) {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const userIdInt = parseInt(userId);
        
        this.userSubscriptions[userIdInt] = {
            ...subscriptionData,
            updatedAt: new Date().toISOString()
        };
        
        return this.userSubscriptions[userIdInt];
    },

    async getSubscriptionPlans() {
        await new Promise(resolve => setTimeout(resolve, 150));
        return this.subscriptionPlans.filter(plan => plan.isActive);
    },

    async getAllSubscriptionPlans() {
        await new Promise(resolve => setTimeout(resolve, 150));
        return [...this.subscriptionPlans];
    },

    async getActiveSubscriptionPlans() {
        await new Promise(resolve => setTimeout(resolve, 150));
        return this.subscriptionPlans.filter(plan => plan.isActive);
    },

    async getSubscriptionPlanById(planId) {
        await new Promise(resolve => setTimeout(resolve, 100));
        return this.subscriptionPlans.find(plan => plan.id === planId) || null;
    },

    async createSubscriptionPlan(planData) {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const newPlan = {
            ...planData,
            createdAt: planData.createdAt || new Date().toISOString(),
            updatedAt: planData.updatedAt || new Date().toISOString()
        };

        this.subscriptionPlans.push(newPlan);
        return newPlan;
    },

    async updateSubscriptionPlan(planId, planData) {
        await new Promise(resolve => setTimeout(resolve, 400));
        
        const planIndex = this.subscriptionPlans.findIndex(plan => plan.id === planId);
        
        if (planIndex === -1) {
            throw new Error("Plan no encontrado");
        }

        this.subscriptionPlans[planIndex] = {
            ...this.subscriptionPlans[planIndex],
            ...planData,
            id: planId,
            updatedAt: new Date().toISOString()
        };

        return this.subscriptionPlans[planIndex];
    },

    async deleteSubscriptionPlan(planId) {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const planIndex = this.subscriptionPlans.findIndex(plan => plan.id === planId);
        
        if (planIndex === -1) {
            throw new Error("Plan no encontrado");
        }

        this.subscriptionPlans.splice(planIndex, 1);
        return { message: "Plan eliminado exitosamente" };
    },

    async getUsersWithPlan(planId) {
        await new Promise(resolve => setTimeout(resolve, 200));
        
        const usersWithPlan = [];
        Object.entries(this.userSubscriptions).forEach(([userId, subscription]) => {
            if (subscription.plan === planId) {
                usersWithPlan.push(parseInt(userId));
            }
        });
        
        return usersWithPlan;
    },

    async getSubscriptionStats() {
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const totalUsers = Object.keys(this.userSubscriptions).length;
        const planCounts = this.subscriptionPlans.reduce((acc, plan) => {
            acc[plan.id] = 0;
            return acc;
        }, {});

        return {
            totalUsers,
            planDistribution: planCounts,
            mostPopularPlan: Object.keys(planCounts).reduce((a, b) => 
                planCounts[a] > planCounts[b] ? a : b
            )
        };
    }
};