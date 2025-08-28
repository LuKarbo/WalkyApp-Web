import { FiSettings } from "react-icons/fi";

const HeaderComponent = ({ userData, buttonBase, buttonInactive }) => (
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
            <button className={`${buttonBase} ${buttonInactive} flex items-center`}>
                <FiSettings className="mr-2" /> Edit Perfil
            </button>
        </div>
    </div>
);

export default HeaderComponent;
