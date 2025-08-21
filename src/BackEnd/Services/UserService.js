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
        };

        return userDTO;
    },
};
