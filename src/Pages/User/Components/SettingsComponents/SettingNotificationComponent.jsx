import { FaBell } from 'react-icons/fa';

const SettingNotificationComponent = ({ settings, onToggleNotification }) => {
    const notificationLabels = {
        walkStatus: 'Estados de paseos',
        announcements: 'Anuncios y beneficios',
        subscription: 'Avisos de suscripción',
        messages: 'Mensajes',
        systemAlerts: 'Alertas de sistema'
    };

    return (
        <div className="bg-background dark:bg-foreground rounded-2xl shadow-xl p-8 border border-border dark:border-muted">
            <div className="flex items-center mb-6">
                <FaBell className="text-3xl text-primary mr-4" />
                <h2 className="text-2xl font-bold text-foreground dark:text-background">
                    Notificaciones
                </h2>
            </div>

            <div className="space-y-4">
                {Object.entries(settings.notifications).map(([key, value]) => (
                    <div 
                        key={key} 
                        className="flex items-center justify-between p-4 bg-muted/30 dark:bg-accent/10 rounded-xl hover:bg-muted/50 dark:hover:bg-accent/20 transition-all duration-200"
                    >
                        <span className="font-semibold text-foreground dark:text-background">
                            {notificationLabels[key]}
                        </span>
                        <button
                            onClick={() => onToggleNotification(key)}
                            className={`w-16 h-8 rounded-full relative transition-all duration-300 ${
                                value ? "bg-primary shadow-lg" : "bg-accent dark:bg-muted"
                            }`}
                        >
                            <span 
                                className={`absolute w-6 h-6 bg-white rounded-full top-1 transition-all duration-300 shadow-md ${
                                    value ? "right-1 transform scale-110" : "left-1"
                                }`}
                            ></span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SettingNotificationComponent;