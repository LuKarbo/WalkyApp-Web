// EJEMPLO
// Se encarga de hacer las Validaciones y comprobar/preparar los modelos/data para enviarlos a la API o luego de recibirlos
import { UserDataAccess } from "../DataAccess/UserDataAccess.js";

export const UserService = {
    async getUserProfile(id) {
        const user = await UserDataAccess.getUserById(id);

        const profileImage =
        user.profileImage ||
        "https://cdn.example.com/default-avatar.png";

        
        const userDTO = {
            id: user.id,
            fullName: user.name,            
            email: user.email.toLowerCase(),
            role: user.role,
            profileImage,
            phone: user.phone || "No disponible",
            location: user.location || "No disponible",
            createdAt: user.createdAt || new Date().toISOString()
        };

        return userDTO;
    },

    async updateUserProfile(id, profileData) {

        if (!profileData.name || profileData.name.trim().length < 2) {
            throw new Error("El nombre debe tener al menos 2 caracteres");
        }

        if (profileData.phone) {
            throw new Error("Formato de teléfono inválido");
        }

        // Preparar datos para la API
        const apiData = {
            name: profileData.name.trim(),
            phone: profileData.phone?.trim() || "",
            location: profileData.location?.trim() || "",
            avatar: profileData.avatar
        };

        const updatedUser = await UserDataAccess.updateUserProfile(id, apiData);

        // Transformar respuesta de la API al DTO del frontend
        const userDTO = {
            id: updatedUser.id,
            fullName: updatedUser.name,
            email: updatedUser.email.toLowerCase(),
            role: updatedUser.role,
            profileImage: updatedUser.profileImage,
            phone: updatedUser.phone || "No disponible",
            location: updatedUser.location || "No disponible",
            createdAt: updatedUser.createdAt || new Date().toISOString()
        };

        return userDTO;
    },

    async changeUserPassword(id, passwordData) {

        if (!passwordData.currentPassword) {
            throw new Error("La contraseña actual es requerida");
        }

        if (!passwordData.newPassword || passwordData.newPassword.length < 6) {
            throw new Error("La nueva contraseña debe tener al menos 6 caracteres");
        }

        if (passwordData.currentPassword === passwordData.newPassword) {
            throw new Error("La nueva contraseña debe ser diferente a la actual");
        }

        const apiData = {
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword
        };

        const result = await UserDataAccess.changeUserPassword(id, apiData);
        return result;
    }
};