import {
    FiMenu,
    FiX,
    FiHome,
    FiUsers,
    FiSettings,
    FiPieChart,
    FiBarChart,
    FiBookOpen,
    FiClock,
    FiTrendingUp,
    FiMessageSquare,
    FiEdit,
    FiBell,
    FiLogOut,
    FiMoon,
    FiSun,
    FiSearch,
    FiStar,
    FiUserPlus,
    FiTool,
    FiHeart,
    FiSend,
    FiMail,
} from "react-icons/fi";

const menuItems = {
    // Menú para Administrador
    admin: [
        { icon: FiBarChart, label: "Estadísticas", id: "statistics" },
        { icon: FiUsers, label: "Usuarios", id: "users" },
        { icon: FiHeart, label: "Mascotas por usuario", id: "pets-by-user" },
        { icon: FiClock, label: "Paseos por usuario", id: "walks-by-user" },
        { icon: FiUserPlus, label: "Solicitudes de Alta", id: "registration-requests" },
        { icon: FiMail, label: "Consultas", id: "tickets-general" },
        { icon: FiTool, label: "Admin Menu", id: "promotions" },
    ],
    
    // Menú para Cliente
    client: [
        { icon: FiHome, label: "Home", id: "home" },
        { icon: FiSearch, label: "Buscar Paseador", id: "search-walker" },
        { icon: FiClock, label: "Mis Paseos", id: "my-walks" },
        { icon: FiHeart, label: "Mis Mascotas", id: "my-pets" },
        { icon: FiSend, label: "Solicitar permisos", id: "my-account-perms" },
        { icon: FiMessageSquare, label: "Consultas", id: "tickets" },
    ],
    
    // Menú para Paseador
    walker: [
        { icon: FiHome, label: "Home", id: "home" },
        { icon: FiClock, label: "Mis Paseos", id: "my-walks" },
        { icon: FiStar, label: "Mis Reseñas", id: "my-reviews" },
        { icon: FiTrendingUp, label: "Estadísticas", id: "statistics" },
        { icon: FiMessageSquare, label: "Consultas", id: "tickets" },
    ],
    
    // Menú para Soporte
    support: [
        { icon: FiMail, label: "Consultas", id: "tickets-general" },
        { icon: FiClock, label: "Paseos Activos", id: "active-walks" },
    ],
};

const commonMenuItems = [
    { icon: FiEdit, label: "Mi Perfil", id: "profile" },
    { icon: FiBell, label: "Notificaciones", id: "notifications" },
    { icon: FiUsers, label: "Grupos", id: "groups" },
    { icon: FiBookOpen, label: "Mis Grupos", id: "my-groups" },
    { icon: FiSettings, label: "Ajustes", id: "settings" },
    { icon: FiLogOut, label: "Logout", id: "logout" },
];

const Navbar = ({
    isOpen,
    toggleSidebar,
    isDarkMode,
    toggleDarkMode,
    activeItem,
    setActiveItem,
    user,
    onLogout,
}) => {

    const handleMenuClick = (id) => {
        if (id === "logout") {
            onLogout();
        } else {
            setActiveItem(id);
        }
    };


    return (
        <aside
            className={`${
                isOpen ? "w-64" : "w-20"
            } relative transition-all duration-300 ease-in-out bg-card dark:bg-foreground shadow-lg flex flex-col`}
        >

        {/* Logo */}
        <div className="p-4 flex justify-between items-center">
            <h1
                className={`${
                    !isOpen && "hidden"
                } text-xl font-bold text-foreground dark:text-background`}
            >
            WalkyApp
            </h1>
            <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg bg-primary hover:bg-ring text-white"
            >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
        </div>

        {/* User Simple Data */}
        <div className="p-4 border-b border-border dark:border-accent">
            <div className="flex items-center space-x-4">
                <img
                    src={user?.profileImage}
                    alt="User"
                    className="w-12 h-12 rounded-full"
                    onError={(e) => {
                    e.target.src =
                        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e";
                    }}
                />
                {isOpen && (
                    <div>
                        <h2 className="text-foreground dark:text-background font-semibold">
                            {user?.fullName}
                        </h2>
                        <p className="text-accent text-sm">{user?.email}</p>
                        <span className="text-xs px-2 py-1 bg-primary text-white rounded-full">
                            {user?.role}
                        </span>
                    </div>
                )}
            </div>
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-2 flex-1 overflow-auto">
            {menuItems[user?.role || "client"].map((item) => (
            <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors
                ${
                    activeItem === item.id
                    ? "bg-primary text-white"
                    : "hover:bg-muted dark:hover:bg-accent text-foreground dark:text-background"
                }`}
            >
                <item.icon size={20} />
                {isOpen && <span>{item.label}</span>}
            </button>
            ))}

            {/* Separador solo si hay elementos comunes */}
            {commonMenuItems.length > 0 && (
                <div className="border-t border-border dark:border-accent my-4"></div>
            )}

            {commonMenuItems.map((item) => (
            <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors
                ${
                    activeItem === item.id
                    ? "bg-primary text-white"
                    : "hover:bg-muted dark:hover:bg-accent text-foreground dark:text-background"
                }`}
            >
                <item.icon size={20} />
                {isOpen && <span>{item.label}</span>}
            </button>
            ))}
        </nav>

        {/* Cambio de Modo Claro/Oscuro */}
        <div className="p-4 border-t border-border dark:border-accent">
            <button
            onClick={toggleDarkMode}
            className="w-full flex items-center justify-center space-x-2 p-2 rounded-lg bg-muted dark:bg-accent hover:bg-primary dark:hover:bg-primary text-foreground dark:text-background"
            >
            {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            {isOpen && <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>}
            </button>
        </div>
        </aside>
    );
};

export default Navbar;