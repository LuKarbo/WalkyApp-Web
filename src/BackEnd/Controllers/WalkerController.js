import { WalkerService } from "../Services/WalkerService.js";

export const WalkerController = {
    async fetchWalkersForHome() {
        return await WalkerService.getWalkersForHome();
    },

    async fetchWalkerProfile(id) {
        return await WalkerService.getWalkerProfile(id);
    }
};