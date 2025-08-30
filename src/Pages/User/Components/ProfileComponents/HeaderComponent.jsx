import { useState } from "react";
import { FiSettings, FiLock } from "react-icons/fi";
import { UserController } from "../../../../BackEnd/Controllers/UserController";
import EditProfileModal from "../../Modals/ProfileModals/EditProfileModal";
import ChangePassModal from "../../Modals/ProfileModals/ChangePassModal";

const HeaderComponent = ({ userData, buttonBase, buttonInactive, onUpdateProfile, userId }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isChangePassModalOpen, setIsChangePassModalOpen] = useState(false);

    const handleSaveProfile = async (updatedData) => {
        try {
            console.log("Guardando perfil:", updatedData);
            onUpdateProfile?.(updatedData);
        } catch (error) {
            console.error("Error en HeaderComponent:", error);
            alert(`Error: ${error.message}`);
        }
    };

    const handleChangePassword = async (passwordData) => {
        try {
            await UserController.changeUserPassword(userId, passwordData);
            alert("Contraseña cambiada correctamente");
        } catch (error) {
            console.error("Error al cambiar contraseña:", error);
            alert(`Error al cambiar contraseña: ${error.message}`);
        }
    };

    return (
        <>
            <div className="bg-foreground-userProfile p-6 rounded-lg shadow-lg mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <img
                            src={userData.avatar}
                            alt="Profile"
                            className="w-20 h-20 rounded-full object-cover"
                        />
                        <div>
                            <h1 className="text-heading font-heading text-background">{userData.name}</h1>
                            <p className="text-accent dark:text-muted">{userData.email}</p>
                        </div>
                    </div>
                    <div className="flex space-x-3">
                        <button 
                            onClick={() => setIsEditModalOpen(true)}
                            className={`${buttonBase} ${buttonInactive} flex items-center`}
                        >
                            <FiSettings className="mr-2" /> Editar Perfil
                        </button>
                        <button 
                            onClick={() => setIsChangePassModalOpen(true)}
                            className={`${buttonBase} ${buttonInactive} flex items-center`}
                        >
                            <FiLock className="mr-2" /> Cambiar Contraseña
                        </button>
                    </div>
                </div>
            </div>

            <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                userData={userData}
                onSave={handleSaveProfile}
            />

            <ChangePassModal
                isOpen={isChangePassModalOpen}
                onClose={() => setIsChangePassModalOpen(false)}
                onSave={handleChangePassword}
            />
        </>
    );
};

export default HeaderComponent;