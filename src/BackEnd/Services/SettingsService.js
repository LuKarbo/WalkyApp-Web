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

        const availablePlans = await this.getSubscriptionPlans();
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

    async getSubscriptionPlans() {
        const plans = await SettingsDataAccess.getSubscriptionPlans();
        
        // Ordenar planes por precio para mejor UX
        return plans.sort((a, b) => a.price - b.price);
    },

    async getSubscriptionPlanById(planId) {
        if (!planId) {
            throw new Error("Plan ID is required");
        }

        const plans = await this.getSubscriptionPlans();
        const plan = plans.find(p => p.id === planId);
        
        if (!plan) {
            throw new Error("Plan not found");
        }

        return plan;
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