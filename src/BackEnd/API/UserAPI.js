import { AuthAPI } from './AuthAPI.js';

export const UserAPI = {
    async getAllUsers() {
        console.log("UsersAPI - Obteniendo todos los usuarios");
        return await AuthAPI.getAllUsers();
    },

    async getUserById(id) {
        console.log("UsersAPI - Obteniendo usuario por ID:", id);
        const users = await AuthAPI.getAllUsers();
        const user = users.find(u => u.id === id);
        
        if (!user) {
            throw new Error("Usuario no encontrado");
        }
        
        return user;
    },

    async updateUser(id, userData) {
        console.log("UsersAPI - Actualizando usuario:", { id, userData });
        return await AuthAPI.updateUser(id, userData);
    },

    async deleteUser(id) {
        console.log("UsersAPI - Eliminando usuario:", id);
        return await AuthAPI.deleteUser(id);
    },

    async getUserStats() {
        console.log("UsersAPI - Obteniendo estadísticas de usuarios");
        const users = await AuthAPI.getAllUsers();
        
        const stats = {
            total: users.length,
            active: users.filter(u => u.status === 'active').length,
            inactive: users.filter(u => u.status === 'inactive').length,
            byRole: {
                admin: users.filter(u => u.role === 'admin').length,
                client: users.filter(u => u.role === 'client').length,
                walker: users.filter(u => u.role === 'walker').length,
                support: users.filter(u => u.role === 'support').length
            },
            recentJoins: users.filter(u => {
                const joinDate = new Date(u.joinedDate);
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                return joinDate > thirtyDaysAgo;
            }).length
        };

        return stats;
    }
};