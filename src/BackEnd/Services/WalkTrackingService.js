import { WalkTrackingDataAccess } from "../DataAccess/WalkTrackingDataAccess.js";

export const WalkTrackingService = {
    async getWalkRoute(tripId) {
        const route = await WalkTrackingDataAccess.getWalkRoute(tripId);
        
        // Retornamos la ruta tal como viene de la API
        return route.map(point => ({
            lat: point.lat,
            lng: point.lng
        }));
    },

    async saveWalkPoint(tripId, lat, lng, address) {
        const pointData = {
            tripId,
            lat,
            lng, 
            address: address || 'Dirección no disponible'
        };

        const savedPoint = await WalkTrackingDataAccess.saveWalkPoint(pointData);
        
        // Retornamos en formato DTO para la UI
        return {
            id: savedPoint.id,
            time: new Date(savedPoint.timestamp).toLocaleTimeString('es-AR', {
                hour: '2-digit',
                minute: '2-digit'
            }),
            timeFull: savedPoint.timestamp,
            address: savedPoint.address,
            lat: savedPoint.lat,
            lng: savedPoint.lng
        };
    },

    async getWalkRecords(tripId) {
        const records = await WalkTrackingDataAccess.getWalkRecords(tripId);
        
        // Transformamos a DTO para la UI
        return records.map(record => ({
            id: record.id,
            time: record.time,
            timeFull: record.timeFull,
            address: record.address,
            lat: record.lat,
            lng: record.lng
        }));
    },

    async clearWalkData(tripId) {
        return await WalkTrackingDataAccess.clearWalkData(tripId);
    },

    // Validar si el mapa está visible según el estado del paseo
    validateMapVisible(walkStatus) {
        const visibleStatuses = ['Activo', 'Finalizado'];
        return visibleStatuses.includes(walkStatus);
    },

    // Validar si se puede interactuar con el mapa según el estado del paseo
    validateMapInteractive(walkStatus) {
        const interactiveStatuses = ['Activo'];
        return interactiveStatuses.includes(walkStatus);
    },

    // Validar si se pueden mostrar los datos de seguimiento según el estado del paseo
    validateTrackingVisible(walkStatus) {
        const visibleStatuses = ['Activo', 'Finalizado'];
        return visibleStatuses.includes(walkStatus);
    },

    getMapStatusMessage(walkStatus) {
        switch (walkStatus) {
            case 'Activo':
                return 'Mapa activo - Haz clic para agregar puntos';
            case 'Finalizado':
                return 'Mapa del paseo completado - Solo lectura';
            default:
                return 'El mapa se mostrará cuando el paseo esté activo';
        }
    },

    getTrackingStatusMessage(walkStatus) {
        switch (walkStatus) {
            case 'Activo':
                return 'Seguimiento en tiempo real';
            case 'Finalizado':
                return 'Resumen del paseo completado';
            default:
                return 'Los datos de seguimiento aparecerán cuando el paseo esté activo';
        }
    },

    // Validaciones de negocio
    validateCoordinates(lat, lng) {
        if (typeof lat !== 'number' || typeof lng !== 'number') {
            throw new Error('Las coordenadas deben ser números');
        }
        
        if (lat < -90 || lat > 90) {
            throw new Error('La latitud debe estar entre -90 y 90');
        }
        
        if (lng < -180 || lng > 180) {
            throw new Error('La longitud debe estar entre -180 y 180');
        }
        
        return true;
    }
};