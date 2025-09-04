import { useState, useEffect } from 'react';
import { FaTimes, FaCrown, FaCheck, FaStar } from 'react-icons/fa';
import { MdDiamond } from 'react-icons/md';
import { SettingsController } from '../../../../BackEnd/Controllers/SettingsController';
import { useUser } from '../../../../BackEnd/Context/UserContext';

const SubscriptionModal = ({ isOpen, onClose, currentSubscription, onSubscriptionUpdate }) => {
    const user = useUser();
    const [loading, setLoading] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [plans, setPlans] = useState([]);
    const [plansLoading, setPlansLoading] = useState(true);

    const planConfig = {
        free: {
            icon: FaStar,
            color: 'from-primary to-success',
            popular: false
        },
        bronze: {
            icon: FaCrown,
            color: 'from-amber-600 to-amber-800',
            popular: false
        },
        silver: {
            icon: MdDiamond,
            color: 'from-gray-300 to-gray-500',
            popular: true
        },
        gold: {
            icon: FaCrown,
            color: 'from-yellow-400 to-yellow-600',
            popular: false
        }
    };

    useEffect(() => {
        if (isOpen) {
            loadPlans();
        }
    }, [isOpen]);

    const loadPlans = async () => {
        try {
            setPlansLoading(true);
            const subscriptionPlans = await SettingsController.getSubscriptionPlans();
            
            const plansWithConfig = subscriptionPlans.map(plan => ({
                ...plan,
                ...planConfig[plan.id],
                
                features: translateFeatures(plan.features),
                
                limitations: getLimitationsForPlan(plan.id)
            }));
            
            setPlans(plansWithConfig);
        } catch (error) {
            console.error('Error loading subscription plans:', error);
        } finally {
            setPlansLoading(false);
        }
    };

    const translateFeatures = (features) => {
        const translations = {
            'Up to 2 walks per month': 'Hasta 2 paseos por mes',
            'Basic walkers': 'Paseadores básicos',
            'Email support': 'Soporte por email',
            'Basic notifications': 'Notificaciones básicas',
            'Up to 8 walks per month': 'Hasta 8 paseos por mes',
            'Real-time GPS tracking': 'GPS en tiempo real',
            'Walk photos': 'Fotos durante el paseo',
            'Verified walkers': 'Paseadores verificados',
            'Priority support': 'Soporte prioritario',
            'Activity reports': 'Reportes de actividad',
            'Up to 15 walks per month': 'Hasta 15 paseos por mes',
            'Premium walkers access': 'Acceso a paseadores premium',
            'Photos and videos': 'Fotos y videos del paseo',
            'Free cancellation 24h': 'Cancelación gratuita 24h antes',
            '24/7 support': 'Soporte 24/7',
            'Detailed reports': 'Reportes detallados',
            '10% discount on extras': '10% descuento en servicios extra',
            'Unlimited walks': 'Paseos ilimitados',
            'VIP walker access': 'Acceso VIP a mejores paseadores',
            'Premium GPS with history': 'GPS premium con historial',
            'HD videos': 'Videos HD del paseo',
            'Free cancellation anytime': 'Cancelación gratuita sin restricciones',
            'Dedicated 24/7 support': 'Soporte dedicado 24/7',
            'Monthly vet reports': 'Reportes veterinarios mensuales',
            '20% discount on extras': '20% descuento en servicios extra',
            'Emergency service': 'Servicio de emergencia',
            'Night walks available': 'Paseos nocturnos disponibles'
        };
        
        return features.map(feature => translations[feature] || feature);
    };

    const getLimitationsForPlan = (planId) => {
        switch (planId) {
            case 'free':
                return [
                    'Sin GPS en tiempo real',
                    'Sin fotos durante el paseo',
                    'Sin paseadores premium'
                ];
            case 'bronze':
                return [
                    'Sin paseadores premium',
                    'Sin cancelación gratuita'
                ];
            default:
                return [];
        }
    };

    const handlePlanSelect = async (planId) => {
        if (loading || planId === currentSubscription?.plan) return;

        try {
            setLoading(true);
            setSelectedPlan(planId);
            
            const result = await SettingsController.updateSubscription(user?.id, planId);
            onSubscriptionUpdate(result);
            
            onClose();
            setSelectedPlan(null);
            
        } catch (error) {
            console.error('Error updating subscription:', error);
            setSelectedPlan(null);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-background dark:bg-foreground rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden">

                <div className="relative p-6 border-b border-border dark:border-muted">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-foreground dark:text-background">
                                Planes de Suscripción
                            </h2>
                            <p className="text-accent dark:text-muted mt-1">
                                Elige el plan que mejor se adapte a tus necesidades
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            disabled={loading}
                            className="p-2 hover:bg-muted/30 rounded-full transition-colors duration-200 disabled:opacity-50"
                        >
                            <FaTimes className="text-xl text-foreground dark:text-background" />
                        </button>
                    </div>
                    
                    {currentSubscription && (
                        <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
                            <p className="text-sm text-foreground dark:text-background">
                                <span className="font-medium">Plan actual:</span> {currentSubscription.plan?.toUpperCase() || 'FREE'}
                                {currentSubscription.expiryDate && (
                                    <span className="ml-2 text-accent dark:text-muted">
                                        • Vence: {new Date(currentSubscription.expiryDate).toLocaleDateString('es-ES')}
                                    </span>
                                )}
                            </p>
                        </div>
                    )}
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                    {plansLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {plans.map((plan) => {
                                    const IconComponent = plan.icon;
                                    const isCurrentPlan = currentSubscription?.plan === plan.id;
                                    const isSelected = selectedPlan === plan.id;
                                    
                                    return (
                                        <div
                                            key={plan.id}
                                            className={`relative rounded-2xl border-2 transition-all duration-300 ${
                                                plan.popular
                                                    ? 'border-primary shadow-lg shadow-primary/20 scale-105'
                                                    : isCurrentPlan
                                                    ? 'border-success shadow-lg'
                                                    : 'border-border dark:border-muted hover:border-primary/50'
                                            } ${isSelected ? 'ring-4 ring-primary/30' : ''}`}
                                        >
                                            {plan.popular && (
                                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                                    <div className="bg-primary text-white px-3 py-1 rounded-full text-xs font-bold">
                                                        MÁS POPULAR
                                                    </div>
                                                </div>
                                            )}

                                            {isCurrentPlan && (
                                                <div className="absolute -top-3 right-4">
                                                    <div className="bg-success text-black px-3 py-1 rounded-full text-xs font-bold">
                                                        ACTUAL
                                                    </div>
                                                </div>
                                            )}

                                            <div className="p-6">
                                                
                                                <div className="text-center mb-6">
                                                    <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${plan.color} mb-4`}>
                                                        <IconComponent className="text-2xl text-white" />
                                                    </div>
                                                    <h3 className="text-xl font-bold text-foreground dark:text-background mb-2">
                                                        {plan.name}
                                                    </h3>
                                                    <div className="mb-4">
                                                        <span className="text-3xl font-bold text-foreground dark:text-background">
                                                            ${plan.price}
                                                        </span>
                                                        <span className="text-accent dark:text-muted ml-1">
                                                            {plan.duration === 'forever' ? 'Gratis para siempre' : 'por mes'}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="space-y-3 mb-6">
                                                    {plan.features.map((feature, index) => (
                                                        <div key={index} className="flex items-start space-x-3">
                                                            <FaCheck className="text-success mt-0.5 flex-shrink-0" />
                                                            <span className="text-sm text-foreground dark:text-background">
                                                                {feature}
                                                            </span>
                                                        </div>
                                                    ))}
                                                    
                                                    {plan.limitations?.map((limitation, index) => (
                                                        <div key={index} className="flex items-start space-x-3 opacity-60">
                                                            <FaTimes className="text-danger mt-0.5 flex-shrink-0" />
                                                            <span className="text-sm text-foreground dark:text-background line-through">
                                                                {limitation}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <button
                                                    onClick={() => handlePlanSelect(plan.id)}
                                                    disabled={loading || isCurrentPlan}
                                                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                                                        isCurrentPlan
                                                            ? 'bg-success/20 text-success cursor-not-allowed'
                                                            : isSelected
                                                            ? 'bg-primary text-white'
                                                            : plan.popular
                                                            ? 'bg-primary text-white hover:bg-primary/90'
                                                            : 'bg-background dark:bg-foreground border border-primary text-primary hover:bg-primary hover:text-white'
                                                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                                                >
                                                    {isSelected ? (
                                                        <div className="flex items-center justify-center space-x-2">
                                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                            <span>Procesando...</span>
                                                        </div>
                                                    ) : isCurrentPlan ? (
                                                        'Plan Actual'
                                                    ) : plan.id === 'free' ? (
                                                        'Cambiar a Gratis'
                                                    ) : (
                                                        `Suscribirse a ${plan.name}`
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-8 p-4 bg-muted/20 dark:bg-accent/10 rounded-lg">
                                <p className="text-sm text-center text-accent dark:text-muted">
                                    Todos los planes incluyen garantía de satisfacción de 30 días. 
                                    Puedes cambiar o cancelar tu suscripción en cualquier momento.
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SubscriptionModal;