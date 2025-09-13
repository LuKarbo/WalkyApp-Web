export const AuthAPI = {
    async login(credentials) {
        console.log("Simulando llamada API login:", credentials);

        if (credentials.email === "asd@gmail.com" && credentials.password === "12345678") {
            return {
                id: 1,
                name: "John Doe",
                email: "asd@gmail.com",
                role: "support",
                profileImage:
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
                suscription: "Client",
                phone: "+1234567890",
                location: "Buenos Aires, Argentina",
                joinedDate: new Date().toISOString(),
                token: "fake-jwt-token",
            };
        }

        throw new Error("Credenciales inválidas");
    },

    async register(data) {
        console.log("Simulando llamada API register:", data);

        return {
            id: 1,
            name: "John Doe",
            email: "asd@gmail.com",
            role: "support",
            profileImage:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
            suscription: "Client",
            phone: "+1234567890",
            location: "Buenos Aires, Argentina",
            joinedDate: new Date().toISOString(),
            token: "fake-jwt-token",
        };
    },

    // Verificar si hay session activa con el token del usaurio
    async checkSession(token) {
        console.log("Simulando verificación de sesión con token:", token);

        if (token === "fake-jwt-token" || token === "fake-jwt-token-new") {
            return {
                id: 1,
                name: "John Doe",
                email: "asd@gmail.com",
                role: "support",
                profileImage:
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
                suscription: "Client",
                phone: "+1234567890",
                location: "Buenos Aires, Argentina",
                joinedDate: new Date().toISOString(),
                token: "fake-jwt-token",
            };
        }

        throw new Error("Sesión inválida o expirada");
    },

    // Cerrar sesion de usuario
    async logout() {
        console.log("Simulando cierre de sesión");
        return { success: true };
    },
};
