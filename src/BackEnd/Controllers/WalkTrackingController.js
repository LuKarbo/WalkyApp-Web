import { WalkTrackingService } from "../Services/WalkTrackingService.js";

export const WalkTrackingController = {
    async fetchWalkRoute(tripId) {
        try {
            return await WalkTrackingService.getWalkRoute(tripId);
        } catch (error) {
            console.error('Error obteniendo ruta del paseo:', error);
            throw new Error('Error al cargar la ruta del paseo: ' + error.message);
        }
    },

    async saveWalkPoint(tripId, lat, lng, address) {
        try {
            // Validaciones
            WalkTrackingService.validateCoordinates(lat, lng);
            
            return await WalkTrackingService.saveWalkPoint(tripId, lat, lng, address);
        } catch (error) {
            console.error('Error guardando punto del paseo:', error);
            throw new Error('Error al guardar punto del paseo: ' + error.message);
        }
    },

    async fetchWalkRecords(tripId) {
        try {
            return await WalkTrackingService.getWalkRecords(tripId);
        } catch (error) {
            console.error('Error obteniendo registros del paseo:', error);
            throw new Error('Error al cargar registros del paseo: ' + error.message);
        }
    },

    async clearWalkData(tripId) {
        try {
            return await WalkTrackingService.clearWalkData(tripId);
        } catch (error) {
            console.error('Error limpiando datos del paseo:', error);
            throw new Error('Error al limpiar datos del paseo: ' + error.message);
        }
    },

    // Validar si el mapa está visible según el estado del paseo
    isMapVisible(walkStatus) {
        return WalkTrackingService.validateMapVisible(walkStatus);
    },

    // Validar si se puede interactuar con el mapa según el estado del paseo
    isMapInteractive(walkStatus) {
        return WalkTrackingService.validateMapInteractive(walkStatus);
    },

    // Validar si se pueden mostrar los datos de seguimiento según el estado del paseo
    isTrackingVisible(walkStatus) {
        return WalkTrackingService.validateTrackingVisible(walkStatus);
    },

    // Obtener mensaje de estado del mapa
    getMapStatusMessage(walkStatus) {
        return WalkTrackingService.getMapStatusMessage(walkStatus);
    },

    // Obtener mensaje de estado del seguimiento
    getTrackingStatusMessage(walkStatus) {
        return WalkTrackingService.getTrackingStatusMessage(walkStatus);
    }
};