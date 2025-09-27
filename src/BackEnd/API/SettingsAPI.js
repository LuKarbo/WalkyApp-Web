export const SettingsAPI = {
    
    userSettings: {
        1: {
            email: 'juan.perez@example.com',
            notification_walk_status: true,
            notification_announcements: true,
            notification_subscription: false,
            notification_messages: true,
            notification_system_alerts: true,
            updated_at: '2025-01-15T10:30:00Z'
        },
        2: {
            email: 'maria.garcia@example.com',
            notification_walk_status: true,
            notification_announcements: false,
            notification_subscription: true,
            notification_messages: true,
            notification_system_alerts: false,
            updated_at: '2025-01-10T15:45:00Z'
        },
        3: {
            email: 'carlos.lopez@example.com',
            notification_walk_status: false,
            notification_announcements: true,
            notification_subscription: true,
            notification_messages: false,
            notification_system_alerts: true,
            updated_at: '2025-01-12T09:20:00Z'
        }
    },

    userSubscriptions: {
        1: {
            plan: 'silver',
            start_date: '2024-12-01T00:00:00Z',
            expiry_date: '2025-01-01T00:00:00Z',
            is_active: true
        },
        2: {
            plan: 'bronze',
            start_date: '2024-11-15T00:00:00Z',
            expiry_date: '2025-02-15T00:00:00Z',
            is_active: true
        },
        3: {
            plan: 'free',
            start_date: null,
            expiry_date: null,
            is_active: true
        }
    },

    subscriptionPlans: [
        {
            id: 1,
            plan_id: 'free',
            name: 'Free Plan',
            price: 0,
            duration: 'forever',
            category: 'basic',
            description: 'Perfecto para comenzar y probar nuestros servicios básicos',
            max_walks: 2,
            features: [
                'Hasta 2 paseos por mes',
                'Paseadores básicos',
                'Soporte por email',
                'Notificaciones básicas'
            ],
            support_level: 'email',
            cancellation_policy: 'none',
            discount_percentage: 0,
            is_active: true,
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z'
        },
        {
            id: 2,
            plan_id: 'bronze',
            name: 'Bronze',
            price: 9.99,
            duration: 'monthly',
            category: 'standard',
            description: 'Ideal para mascotas que necesitan paseos regulares con seguimiento',
            max_walks: 8,
            features: [
                'Hasta 8 paseos por mes',
                'GPS en tiempo real',
                'Fotos durante el paseo',
                'Paseadores verificados',
                'Soporte prioritario',
                'Reportes de actividad'
            ],
            support_level: 'priority',
            cancellation_policy: 'standard',
            discount_percentage: 0,
            is_active: true,
            created_at: '2024-06-01T00:00:00Z',
            updated_at: '2024-06-01T00:00:00Z'
        },
        {
            id: 3,
            plan_id: 'silver',
            name: 'Silver',
            price: 19.99,
            duration: 'monthly',
            category: 'premium',
            description: 'La opción más popular con acceso premium y beneficios exclusivos',
            max_walks: 15,
            features: [
                'Hasta 15 paseos por mes',
                'Acceso a paseadores premium',
                'GPS en tiempo real',
                'Fotos y videos del paseo',
                'Cancelación gratuita 24h antes',
                'Soporte 24/7',
                'Reportes detallados',
                '10% descuento en servicios extra'
            ],
            support_level: '24/7',
            cancellation_policy: 'flexible',
            discount_percentage: 10,
            is_active: true,
            created_at: '2024-06-01T00:00:00Z',
            updated_at: '2024-06-01T00:00:00Z'
        },
        {
            id: 4,
            plan_id: 'gold',
            name: 'Gold',
            price: 39.99,
            duration: 'monthly',
            category: 'vip',
            description: 'El plan más completo para el máximo cuidado de tu mascota',
            max_walks: -1,
            features: [
                'Paseos ilimitados',
                'Acceso VIP a mejores paseadores',
                'GPS premium con historial completo',
                'Videos HD del paseo',
                'Cancelación gratuita sin restricciones',
                'Soporte dedicado 24/7',
                'Reportes veterinarios mensuales',
                '20% descuento en servicios extra',
                'Servicio de emergencia',
                'Paseos nocturnos disponibles'
            ],
            support_level: 'dedicated',
            cancellation_policy: 'anytime',
            discount_percentage: 20,
            is_active: true,
            created_at: '2024-06-01T00:00:00Z',
            updated_at: '2024-06-01T00:00:00Z'
        },
        {
            id: 5,
            plan_id: 'platinum',
            name: 'Platinum',
            price: 59.99,
            duration: 'monthly',
            category: 'exclusive',
            description: 'El plan más exclusivo con servicios personalizados y paseador dedicado',
            max_walks: -1,
            features: [
                'Paseos premium ilimitados',
                'Paseador personal dedicado',
                'Transmisión en vivo durante paseos',
                'Consultas veterinarias incluidas',
                'Descuentos en servicios de grooming',
                'Respuesta prioritaria en emergencias',
                'Horarios de paseo personalizados',
                'Reportes de salud mensuales detallados',
                '25% descuento en todos los extras',
                'Servicio de taxi para mascotas'
            ],
            support_level: 'dedicated',
            cancellation_policy: 'anytime',
            discount_percentage: 25,
            is_active: false,
            created_at: '2024-09-01T00:00:00Z',
            updated_at: '2024-09-01T00:00:00Z'
        }
    ],

    async getUserSettings(userId) {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const userIdInt = parseInt(userId);
        const settings = this.userSettings[userIdInt];
        
        if (!settings) {
            return {
                email: '',
                notification_walk_status: true,
                notification_announcements: true,
                notification_subscription: true,
                notification_messages: true,
                notification_system_alerts: true,
                updated_at: new Date().toISOString()
            };
        }
        
        return settings;
    },

    async updateUserSettings(userId, settings) {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const userIdInt = parseInt(userId);
        const currentSettings = this.userSettings[userIdInt] || {};

        const updatedSettings = {
            ...currentSettings,
            updated_at: new Date().toISOString()
        };

        if (settings.email !== undefined) {
            updatedSettings.email = settings.email;
        }

        if (settings.notifications) {
            if (settings.notifications.walkStatus !== undefined) {
                updatedSettings.notification_walk_status = settings.notifications.walkStatus;
            }
            if (settings.notifications.announcements !== undefined) {
                updatedSettings.notification_announcements = settings.notifications.announcements;
            }
            if (settings.notifications.subscription !== undefined) {
                updatedSettings.notification_subscription = settings.notifications.subscription;
            }
            if (settings.notifications.messages !== undefined) {
                updatedSettings.notification_messages = settings.notifications.messages;
            }
            if (settings.notifications.systemAlerts !== undefined) {
                updatedSettings.notification_system_alerts = settings.notifications.systemAlerts;
            }
        }
        
        this.userSettings[userIdInt] = updatedSettings;
        return updatedSettings;
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
            updated_at: new Date().toISOString()
        };
        
        return this.userSubscriptions[userIdInt];
    },

    async getSubscriptionPlans() {
        await new Promise(resolve => setTimeout(resolve, 150));
        return this.subscriptionPlans.filter(plan => plan.is_active);
    },

    async getAllSubscriptionPlans() {
        await new Promise(resolve => setTimeout(resolve, 150));
        return [...this.subscriptionPlans];
    },

    async getActiveSubscriptionPlans() {
        await new Promise(resolve => setTimeout(resolve, 150));
        return this.subscriptionPlans.filter(plan => plan.is_active);
    },

    async getSubscriptionPlanById(planId) {
        await new Promise(resolve => setTimeout(resolve, 100));
        return this.subscriptionPlans.find(plan => plan.plan_id === planId || plan.id === planId) || null;
    },

    async createSubscriptionPlan(planData) {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const newId = Math.max(...this.subscriptionPlans.map(p => p.id)) + 1;
        
        const newPlan = {
            id: newId,
            plan_id: planData.plan_id,
            name: planData.name,
            price: planData.price,
            duration: planData.duration || 'monthly',
            category: planData.category || 'standard',
            description: planData.description || '',
            max_walks: planData.max_walks || 0,
            features: typeof planData.features === 'string' ? JSON.parse(planData.features) : planData.features,
            support_level: planData.support_level || 'email',
            cancellation_policy: planData.cancellation_policy || 'none',
            discount_percentage: planData.discount_percentage || 0,
            is_active: planData.is_active || false,
            created_at: planData.created_at || new Date().toISOString(),
            updated_at: planData.updated_at || new Date().toISOString()
        };

        this.subscriptionPlans.push(newPlan);
        return newPlan;
    },

    async updateSubscriptionPlan(planId, planData) {
        await new Promise(resolve => setTimeout(resolve, 400));
        
        const planIndex = this.subscriptionPlans.findIndex(plan => plan.plan_id === planId || plan.id === planId);
        
        if (planIndex === -1) {
            throw new Error("Plan no encontrado");
        }

        const updatedPlan = {
            ...this.subscriptionPlans[planIndex],
            ...planData,
            updated_at: new Date().toISOString()
        };

        if (planData.features && typeof planData.features === 'string') {
            updatedPlan.features = JSON.parse(planData.features);
        }

        this.subscriptionPlans[planIndex] = updatedPlan;
        return updatedPlan;
    },

    async deleteSubscriptionPlan(planId) {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const planIndex = this.subscriptionPlans.findIndex(plan => plan.plan_id === planId || plan.id === planId);
        
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
        const planCounts = {};
        
        this.subscriptionPlans.forEach(plan => {
            planCounts[plan.plan_id] = 0;
        });

        Object.values(this.userSubscriptions).forEach(subscription => {
            if (planCounts[subscription.plan] !== undefined) {
                planCounts[subscription.plan]++;
            }
        });

        const mostPopularPlan = Object.keys(planCounts).reduce((a, b) => 
            planCounts[a] > planCounts[b] ? a : b
        );

        return {
            totalUsers,
            planDistribution: planCounts,
            mostPopularPlan,
            activeSubscriptions: Object.values(this.userSubscriptions).filter(sub => sub.is_active).length,
            expiredSubscriptions: Object.values(this.userSubscriptions).filter(sub => 
                sub.expiry_date && new Date(sub.expiry_date) < new Date()
            ).length
        };
    },

    async getPlanFeatures(planId) {
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const plan = this.subscriptionPlans.find(p => p.plan_id === planId || p.id === planId);
        if (!plan) return null;

        return {
            maxWalks: plan.max_walks,
            hasGPS: plan.max_walks > 2,
            hasPhotos: plan.max_walks > 2,
            hasVideos: plan.max_walks > 8,
            hasHDVideos: plan.max_walks === -1,
            hasPremiumWalkers: plan.max_walks > 8,
            hasVIPWalkers: plan.max_walks === -1,
            hasPersonalWalker: plan.plan_id === 'platinum',
            supportLevel: plan.support_level,
            cancellationPolicy: plan.cancellation_policy,
            discountPercentage: plan.discount_percentage,
            hasEmergencyService: plan.max_walks === -1,
            hasNightWalks: plan.max_walks === -1,
            hasVetReports: plan.max_walks === -1,
            hasLiveStreaming: plan.plan_id === 'platinum',
            hasVetConsultations: plan.plan_id === 'platinum'
        };
    },

    async validatePlanTransition(fromPlanId, toPlanId) {
        await new Promise(resolve => setTimeout(resolve, 150));
        
        const fromPlan = this.subscriptionPlans.find(p => p.plan_id === fromPlanId);
        const toPlan = this.subscriptionPlans.find(p => p.plan_id === toPlanId);
        
        if (!toPlan) {
            throw new Error("Plan de destino no válido");
        }

        const planHierarchy = { 
            free: 0, 
            bronze: 1, 
            silver: 2, 
            gold: 3, 
            platinum: 4 
        };

        const isUpgrade = planHierarchy[toPlanId] > planHierarchy[fromPlanId];
        const isDowngrade = planHierarchy[toPlanId] < planHierarchy[fromPlanId];

        return {
            isValid: true,
            isUpgrade,
            isDowngrade,
            requiresPayment: isUpgrade,
            refundAmount: isDowngrade ? (fromPlan?.price || 0) - (toPlan?.price || 0) : 0,
            message: isUpgrade ? 
                'Upgrade disponible - se requiere pago adicional' :
                isDowngrade ? 
                'Downgrade disponible - se aplicará reembolso prorrateado' :
                'Cambio de plan sin costo adicional'
        };
    }
};