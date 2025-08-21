import {
    FiMenu,
    FiX,
    FiHome,
    FiUsers,
    FiSettings,
    FiPieChart,
    FiFileText,
    FiBookOpen,
    FiClock,
    FiDollarSign,
    FiTrendingUp,
    FiMessageSquare,
    FiHelpCircle,
    FiAlertCircle,
    FiEdit,
    FiShield,
    FiBell,
    FiLogOut,
    FiMoon,
    FiSun,
    FiCalendar,
} from "react-icons/fi";

const menuItems = {
    admin: [
        { icon: FiHome, label: "Dashboard", id: "dashboard" },
        { icon: FiUsers, label: "User Management", id: "users" },
        { icon: FiSettings, label: "System Configuration", id: "config" },
        { icon: FiPieChart, label: "Analytics", id: "analytics" },
        { icon: FiFileText, label: "Reporting", id: "reports" },
    ],
    client: [
        { icon: FiBookOpen, label: "My Services", id: "services" },
        { icon: FiClock, label: "Booking History", id: "bookings" },
        { icon: FiMessageSquare, label: "Support Tickets", id: "tickets" },
        { icon: FiSettings, label: "Profile Settings", id: "settings" },
    ],
    walker: [
        { icon: FiClock, label: "Active Walks", id: "walks" },
        { icon: FiCalendar, label: "Schedule", id: "schedule" },
        { icon: FiDollarSign, label: "Earnings", id: "earnings" },
        { icon: FiTrendingUp, label: "Performance Stats", id: "stats" },
    ],
    support: [
        { icon: FiMessageSquare, label: "Open Tickets", id: "open-tickets" },
        { icon: FiHelpCircle, label: "Customer Inquiries", id: "inquiries" },
        { icon: FiBookOpen, label: "Knowledge Base", id: "knowledge" },
        { icon: FiAlertCircle, label: "Escalation Management", id: "escalations" },
    ],
};

const commonMenuItems = [
    { icon: FiEdit, label: "Profile Edit", id: "profile" },
    { icon: FiShield, label: "Security Settings", id: "security" },
    { icon: FiBell, label: "Notifications", id: "notifications" },
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
}) => {
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
                onClick={() => setActiveItem(item.id)}
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

            <div className="border-t border-border dark:border-accent my-4"></div>

            {/* Cargar secciones del menu */}
            {commonMenuItems.map((item) => (
            <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
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
