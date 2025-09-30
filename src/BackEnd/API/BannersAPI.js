export const BannersAPI = {
    banners: [
        {
            id: 1,
            title: "Summer Special Offer",
            description: "Get 20% off on your first walk!",
            image: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6",
            isActive: true,
            order: 1,
            createdAt: '2025-01-01T10:00:00Z',
            updatedAt: '2025-01-01T10:00:00Z'
        },
        {
            id: 2,
            title: "New Walker Feature",
            description: "Real-time GPS tracking now available",
            image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
            isActive: true,
            order: 2,
            createdAt: '2025-01-05T14:30:00Z',
            updatedAt: '2025-01-05T14:30:00Z'
        },
        {
            id: 3,
            title: "Holiday Schedule",
            description: "Book early for the holiday season",
            image: "https://images.unsplash.com/photo-1513757271804-385fb022e70f",
            isActive: true,
            order: 3,
            createdAt: '2025-01-10T09:15:00Z',
            updatedAt: '2025-01-10T09:15:00Z'
        },
        {
            id: 4,
            title: "Weekend Specials",
            description: "Extended walks available on weekends",
            image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1",
            isActive: false,
            order: 4,
            createdAt: '2025-01-12T16:20:00Z',
            updatedAt: '2025-01-12T16:20:00Z'
        }
    ],

    nextId: 5,

    async getAllBanners() {
        await new Promise(resolve => setTimeout(resolve, 300));
        return [...this.banners];
    },

    async getActiveBanners() {
        await new Promise(resolve => setTimeout(resolve, 200));
        return this.banners
            .filter(banner => banner.isActive)
            .sort((a, b) => a.order - b.order)
            .slice(0, 3);
    },

    async getBannerById(bannerId) {
        await new Promise(resolve => setTimeout(resolve, 100));
        const bannerIdInt = parseInt(bannerId);
        return this.banners.find(banner => banner.id === bannerIdInt) || null;
    },

    async createBanner(bannerData) {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const newBanner = {
            id: this.nextId++,
            title: bannerData.title,
            description: bannerData.description,
            image: bannerData.image,
            isActive: bannerData.isActive || false,
            order: bannerData.order || this.banners.length + 1,
            createdAt: bannerData.createdAt || new Date().toISOString(),
            updatedAt: bannerData.updatedAt || new Date().toISOString()
        };

        this.banners.push(newBanner);
        return newBanner;
    },

    async updateBanner(bannerId, bannerData) {
        await new Promise(resolve => setTimeout(resolve, 400));
        
        const bannerIdInt = parseInt(bannerId);
        const bannerIndex = this.banners.findIndex(banner => banner.id === bannerIdInt);
        
        if (bannerIndex === -1) {
            throw new Error("Banner no encontrado");
        }

        this.banners[bannerIndex] = {
            ...this.banners[bannerIndex],
            ...bannerData,
            id: bannerIdInt,
            updatedAt: new Date().toISOString()
        };

        return this.banners[bannerIndex];
    },

    async deleteBanner(bannerId) {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const bannerIdInt = parseInt(bannerId);
        const bannerIndex = this.banners.findIndex(banner => banner.id === bannerIdInt);
        
        if (bannerIndex === -1) {
            throw new Error("Banner no encontrado");
        }

        this.banners.splice(bannerIndex, 1);
        return { message: "Banner eliminado exitosamente" };
    }
};