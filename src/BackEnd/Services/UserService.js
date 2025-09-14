import { UserDataAccess } from "../DataAccess/UserDataAccess.js";

export const UserService = {
    async getAllUsers() {
        const users = await UserDataAccess.getAllUsers();
        
        // Transformar a DTO del frontend
        return users.map(user => ({
            id: user.id,
            fullName: user.name,
            email: user.email.toLowerCase(),
            role: user.role,
            profileImage: user.profileImage || "https://cdn.example.com/default-avatar.png",
            phone: user.phone || "No disponible",
            location: user.location || "No disponible",
            suscription: user.suscription || "Basic",
            status: user.status || "active",
            joinedDate: user.joinedDate || new Date().toISOString(),
            lastLogin: user.lastLogin || new Date().toISOString()
        }));
    },

    async getUserById(id) {
        const user = await UserDataAccess.getUserById(id);
        
        return {
            id: user.id,
            fullName: user.name,
            email: user.email.toLowerCase(),
            role: user.role,
            profileImage: user.profileImage || "https://cdn.example.com/default-avatar.png",
            phone: user.phone || "No disponible",
            location: user.location || "No disponible",
            suscription: user.suscription || "Basic",
            status: user.status || "active",
            joinedDate: user.joinedDate || new Date().toISOString(),
            lastLogin: user.lastLogin || new Date().toISOString()
        };
    },

    async updateUser(id, userData) {
        // Validaciones
        if (!userData.name || userData.name.trim().length < 2) {
            throw new Error("El nombre debe tener al menos 2 caracteres");
        }

        if (!userData.email || !userData.email.includes("@")) {
            throw new Error("Email inválido");
        }

        if (!userData.role || !["admin", "client", "walker", "support"].includes(userData.role)) {
            throw new Error("Rol inválido");
        }

        if (!userData.status || !["active", "inactive"].includes(userData.status)) {
            throw new Error("Estado inválido");
        }

        if (userData.phone && userData.phone.trim() && !/^[\+]?[0-9\-\s\(\)]+$/.test(userData.phone)) {
            throw new Error("Formato de teléfono inválido");
        }

        // Preparar datos para la API
        const apiData = {
            name: userData.name.trim(),
            email: userData.email.toLowerCase().trim(),
            role: userData.role,
            phone: userData.phone?.trim() || "",
            location: userData.location?.trim() || "",
            suscription: userData.suscription || "Basic",
            status: userData.status,
            profileImage: userData.profileImage
        };

        const updatedUser = await UserDataAccess.updateUser(id, apiData);

        // Transformar respuesta al DTO del frontend
        return {
            id: updatedUser.id,
            fullName: updatedUser.name,
            email: updatedUser.email.toLowerCase(),
            role: updatedUser.role,
            profileImage: updatedUser.profileImage || "https://cdn.example.com/default-avatar.png",
            phone: updatedUser.phone || "No disponible",
            location: updatedUser.location || "No disponible",
            suscription: updatedUser.suscription || "Basic",
            status: updatedUser.status || "active",
            joinedDate: updatedUser.joinedDate || new Date().toISOString(),
            lastLogin: updatedUser.lastLogin || new Date().toISOString()
        };
    },

    async deleteUser(id) {
        if (!id || typeof id !== 'number') {
            throw new Error("ID de usuario inválido");
        }

        return await UserDataAccess.deleteUser(id);
    },

    async getUserStats() {
        return await UserDataAccess.getUserStats();
    }
};