import HomeComponent from '../../Pages/User/Home';
import MyProfile from '../../Pages/User/Client/MyProfile';
import MapChat from '../../Pages/Common/Chat-map';
import SearchWalker from '../../Pages/User/SearchWalker';
import WalkerProfile from '../../Pages/User/Walker/WalkerProfile';
import MyTrips from '../../Pages/User/Client/MyTrips';

import {
    FiHome,
    FiUsers,
    FiSettings,
    FiBarChart,
    FiBookOpen,
    FiClock,
    FiTrendingUp,
    FiMessageSquare,
    FiEdit,
    FiBell,
    FiLogOut,
    FiSearch,
    FiStar,
    FiUserPlus,
    FiTool,
    FiHeart,
    FiSend,
    FiMail,
} from "react-icons/fi";

// Componentes En uso 
const Home = () => <HomeComponent/>;

const WalkerProfileView = ({ contentParams }) => {
    return <WalkerProfile id={contentParams} />;
};

const MyTripsView = () => <MyTrips/>;

const Trip = ({ contentParams }) => {
    const { tripId } = contentParams || {}; 
    return (
        <div className="p-6">
            <h2 className="text-xl font-bold">
                Info del Paseo {tripId}
            </h2>
            <p>
                asdasdasdads
            </p>
        </div>
    );
};

const UserProfile = () => <MyProfile/>;
const MapChatView  = () => <MapChat/>;
const SearchWalkerView = () => <SearchWalker/>;

const JoinToUs = () => <div className="p-6"><h2 className="text-xl font-bold">Formulario para ser Paseador </h2><p>asdasdasdads</p></div>;


// Componentes Ejemplo
const Statistics = () => <div className="p-6"><h2 className="text-xl font-bold">Estadísticas</h2><p>Gráficos y métricas del sistema</p></div>;
const Users = () => <div className="p-6"><h2 className="text-xl font-bold">Gestión de Usuarios</h2><p>Lista y administración de usuarios</p></div>;
const PetsByUser = () => <div className="p-6"><h2 className="text-xl font-bold">Mascotas por Usuario</h2><p>Vista de mascotas registradas</p></div>;
const WalksByUser = () => <div className="p-6"><h2 className="text-xl font-bold">Paseos por Usuario</h2><p>Historial de paseos</p></div>;
const RegistrationRequests = () => <div className="p-6"><h2 className="text-xl font-bold">Solicitudes de Alta</h2><p>Solicitudes pendientes de aprobación</p></div>;
const TicketsGeneral = () => <div className="p-6"><h2 className="text-xl font-bold">Tickets de Soporte</h2><p>Gestión de consultas</p></div>;
const Promotions = () => <div className="p-6"><h2 className="text-xl font-bold">Promociones</h2><p>Gestión de ofertas y descuentos</p></div>;

const MyPets = () => <div className="p-6"><h2 className="text-xl font-bold">Mis Mascotas</h2><p>Gestión de tus mascotas</p></div>;
const MyAccountPerms = () => <div className="p-6"><h2 className="text-xl font-bold">Solicitar Permisos</h2><p>Solicitudes de permisos especiales</p></div>;
const Tickets = () => <div className="p-6"><h2 className="text-xl font-bold">Consultas</h2><p>Mis consultas al soporte</p></div>;

const MyReviews = () => <div className="p-6"><h2 className="text-xl font-bold">Mis Reseñas</h2><p>Reseñas recibidas</p></div>;
const Groups = () => <div className="p-6"><h2 className="text-xl font-bold">Grupos</h2><p>Grupos de paseo disponibles</p></div>;
const MyGroups = () => <div className="p-6"><h2 className="text-xl font-bold">Mis Grupos</h2><p>Grupos que administras</p></div>;

const ActiveWalks = () => <div className="p-6"><h2 className="text-xl font-bold">Paseos Activos</h2><p>Monitoreo de paseos en curso</p></div>;

const Notifications = () => <div className="p-6"><h2 className="text-xl font-bold">Notificaciones</h2><p>Centro de notificaciones</p></div>;
const Settings = () => <div className="p-6"><h2 className="text-xl font-bold">Ajustes</h2><p>Configuración de la aplicación</p></div>;

// Mapeo de componentes
export const menuComponents = {
    // Admin
    'statistics': Statistics,
    'users': Users,
    'pets-by-user': PetsByUser,
    'walks-by-user': WalksByUser,
    'registration-requests': RegistrationRequests,
    'tickets-general': TicketsGeneral,
    'promotions': Promotions,
    
    // Cliente
    'home': Home,
    'search-walker': SearchWalkerView,
    'my-walks': MyTripsView,
    'my-pets': MyPets,
    'my-account-perms': MyAccountPerms,
    'tickets': Tickets,
    'join-to-us': JoinToUs,

    // Paseador
    'my-reviews': MyReviews,
    'groups': Groups,
    'my-groups': MyGroups,
    
    // Soporte
    'active-walks': ActiveWalks,
    
    // General
    'walker-profile': WalkerProfileView,
    'trip': Trip,
    'mapchat': MapChatView,

    'notifications': Notifications,
    'profile': UserProfile,
    'settings': Settings,
};

// Configuración de menús por rol
export const menuItems = {
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
        { icon: FiSend, label: "Ser Paseador", id: "join-to-us" },
        { icon: FiMessageSquare, label: "Consultas", id: "tickets" },
        { icon: FiMessageSquare, label: "MapChat", id: "mapchat" },
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

export const commonMenuItems = [
    { icon: FiEdit, label: "Mi Perfil", id: "profile" },
    { icon: FiBell, label: "Notificaciones", id: "notifications" },
    { icon: FiUsers, label: "Grupos", id: "groups" },
    { icon: FiBookOpen, label: "Mis Grupos", id: "my-groups" },
    { icon: FiSettings, label: "Ajustes", id: "settings" },
    { icon: FiLogOut, label: "Logout", id: "logout" },
];

const menuTitles = {
    'home': 'Home',
    'walker-profile': 'Perfil Del Paseador',
    'trip': 'Info de Paseo',
    'join-to-us': 'Queres ser un Paseador?',
    'search-walker': 'Buscar Paseador',

    'statistics': 'Estadísticas',
    'users': 'Usuarios',
    'pets-by-user': 'Mascotas por Usuario',
    'walks-by-user': 'Paseos por Usuario',
    'registration-requests': 'Solicitudes de Alta',
    'tickets-general': 'Consultas',
    'promotions': 'Promociones',
    'my-walks': 'Mis Paseos',
    'my-pets': 'Mis Mascotas',
    'my-account-perms': 'Ser Paseador',
    'tickets': 'Consultas',
    'my-reviews': 'Mis Reseñas',
    'groups': 'Grupos',
    'my-groups': 'Mis Grupos',
    'active-walks': 'Paseos Activos',
    'notifications': 'Notificaciones',
    'profile': 'Mi Perfil',
    'settings': 'Ajustes',
};

export const getComponentById = (id) => {
    return menuComponents[id] || Home;
};

export const getMenuTitle = (id) => {
    return menuTitles[id] || 'Dashboard';
};

export const getMenuItemsByRole = (role) => {
    return menuItems[role] || menuItems.client;
};

export const getCommonMenuItems = () => {
    return commonMenuItems;
};

export const getAllMenuItemsByRole = (role) => {
    const roleMenuItems = getMenuItemsByRole(role);
    const commonItems = getCommonMenuItems();
    
    return {
        roleItems: roleMenuItems,
        commonItems: commonItems
    };
};