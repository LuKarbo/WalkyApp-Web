import React from 'react';

// Componentes temporales 
const Home = () => <div className="p-6"><h2 className="text-xl font-bold">Dashboard Principal</h2><p>Bienvenido a WalkyApp</p></div>;
const Statistics = () => <div className="p-6"><h2 className="text-xl font-bold">Estadísticas</h2><p>Gráficos y métricas del sistema</p></div>;
const Users = () => <div className="p-6"><h2 className="text-xl font-bold">Gestión de Usuarios</h2><p>Lista y administración de usuarios</p></div>;
const PetsByUser = () => <div className="p-6"><h2 className="text-xl font-bold">Mascotas por Usuario</h2><p>Vista de mascotas registradas</p></div>;
const WalksByUser = () => <div className="p-6"><h2 className="text-xl font-bold">Paseos por Usuario</h2><p>Historial de paseos</p></div>;
const RegistrationRequests = () => <div className="p-6"><h2 className="text-xl font-bold">Solicitudes de Alta</h2><p>Solicitudes pendientes de aprobación</p></div>;
const TicketsGeneral = () => <div className="p-6"><h2 className="text-xl font-bold">Tickets de Soporte</h2><p>Gestión de consultas</p></div>;
const Promotions = () => <div className="p-6"><h2 className="text-xl font-bold">Promociones</h2><p>Gestión de ofertas y descuentos</p></div>;

const SearchWalker = () => <div className="p-6"><h2 className="text-xl font-bold">Buscar Paseador</h2><p>Encuentra el paseador perfecto</p></div>;
const MyWalks = () => <div className="p-6"><h2 className="text-xl font-bold">Mis Paseos</h2><p>Historial de paseos programados</p></div>;
const MyPets = () => <div className="p-6"><h2 className="text-xl font-bold">Mis Mascotas</h2><p>Gestión de tus mascotas</p></div>;
const MyAccountPerms = () => <div className="p-6"><h2 className="text-xl font-bold">Solicitar Permisos</h2><p>Solicitudes de permisos especiales</p></div>;
const Tickets = () => <div className="p-6"><h2 className="text-xl font-bold">Consultas</h2><p>Mis consultas al soporte</p></div>;

const MyReviews = () => <div className="p-6"><h2 className="text-xl font-bold">Mis Reseñas</h2><p>Reseñas recibidas</p></div>;
const Groups = () => <div className="p-6"><h2 className="text-xl font-bold">Grupos</h2><p>Grupos de paseo disponibles</p></div>;
const MyGroups = () => <div className="p-6"><h2 className="text-xl font-bold">Mis Grupos</h2><p>Grupos que administras</p></div>;

const ActiveWalks = () => <div className="p-6"><h2 className="text-xl font-bold">Paseos Activos</h2><p>Monitoreo de paseos en curso</p></div>;

const Notifications = () => <div className="p-6"><h2 className="text-xl font-bold">Notificaciones</h2><p>Centro de notificaciones</p></div>;
const Profile = () => <div className="p-6"><h2 className="text-xl font-bold">Mi Perfil</h2><p>Información personal</p></div>;
const Settings = () => <div className="p-6"><h2 className="text-xl font-bold">Ajustes</h2><p>Configuración de la aplicación</p></div>;

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
    'search-walker': SearchWalker,
    'my-walks': MyWalks,
    'my-pets': MyPets,
    'my-account-perms': MyAccountPerms,
    'tickets': Tickets,
    
    // Paseador
    'my-reviews': MyReviews,
    'groups': Groups,
    'my-groups': MyGroups,
    
    // Soporte
    'active-walks': ActiveWalks,
    
    // General
    'notifications': Notifications,
    'profile': Profile,
    'settings': Settings,
};

export const getComponentById = (id) => {
    return menuComponents[id] || Home;
};

export const getMenuTitle = (id) => {
    const titles = {
        'statistics': 'Estadísticas',
        'users': 'Usuarios',
        'pets-by-user': 'Mascotas por Usuario',
        'walks-by-user': 'Paseos por Usuario',
        'registration-requests': 'Solicitudes de Alta',
        'tickets-general': 'Consultas',
        'promotions': 'Promociones',
        'home': 'Home',
        'search-walker': 'Buscar Paseador',
        'my-walks': 'Mis Paseos',
        'my-pets': 'Mis Mascotas',
        'my-account-perms': 'Solicitar Permisos',
        'tickets': 'Consultas',
        'my-reviews': 'Mis Reseñas',
        'groups': 'Grupos',
        'my-groups': 'Mis Grupos',
        'active-walks': 'Paseos Activos',
        'notifications': 'Notificaciones',
        'profile': 'Mi Perfil',
        'settings': 'Ajustes',
    };
    
    return titles[id] || 'Dashboard';
};