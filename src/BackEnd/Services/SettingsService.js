import { SettingsDataAccess } from "../DataAccess/SettingsDataAccess.js";

export const SettingsService = {
    async getUserSettings(userId) {
        if (!userId) {
            throw new Error("User ID is required");
        }

        const userSettings = await SettingsDataAccess.getUserSettings(userId);
        
        return {
            email: userSettings.email || '',
            notifications: {
                walkStatus: userSettings.notifications?.walkStatus ?? true,
                announcements: userSettings.notifications?.announcements ?? true,
                subscription: userSettings.notifications?.subscription ?? true,
                messages: userSettings.notifications?.messages ?? true,
                systemAlerts: userSettings.notifications?.systemAlerts ?? true
            }
        };
    },

    async updateUserSettings(userId, settings) {
        if (!userId) {
            throw new Error("User ID is required");
        }

        if (!settings) {
            throw new Error("Settings data is required");
        }

        if (settings.email && !this.isValidEmail(settings.email)) {
            throw new Error("Invalid email format");
        }

        if (settings.notifications) {
            this.validateNotificationSettings(settings.notifications);
        }

        const updatedSettings = await SettingsDataAccess.updateUserSettings(userId, settings);
        
        return {
            email: updatedSettings.email,
            notifications: updatedSettings.notifications,
            updatedAt: updatedSettings.updatedAt
        };
    },

    async getUserSubscription(userId) {
        if (!userId) {
            throw new Error("User ID is required");
        }

        const subscription = await SettingsDataAccess.getUserSubscription(userId);
        
        if (!subscription) {
            return {
                plan: 'free',
                expiryDate: null,
                isActive: true,
                startDate: null
            };
        }

        const isActive = subscription.expiryDate ? 
            new Date(subscription.expiryDate) > new Date() : 
            subscription.isActive;

        return {
            plan: subscription.plan,
            expiryDate: subscription.expiryDate,
            isActive: isActive,
            startDate: subscription.startDate
        };
    },

    async updateSubscription(userId, planId) {
        if (!userId) {
            throw new Error("User ID is required");
        }

        if (!planId) {
            throw new Error("Plan ID is required");
        }

        const availablePlans = await this.getActiveSubscriptionPlans();
        const selectedPlan = availablePlans.find(plan => plan.id === planId);
        
        if (!selectedPlan) {
            throw new Error("Invalid plan selected");
        }

        const currentSubscription = await SettingsDataAccess.getUserSubscription(userId);
        
        if (currentSubscription?.plan === planId) {
            return {
                plan: currentSubscription.plan,
                expiryDate: currentSubscription.expiryDate,
                isActive: currentSubscription.isActive,
                startDate: currentSubscription.startDate
            };
        }

        let expiryDate = null;
        let startDate = new Date();

        if (planId !== 'free') {
            expiryDate = new Date();
            expiryDate.setMonth(expiryDate.getMonth() + 1);
        }

        const subscriptionData = {
            plan: planId,
            expiryDate: expiryDate,
            isActive: true,
            startDate: startDate
        };

        const updatedSubscription = await SettingsDataAccess.updateSubscription(userId, subscriptionData);

        return {
            plan: updatedSubscription.plan,
            expiryDate: updatedSubscription.expiryDate,
            isActive: updatedSubscription.isActive,
            startDate: updatedSubscription.startDate
        };
    },

    async getAllSubscriptionPlans() {
        const plans = await SettingsDataAccess.getAllSubscriptionPlans();
        return plans.sort((a, b) => a.price - b.price);
    },

    async getActiveSubscriptionPlans() {
        const plans = await SettingsDataAccess.getActiveSubscriptionPlans();
        return plans.sort((a, b) => a.price - b.price);
    },

    async getSubscriptionPlanById(planId) {
        if (!planId) {
            throw new Error("Plan ID is required");
        }

        const plan = await SettingsDataAccess.getSubscriptionPlanById(planId);
        
        if (!plan) {
            throw new Error("Plan not found");
        }

        return plan;
    },

    async createSubscriptionPlan(planData) {
        if (!planData.id || !planData.name || planData.price === undefined) {
            throw new Error("ID, nombre y precio son requeridos");
        }

        if (planData.id.length < 3) {
            throw new Error("El ID debe tener al menos 3 caracteres");
        }

        if (planData.name.length < 3) {
            throw new Error("El nombre debe tener al menos 3 caracteres");
        }

        if (planData.price < 0) {
            throw new Error("El precio no puede ser negativo");
        }

        if (!Array.isArray(planData.features) || planData.features.length === 0) {
            throw new Error("Debe incluir al menos una característica");
        }

        const existingPlan = await SettingsDataAccess.getSubscriptionPlanById(planData.id);
        if (existingPlan) {
            throw new Error("Ya existe un plan con este ID");
        }

        if (planData.isActive) {
            const activePlans = await SettingsDataAccess.getActiveSubscriptionPlans();
            const activeCount = activePlans.filter(plan => plan.id !== 'free').length;
            if (activeCount >= 3) {
                throw new Error("Solo se pueden tener máximo 3 planes activos (además del plan gratuito)");
            }
        }

        const newPlan = await SettingsDataAccess.createSubscriptionPlan({
            ...planData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });

        return newPlan;
    },

    async updateSubscriptionPlan(planId, planData) {
        if (!planId) {
            throw new Error("Plan ID is required");
        }

        if (planId === 'free') {
            throw new Error("El plan gratuito no se puede modificar");
        }

        const existingPlan = await SettingsDataAccess.getSubscriptionPlanById(planId);
        if (!existingPlan) {
            throw new Error("Plan no encontrado");
        }

        if (planData.name && planData.name.length < 3) {
            throw new Error("El nombre debe tener al menos 3 caracteres");
        }

        if (planData.price !== undefined && planData.price < 0) {
            throw new Error("El precio no puede ser negativo");
        }

        if (planData.features && (!Array.isArray(planData.features) || planData.features.length === 0)) {
            throw new Error("Debe incluir al menos una característica");
        }

        if (planData.isActive === true && !existingPlan.isActive) {
            const activePlans = await SettingsDataAccess.getActiveSubscriptionPlans();
            const activeCount = activePlans.filter(plan => plan.id !== 'free').length;
            if (activeCount >= 3) {
                throw new Error("Solo se pueden tener máximo 3 planes activos (además del plan gratuito)");
            }
        }

        const updatedPlan = await SettingsDataAccess.updateSubscriptionPlan(planId, {
            ...planData,
            updatedAt: new Date().toISOString()
        });

        return updatedPlan;
    },

    async deleteSubscriptionPlan(planId) {
        if (!planId) {
            throw new Error("Plan ID is required");
        }

        if (planId === 'free') {
            throw new Error("El plan gratuito no se puede eliminar");
        }

        const existingPlan = await SettingsDataAccess.getSubscriptionPlanById(planId);
        if (!existingPlan) {
            throw new Error("Plan no encontrado");
        }

        const usersWithPlan = await SettingsDataAccess.getUsersWithPlan(planId);
        if (usersWithPlan.length > 0) {
            throw new Error("No se puede eliminar un plan que tiene usuarios suscritos");
        }

        await SettingsDataAccess.deleteSubscriptionPlan(planId);
        
        return { message: "Plan eliminado exitosamente" };
    },

    async togglePlanStatus(planId) {
        if (!planId) {
            throw new Error("Plan ID is required");
        }

        if (planId === 'free') {
            throw new Error("El estado del plan gratuito no se puede cambiar");
        }

        const existingPlan = await SettingsDataAccess.getSubscriptionPlanById(planId);
        if (!existingPlan) {
            throw new Error("Plan no encontrado");
        }

        if (!existingPlan.isActive) {
            const activePlans = await SettingsDataAccess.getActiveSubscriptionPlans();
            const activeCount = activePlans.filter(plan => plan.id !== 'free').length;
            if (activeCount >= 3) {
                throw new Error("Solo se pueden tener máximo 3 planes activos (además del plan gratuito)");
            }
        }

        const updatedPlan = await SettingsDataAccess.updateSubscriptionPlan(planId, {
            isActive: !existingPlan.isActive,
            updatedAt: new Date().toISOString()
        });

        return updatedPlan;
    },

    async validateSubscriptionUpgrade(userId, newPlanId) {
        const currentSubscription = await this.getUserSubscription(userId);
        const currentPlan = await this.getSubscriptionPlanById(currentSubscription.plan);
        const newPlan = await this.getSubscriptionPlanById(newPlanId);

        const planHierarchy = { free: 0, bronze: 1, silver: 2, gold: 3 };
        
        return {
            isUpgrade: planHierarchy[newPlanId] > planHierarchy[currentSubscription.plan],
            isDowngrade: planHierarchy[newPlanId] < planHierarchy[currentSubscription.plan],
            priceDifference: newPlan.price - currentPlan.price,
            currentPlan: currentPlan,
            newPlan: newPlan
        };
    },

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    validateNotificationSettings(notifications) {
        const validKeys = ['walkStatus', 'announcements', 'subscription', 'messages', 'systemAlerts'];
        
        Object.keys(notifications).forEach(key => {
            if (!validKeys.includes(key)) {
                throw new Error(`Invalid notification setting: ${key}`);
            }
            
            if (typeof notifications[key] !== 'boolean') {
                throw new Error(`Notification setting ${key} must be boolean`);
            }
        });
    },

    calculateProrationAmount(currentPlan, newPlan, daysRemaining) {
        if (!currentPlan || !newPlan) return 0;
        
        const dailyRateCurrent = currentPlan.price / 30;
        const dailyRateNew = newPlan.price / 30;
        
        return (dailyRateNew - dailyRateCurrent) * daysRemaining;
    },

    getDaysUntilExpiry(expiryDate) {
        if (!expiryDate) return null;
        
        const expiry = new Date(expiryDate);
        const today = new Date();
        const diffTime = expiry - today;
        
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    },

    isSubscriptionExpiringSoon(expiryDate, daysThreshold = 7) {
        const daysRemaining = this.getDaysUntilExpiry(expiryDate);
        return daysRemaining !== null && daysRemaining <= daysThreshold && daysRemaining > 0;
    }
};