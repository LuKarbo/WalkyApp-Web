export const AuthAPI = {
    users: [
        {
            id: 1,
            name: "Juan Admin",
            email: "admin@walkyapp.com",
            password: "12345678",
            role: "admin",
            profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
            suscription: "Premium",
            phone: "+1234567890",
            location: "Buenos Aires, Argentina",
            joinedDate: new Date('2023-01-15').toISOString(),
            status: "active",
            lastLogin: new Date().toISOString()
        },
        {
            id: 2,
            name: "María Cliente",
            email: "client@walkyapp.com",
            password: "12345678",
            role: "client",
            profileImage: "https://images.unsplash.com/photo-1494790108755-2616b2e3c8c5",
            suscription: "Basic",
            phone: "+1234567891",
            location: "Córdoba, Argentina",
            joinedDate: new Date('2023-03-22').toISOString(),
            status: "active",
            lastLogin: new Date().toISOString()
        },
        {
            id: 3,
            name: "Carlos Paseador",
            email: "walker@walkyapp.com",
            password: "12345678",
            role: "walker",
            profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
            suscription: "Professional",
            phone: "+1234567892",
            location: "Rosario, Argentina",
            joinedDate: new Date('2023-05-10').toISOString(),
            status: "active",
            lastLogin: new Date().toISOString()
        },
        {
            id: 4,
            name: "Ana Soporte",
            email: "support@walkyapp.com",
            password: "12345678",
            role: "support",
            profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
            suscription: "Staff",
            phone: "+1234567893",
            location: "Mendoza, Argentina",
            joinedDate: new Date('2023-02-28').toISOString(),
            status: "active",
            lastLogin: new Date().toISOString()
        },
        {
            id: 5,
            name: "Pedro Cliente Inactivo",
            email: "inactive@walkyapp.com",
            password: "12345678",
            role: "client",
            profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
            suscription: "Basic",
            phone: "+1234567894",
            location: "La Plata, Argentina",
            joinedDate: new Date('2022-12-01').toISOString(),
            status: "inactive",
            lastLogin: new Date('2023-01-15').toISOString()
        },
        {
            id: 6,
            name: "María 2",
            email: "client2@walkyapp.com",
            password: "12345678",
            role: "client",
            profileImage: "https://images.unsplash.com/photo-1494790108755-2616b2e3c8c5",
            suscription: "Basic",
            phone: "+1234567891",
            location: "Córdoba, Argentina",
            joinedDate: new Date('2023-03-22').toISOString(),
            status: "active",
            lastLogin: new Date().toISOString()
        },
        {
            id: 7,
            name: "María 3",
            email: "client3@walkyapp.com",
            password: "12345678",
            role: "client",
            profileImage: "https://images.unsplash.com/photo-1494790108755-2616b2e3c8c5",
            suscription: "Basic",
            phone: "+1234567891",
            location: "Córdoba, Argentina",
            joinedDate: new Date('2023-03-22').toISOString(),
            status: "active",
            lastLogin: new Date().toISOString()
        },
    ],

    async login(credentials) {
        console.log("Simulando llamada API login:", credentials);
        
        const user = this.users.find(u => 
            u.email === credentials.email && 
            u.password === credentials.password &&
            u.status === "active"
        );

        if (user) {
            
            user.lastLogin = new Date().toISOString();
            
            return {
                ...user,
                token: `fake-jwt-token-${user.id}`,
            };
        }

        throw new Error("Credenciales inválidas o cuenta inactiva");
    },

    async register(data) {
        console.log("Simulando llamada API register:", data);
        
        if (this.users.some(u => u.email === data.email)) {
            throw new Error("El email ya está registrado");
        }

        const newUser = {
            id: Math.max(...this.users.map(u => u.id)) + 1,
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role || "client",
            profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
            suscription: "Basic",
            phone: data.phone || "",
            location: data.location || "",
            joinedDate: new Date().toISOString(),
            status: "active",
            lastLogin: new Date().toISOString()
        };

        this.users.push(newUser);

        return {
            ...newUser,
            token: `fake-jwt-token-${newUser.id}`,
        };
    },

    async checkSession(token) {
        console.log("Simulando verificación de sesión con token:", token);
        
        const userId = token?.replace('fake-jwt-token-', '');
        const user = this.users.find(u => u.id === parseInt(userId) && u.status === "active");

        if (user) {
            return {
                ...user,
                token,
            };
        }

        throw new Error("Sesión inválida o expirada");
    },

    async logout() {
        console.log("Simulando cierre de sesión");
        return { success: true };
    },

    async getAllUsers() {
        console.log("Simulando obtener todos los usuarios");
        return [...this.users];
    },

    async updateUser(id, userData) {
        console.log("Simulando actualización de usuario:", { id, userData });
        
        const userIndex = this.users.findIndex(u => u.id === id);
        if (userIndex === -1) {
            throw new Error("Usuario no encontrado");
        }

        if (userData.email && this.users.some(u => u.email === userData.email && u.id !== id)) {
            throw new Error("El email ya está en uso por otro usuario");
        }

        this.users[userIndex] = {
            ...this.users[userIndex],
            ...userData,
            id 
        };

        return this.users[userIndex];
    },

    async deleteUser(id) {
        console.log("Simulando eliminación de usuario:", id);
        
        const userIndex = this.users.findIndex(u => u.id === id);
        if (userIndex === -1) {
            throw new Error("Usuario no encontrado");
        }

        const user = this.users[userIndex];
        if (user.role === 'admin') {
            const adminCount = this.users.filter(u => u.role === 'admin' && u.status === 'active').length;
            if (adminCount <= 1) {
                throw new Error("No se puede eliminar el último administrador activo");
            }
        }

        this.users.splice(userIndex, 1);
        return { success: true, message: "Usuario eliminado correctamente" };
    }
};