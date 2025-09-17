import HomeComponent from '../../Pages/User/Home';
import MyProfile from '../../Pages/User/Client/MyProfile';
import MapChat from '../../Pages/Common/Chat-map';
import SearchWalker from '../../Pages/User/SearchWalker';
import WalkerProfile from '../../Pages/User/Walker/WalkerProfile';
import MyTrips from '../../Pages/User/Client/MyTrips';
import MyPets from '../../Pages/User/Client/MyPets';
import MyReviews from '../../Pages/User/Client/MyReviews';
import Tickets from '../../Pages/User/Tickets';
import Settings from '../../Pages/User/Client/Settings';
import JoinToUsFrom from '../../Pages/User/JoinToUs';
import Notifications from '../../Pages/User/Client/MyNotifications'
import WalkerWalks from '../../Pages/User/Walker/WalkerWalks';
import WalkerReviews from '../../Pages/User/Walker/WalkerReviews'
import WalkerServic from '../../Pages/User/Walker/WalkerService' 
import WalkView from '../../Pages/User/WalkView/View/WalkView' 
import SupportWalksView from '../../Pages/Admin/WalksView/AdminWalksView'
import TicketsAdminView from '../../Pages/Admin/TicketsView/TicketsAdminView'
import AdminWalks from '../../Pages/Admin/AdminWalks/AdminWalks'
import AdminPet from '../../Pages/Admin/AdminPet/AdminPet'
import AdminUsers from '../../Pages/Admin/AdminUsers/AdminUsers'
import AdminApplications from '../../Pages/Admin/AdminApplicationsManagement/AdminApplicationsManagement'
import AdminManagement from '../../Pages/Admin/AdminManagement/AdminManagement'

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

const MyWalksWalker = () => <WalkerWalks/>;

const WalkViewComplete = ({ contentParams }) => {
    console.log({ contentParams })
    return <WalkView id={contentParams} />
};

const UserProfile = () => <MyProfile/>;
const MapChatView  = () => <MapChat/>;
const SearchWalkerView = () => <SearchWalker/>;
const MyPetsView = () => <MyPets/>;
const TicketsView = () => <Tickets/>;
const SettingsView = () => <Settings/>;
const JoinToUs = () => <JoinToUsFrom/>;
const NotificationsView = () => <Notifications/>;
const WalkerServiceView = () => <WalkerServic/>;
const WalkerReviewsView = () => <WalkerReviews/>;
const SupportWalks = () => <SupportWalksView/>
const TicketsGeneral = () => <TicketsAdminView/>;
const MyReviewsView = () => <MyReviews/>;
const AdminWalksView = () => <AdminWalks/>
const AdminPetView = () => <AdminPet/>;
const AdminUserView = () => <AdminUsers/>;
const AdminApplicationsView = () => <AdminApplications/>;
const PromotionsView = () => <AdminManagement/>;

// Mapeo de componentes
export const menuComponents = {
    // Admin
    'users': AdminUserView,
    'admin-pet': AdminPetView,
    'admin-walks': AdminWalksView,
    'registration-requests': AdminApplicationsView,
    'tickets-general': TicketsGeneral,
    'promotions': PromotionsView,
    
    // Cliente
    'home': Home,
    'search-walker': SearchWalkerView,
    'my-walks': MyTripsView,
    'my-pets': MyPetsView,
    'tickets': TicketsView,
    'join-to-us': JoinToUs,
    'my-reviews': MyReviewsView,
    
    // Paseador
    'walker-reviews': WalkerReviewsView,
    'my-walks-walker': MyWalksWalker,
    'walker-service': WalkerServiceView,
    
    // Soporte
    'active-walks': SupportWalks,
    
    // General
    'walker-profile': WalkerProfileView,
    'trip': WalkViewComplete,
    'mapchat': MapChatView,

    'notifications': NotificationsView,
    'profile': UserProfile,
    'settings': SettingsView,
};

