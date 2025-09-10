// EJEMPLO
export const UserAPI = {
    async getUserById(id) {
        //// Se Simula la llamda a la API
        // const res = await fetch(`/api/users/${id}`);
        // if (!res.ok) throw new Error("Error fetching user");
        // return await res.json();

        return {
            id: 2,
            name: "John Doe",
            email: "asd@gmail.com",
            role: "walker",
            profileImage:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
            suscription: "Client",
            phone: "+1234567890",
            location: "Buenos Aires, Argentina",
            joinedDate: new Date().toISOString(),
            token: "fake-jwt-token",
        };
    },

    async updateUserProfile(id, profileData) {
        console.log("UserAPI - Actualizando perfil:", { id, profileData });

        return {
            id,
            name: profileData.name,
            email: "asd@gmail.com",
            role: "walker",
            profileImage: profileData.avatar,
            phone: profileData.phone,
            location: profileData.location,
            updatedAt: new Date().toISOString()
        };
    },

    async changeUserPassword(id, passwordData) {

        console.log("UserAPI - Cambiando contraseña:", { id, passwordData });

        if (passwordData.currentPassword !== "12345678") {
            throw new Error("Contraseña actual incorrecta");
        }
        
        return {
            success: true,
            message: "Contraseña actualizada correctamente",
            updatedAt: new Date().toISOString()
        };
    }
};