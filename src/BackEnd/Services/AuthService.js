import { AuthDataAccess } from "../DataAccess/AuthDataAccess.js";

export const AuthService = {
    async login(credentials) {
        
        if (!credentials.email.includes("@")) {
            throw new Error("Email inválido");
        }
        if (credentials.password.length < 8) {
            throw new Error("Contraseña demasiado corta");
        }

        const user = await AuthDataAccess.login(credentials);

        return {
            id: user.id,
            fullName: user.name,
            email: user.email,
            role: user.role,
            profileImage:
                user.profileImage || "https://cdn.example.com/default-avatar.png",
            token: user.token,
        };
    },

    async register(data) {
    console.log(data.fullName + "-" + data.email + "-" + data.password)
    if (!data || typeof data !== "object") {
        throw new Error("Datos inválidos");
    }
    if (!data.email || !data.email.includes("@")) {
        throw new Error("Email inválido");
    }
    if (!data.password || data.password.length < 8) {
        console.log(data.password);
        throw new Error("Contraseña demasiado corta");
    }

    const payload = {
        name: data.fullName,
        email: data.email,
        password: data.password,
    };

    const user = await AuthDataAccess.register(payload);

    return {
            id: user.id,
            fullName: user.name,
            email: user.email,
            role: user.role,
            profileImage: user.profileImage || "https://cdn.example.com/default-avatar.png",
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
        };
    },

    async logout() {
        return await AuthDataAccess.logout();
    },
};
