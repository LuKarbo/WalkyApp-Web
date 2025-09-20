import { WalkTrackingAPI } from "../API/WalkTrackingAPI.js";

export const WalkTrackingDataAccess = {
    async getWalkRoute(tripId) {
        if (!tripId) {
            throw new Error("El ID del paseo es requerido");
        }
        return await WalkTrackingAPI.getWalkRoute(tripId);
    },

    async saveWalkPoint(pointData) {
        if (!pointData.tripId || !pointData.lat || !pointData.lng) {
            throw new Error("El ID del paseo, latitud y longitud son requeridos");
        }
        return await WalkTrackingAPI.saveWalkPoint(pointData);
    },

    async getWalkRecords(tripId) {
        if (!tripId) {
            throw new Error("El ID del paseo es requerido");
        }
        return await WalkTrackingAPI.getWalkRecords(tripId);
    },

    async clearWalkData(tripId) {
        if (!tripId) {
            throw new Error("El ID del paseo es requerido");
        }
        return await WalkTrackingAPI.clearWalkData(tripId);
    }
};