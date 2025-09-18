import { AuthDataAccess } from "../DataAccess/AuthDataAccess.js";

export const AuthService = {
    async login(credentials) {
        // Validaciones básicas
        if (!credentials.email || !credentials.email.includes("@")) {
            throw new Error("Email inválido");
        }
        if (!credentials.password || credentials.password.length < 8) {
            throw new Error("Contraseña demasiado corta");
        }

        const user = await AuthDataAccess.login(credentials);

        return {
            id: user.id,
            fullName: user.name,
            email: user.email,
            role: user.role,
            profileImage: user.profileImage || "https://cdn.example.com/default-avatar.png",
            suscription: user.suscription,
            token: user.token,
        };
    },

    async register(data) {
        // Validaciones mejoradas
        if (!data || typeof data !== "object") {
            throw new Error("Datos inválidos");
        }
        
        if (!data.fullName || data.fullName.trim().length < 2) {
            throw new Error("El nombre debe tener al menos 2 caracteres");
        }
        
        if (!data.email || !data.email.includes("@")) {
            throw new Error("Email inválido");
        }
        
        if (!data.password || data.password.length < 8) {
            throw new Error("Contraseña demasiado corta");
        }

        if (data.password !== data.confirmPassword) {
            throw new Error("Las contraseñas no coinciden");
        }

        // Preparar datos para la API (mapear fullName -> name)
        const payload = {
            name: data.fullName.trim(),
            email: data.email.toLowerCase().trim(),
            password: data.password,
        };

        const user = await AuthDataAccess.register(payload);

        return {
            id: user.id,
            fullName: user.name,
            email: user.email,
            role: user.role,
            profileImage: user.profileImage || "https://cdn.example.com/default-avatar.png",
            suscription: user.suscription,
            token: user.token,
        };
    },

    async checkSession(token) {
        if (!token) throw new Error("No hay token");
        const user = await AuthDataAccess.checkSession(token);

        return {
            id: user.id,
            fullName: user.name,
            email: user.email,
            role: user.role,
            profileImage: user.profileImage || "https://cdn.example.com/default-avatar.png",
            suscription: user.suscription,
        };
    },

    async logout() {
        return await AuthDataAccess.logout();
    },
};