// Configuración de menús por rol
export const menuItems = {
    // Menú para Administrador
    admin: [
        { icon: FiTool, label: "Promos & Planes", id: "promotions" },
        { icon: FiUsers, label: "Usuarios", id: "users" },
        { icon: FiClock, label: "Paseos", id: "admin-walks" },
        { icon: FiHeart, label: "Mascotas", id: "admin-pet" },
        { icon: FiUserPlus, label: "Solicitudes de Alta", id: "registration-requests" },
        { icon: FiMail, label: "Consultas", id: "tickets-general" },
    ],
    
    // Menú para Cliente
    client: [
        { icon: FiHome, label: "Home", id: "home" },
        { icon: FiSearch, label: "Buscar Paseador", id: "search-walker" },
        { icon: FiClock, label: "Mis Paseos", id: "my-walks" },
        { icon: FiHeart, label: "Mis Mascotas", id: "my-pets" },
        { icon: FiStar, label: "Mis Reseñas", id: "my-reviews" },
        { icon: FiSend, label: "Ser Paseador", id: "join-to-us" },
        { icon: FiMessageSquare, label: "Consultas", id: "tickets" },
        { icon: FiMessageSquare, label: "MapChat", id: "mapchat" },
    ],
    
    // Menú para Paseador
    walker: [
        { icon: FiTrendingUp, label: "Mi Servicio", id: "walker-service" },
        { icon: FiClock, label: "Mis Paseos", id: "my-walks-walker" },
        { icon: FiStar, label: "Mis Reseñas", id: "walker-reviews" },
        { icon: FiMessageSquare, label: "Consultas", id: "tickets" },
    ],
    
    // Menú para Soporte
    support: [
        { icon: FiMail, label: "Consultas", id: "tickets-general" },
        { icon: FiClock, label: "Paseos Activos", id: "active-walks" },
    ],
};

// Elementos comunes por rol (diferentes según necesidades)
export const commonMenuItemsByRole = {
    admin: [
        { icon: FiEdit, label: "Mi Perfil", id: "profile" },
        { icon: FiBell, label: "Alertas", id: "notifications" },
        { icon: FiSettings, label: "Ajustes", id: "settings" },
        { icon: FiLogOut, label: "Logout", id: "logout" },
    ],
    support: [
        { icon: FiEdit, label: "Mi Perfil", id: "profile" },
        { icon: FiBell, label: "Alertas", id: "notifications" },
        { icon: FiSettings, label: "Ajustes", id: "settings" },
        { icon: FiLogOut, label: "Logout", id: "logout" },
    ],
    client: [
        { icon: FiEdit, label: "Mi Perfil", id: "profile" },
        { icon: FiBell, label: "Alertas", id: "notifications" },
        { icon: FiSettings, label: "Ajustes", id: "settings" },
        { icon: FiLogOut, label: "Logout", id: "logout" },
    ],
    walker: [
        { icon: FiEdit, label: "Mi Perfil", id: "profile" },
        { icon: FiBell, label: "Alertas", id: "notifications" },
        { icon: FiSettings, label: "Ajustes", id: "settings" },
        { icon: FiLogOut, label: "Logout", id: "logout" },
    ],
};

const menuTitles = {
    'home': 'Home',
    'walker-profile': 'Perfil Del Paseador',
    'trip': 'Info de Paseo',
    'join-to-us': 'Queres ser un Paseador?',
    'search-walker': 'Buscar Paseador',

    'walker-service': 'Mi Servicio',
    'users': 'Usuarios',
    'admin-pet': 'Mascotas',
    'admin-walks': 'Paseos',
    'registration-requests': 'Solicitudes de Alta',
    'tickets-general': 'Consultas',
    'promotions': 'Promociones',
    'my-walks': 'Mis Paseos',
    'my-walks-walker': 'Mis Paseos',
    'my-pets': 'Mis Mascotas',
    'my-account-perms': 'Ser Paseador',
    'tickets': 'Consultas',
    'my-reviews': 'Mis Reseñas',
    'walker-reviews': 'Mis Reseñas',
    'active-walks': 'Paseos Activos',
    'notifications': 'Mis Alertas',
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

export const getCommonMenuItems = (role) => {
    return commonMenuItemsByRole[role] || commonMenuItemsByRole.client;
};

export const getAllMenuItemsByRole = (role) => {
    const roleMenuItems = getMenuItemsByRole(role);
    const commonItems = getCommonMenuItems();
    
    if(role === "support" || role === "admin"){
        const extras = commonItems.filter(item => item.id === "logout" || item.id === "profile");
        return {roleItems: roleMenuItems, commonItems: extras}
    }

    return {
        roleItems: roleMenuItems,
        commonItems: commonItems
    };
};