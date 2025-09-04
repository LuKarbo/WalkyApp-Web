import { FaCrown, FaCalendarAlt } from 'react-icons/fa';
import { MdSubscriptions } from 'react-icons/md';

const SettingSubscriptionComponent = ({ subscription, onOpenSubscriptionModal }) => {
    const getSubscriptionBadgeColor = (plan) => {
        switch (plan?.toLowerCase()) {
            case 'gold':
                return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black';
            case 'silver':
                return 'bg-gradient-to-r from-gray-300 to-gray-500 text-black';
            case 'bronze':
                return 'bg-gradient-to-r from-amber-600 to-amber-800 text-white';
            default:
                return 'bg-gradient-to-r from-primary to-success text-white';
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="bg-background dark:bg-foreground rounded-2xl shadow-xl p-8 border border-border dark:border-muted">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                    <MdSubscriptions className="text-3xl text-primary mr-4" />
                    <h2 className="text-2xl font-bold text-foreground dark:text-background">
                        Suscripción
                    </h2>
                </div>
                <button
                    onClick={onOpenSubscriptionModal}
                    className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
                >
                    Gestionar Plan
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-primary/5 to-success/5 rounded-xl border border-primary/20">
                    <div className="flex items-center space-x-4">
                        <FaCrown className="text-3xl text-primary" />
                        <div>
                            <p className="font-semibold text-foreground dark:text-background text-lg">
                                Plan Actual
                            </p>
                            <p className="text-accent dark:text-muted">
                                {subscription?.plan || 'Free Plan'}
                            </p>
                        </div>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-sm font-bold ${getSubscriptionBadgeColor(subscription?.plan)}`}>
                        {subscription?.plan?.toUpperCase() || 'FREE'}
                    </div>
                </div>

                {subscription?.expiryDate && (
                    <div className="flex items-center justify-between p-6 bg-muted/30 rounded-xl">
                        <div className="flex items-center space-x-4">
                            <FaCalendarAlt className="text-2xl text-accent dark:text-muted" />
                            <div>
                                <p className="font-semibold text-foreground dark:text-background text-lg">
                                    Fecha de Vencimiento
                                </p>
                                <p className="text-accent dark:text-muted">
                                    {formatDate(subscription.expiryDate)}
                                </p>
                            </div>
                        </div>
                        <div className={`px-4 py-2 rounded-full text-sm font-bold ${
                            new Date(subscription.expiryDate) < new Date() 
                                ? 'bg-danger/70 text-black' 
                                : 'bg-success/70 text-black'
                        }`}>
                            {new Date(subscription.expiryDate) < new Date() ? 'VENCIDO' : 'ACTIVO'}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SettingSubscriptionComponent;