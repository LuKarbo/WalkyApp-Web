// EJEMPLO
export const UserAPI = {
    async getUserById(id) {
        //// Se Simula la llamda a la API
        // const res = await fetch(`/api/users/${id}`);
        // if (!res.ok) throw new Error("Error fetching user");
        // return await res.json();

        return {
            id: "1",
            name: "John Doe",
            email: "asd@gmail.com",
            role: "admin",
            profileImage:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            };
    },
};
