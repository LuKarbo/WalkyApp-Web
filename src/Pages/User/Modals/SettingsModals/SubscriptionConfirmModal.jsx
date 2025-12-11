import { FaExclamationCircle, FaTimes, FaCrown, FaDollarSign, FaArrowRight, FaCheckCircle } from 'react-icons/fa';

const SubscriptionConfirmModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    selectedPlan, 
    currentSubscription,
    isLoading 
}) => {
    if (!isOpen) return null;

    const planPrices = {
        free: 0,
        bronze: 9990,
        silver: 19990,
        gold: 29990,
        platinum: 49990
    };

    const isExpired = currentSubscription?.expiryDate && new Date(currentSubscription.expiryDate) < new Date();
    const isCurrentPlan = currentSubscription?.plan === selectedPlan?.plan_id;
    const isRenewal = isCurrentPlan && isExpired;
    const isUpgrade = planPrices[selectedPlan?.plan_id] > planPrices[currentSubscription?.plan];
    const isDowngrade = planPrices[selectedPlan?.plan_id] < planPrices[currentSubscription?.plan] && currentSubscription?.plan !== 'free';
    
    const currentPrice = planPrices[currentSubscription?.plan] || 0;
    const newPrice = planPrices[selectedPlan?.plan_id] || 0;
    const priceDifference = Math.abs(newPrice - currentPrice);

    const getModalContent = () => {
        // Caso 1: Renovación de plan vencido
        if (isRenewal) {
            return {
                icon: <FaCheckCircle className="text-5xl text-orange-500" />,
                iconBg: 'from-orange-400 to-orange-600',
                title: '¿Renovar Suscripción?',
                description: `Estás a punto de renovar tu plan ${selectedPlan?.name}`,
                details: [
                    { label: 'Plan', value: selectedPlan?.name, icon: <FaCrown /> },
                    { label: 'Costo', value: `$${newPrice.toLocaleString()}`, icon: <FaDollarSign /> },
                    { label: 'Duración', value: selectedPlan?.duration || '30 días', icon: <FaCheckCircle /> }
                ],
                message: 'Tu suscripción se renovará por el período completo.',
                messageType: 'info',
                confirmText: 'Confirmar Renovación',
                confirmColor: 'from-orange-500 to-orange-600'
            };
        }

        // Caso 2: Upgrade (pasar a plan más costoso)
        if (isUpgrade) {
            return {
                icon: <FaArrowRight className="text-5xl text-blue-500" />,
                iconBg: 'from-blue-400 to-blue-600',
                title: '¿Mejorar Plan?',
                description: `Estás cambiando de ${currentSubscription?.plan || 'gratuito'} a ${selectedPlan?.name}`,
                details: [
                    { label: 'Plan Actual', value: currentSubscription?.plan || 'Gratuito', icon: <FaCrown /> },
                    { label: 'Nuevo Plan', value: selectedPlan?.name, icon: <FaCrown className="text-blue-500" /> },
                    { label: 'Diferencia a Pagar', value: `$${priceDifference.toLocaleString()}`, icon: <FaDollarSign className="text-blue-500" /> }
                ],
                message: `Deberás pagar la diferencia de $${priceDifference.toLocaleString()} para actualizar tu plan.`,
                messageType: 'warning',
                confirmText: 'Confirmar Upgrade',
                confirmColor: 'from-blue-500 to-blue-600'
            };
        }

        // Caso 3: Downgrade (pasar a plan menos costoso)
        if (isDowngrade) {
            return {
                icon: <FaExclamationCircle className="text-5xl text-yellow-500" />,
                iconBg: 'from-yellow-400 to-yellow-600',
                title: '¿Cambiar a Plan Inferior?',
                description: `Estás cambiando de ${currentSubscription?.plan} a ${selectedPlan?.name}`,
                details: [
                    { label: 'Plan Actual', value: currentSubscription?.plan, icon: <FaCrown /> },
                    { label: 'Nuevo Plan', value: selectedPlan?.name, icon: <FaCrown className="text-yellow-500" /> },
                    { label: 'Ahorro', value: `$${priceDifference.toLocaleString()}`, icon: <FaDollarSign className="text-green-500" /> }
                ],
                message: 'Perderás acceso a algunas funciones premium del plan actual.',
                messageType: 'warning',
                confirmText: 'Confirmar Cambio',
                confirmColor: 'from-yellow-500 to-yellow-600'
            };
        }

        // Caso 4: Nueva suscripción (desde free)
        return {
            icon: <FaCrown className="text-5xl text-green-500" />,
            iconBg: 'from-green-400 to-green-600',
            title: '¿Suscribirse a Plan Premium?',
            description: `Estás a punto de suscribirte al plan ${selectedPlan?.name}`,
            details: [
                { label: 'Plan', value: selectedPlan?.name, icon: <FaCrown /> },
                { label: 'Costo', value: `$${newPrice.toLocaleString()}`, icon: <FaDollarSign /> },
                { label: 'Duración', value: selectedPlan?.duration || '30 días', icon: <FaCheckCircle /> }
            ],
            message: 'Obtendrás acceso a todas las funciones premium de inmediato.',
            messageType: 'success',
            confirmText: 'Confirmar Suscripción',
            confirmColor: 'from-green-500 to-green-600'
        };
    };

    const content = getModalContent();

    const getMessageStyles = () => {
        switch (content.messageType) {
            case 'warning':
                return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200';
            case 'info':
                return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200';
            case 'success':
                return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200';
            default:
                return 'bg-muted/20 border-border dark:border-muted text-foreground dark:text-background';
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
            <div className="bg-background dark:bg-foreground rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-scale-in">
                <div className="relative p-8">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="absolute top-4 right-4 text-accent dark:text-muted hover:text-foreground dark:hover:text-background transition-colors p-2 rounded-full hover:bg-muted/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FaTimes className="text-xl" />
                    </button>

                    <div className="text-center mb-6">
                        <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${content.iconBg} mb-4`}>
                            {content.icon}
                        </div>
                        <h2 className="text-2xl font-bold text-foreground dark:text-background mb-2">
                            {content.title}
                        </h2>
                        <p className="text-accent dark:text-muted">
                            {content.description}
                        </p>
                    </div>

                    <div className="bg-muted/10 rounded-2xl p-5 mb-5 space-y-3">
                        {content.details.map((detail, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-accent dark:text-muted">
                                    {detail.icon}
                                    <span className="text-sm font-medium">{detail.label}:</span>
                                </div>
                                <span className="font-bold text-foreground dark:text-background">
                                    {detail.value}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className={`rounded-xl p-4 mb-6 border ${getMessageStyles()}`}>
                        <p className="text-sm text-center font-medium">
                            {content.message}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={onClose}
                            disabled={isLoading}
                            className="flex-1 py-3 px-6 bg-muted/30 text-foreground dark:text-background rounded-xl hover:bg-muted/50 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={isLoading}
                            className={`flex-1 py-3 px-6 bg-gradient-to-r ${content.confirmColor} text-white rounded-xl hover:opacity-90 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    <span>Procesando...</span>
                                </>
                            ) : (
                                content.confirmText
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionConfirmModal;