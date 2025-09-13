import { useState, useEffect } from "react";
import { useUser } from "../../../BackEnd/Context/UserContext";
import { WalkerController } from "../../../BackEnd/Controllers/WalkerController";
import { WalksController } from "../../../BackEnd/Controllers/WalksController";
import WalkerServiceHeaderComponent from "../Components/WalkerServiceComponents/WalkerServiceHeaderComponent";
import WalkerServiceStatsComponent from "../Components/WalkerServiceComponents/WalkerServiceStatsComponent";
import WalkerServiceEarningsComponent from "../Components/WalkerServiceComponents/WalkerServiceEarningsComponent";
import WalkerServiceChartComponent from "../Components/WalkerServiceComponents/WalkerServiceChartComponent";
import WalkerServiceSettingsComponent from "../Components/WalkerServiceComponents/WalkerServiceSettingsComponent";

const WalkerService = () => {
    const user = useUser();
    const walkerId = user?.id;
    
    const [walkerData, setWalkerData] = useState(null);
    const [walksData, setWalksData] = useState([]);
    const [earnings, setEarnings] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [settings, setSettings] = useState({
        location: "",
        pricePerPet: 0,
        hasGPSTracker: false,
        hasDiscount: false,
        discountPercentage: 0,
        mercadoPagoEnabled: false
    });
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const loadWalkerData = async () => {
            if (!walkerId) return;
            
            try {
                setLoading(true);
                setError(null);
                
                const [walker, walks, walkerSettings] = await Promise.all([
                    WalkerController.fetchWalkerProfile(walkerId),
                    WalksController.fetchWalksByWalker(walkerId),
                    WalkerController.fetchWalkerSettings(walkerId)
                ]);
                
                setWalkerData(walker);
                setWalksData(walks);
                setSettings(walkerSettings);
                
                const calculatedEarnings = calculateEarnings(walks, walkerSettings);
                const calculatedChartData = generateChartData(walks);
                
                setEarnings(calculatedEarnings);
                setChartData(calculatedChartData);
                
            } catch (err) {
                console.error("Error loading walker data:", err);
                setError("Error al cargar la información del paseador.");
            } finally {
                setLoading(false);
            }
        };

        loadWalkerData();
    }, [walkerId]);

    const calculateEarnings = (walks, walkerSettings) => {
        const completedWalks = walks.filter(walk => walk.status === 'Finalizado');
        const basePrice = walkerSettings?.pricePerPet || 15000;
        
        const monthlyEarnings = completedWalks.reduce((total, walk) => {
            const walkDate = new Date(walk.startTime);
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();
            
            if (walkDate.getMonth() === currentMonth && walkDate.getFullYear() === currentYear) {
                let price = walk.price || basePrice;
                
                // Aplicar descuento si está activo
                if (walkerSettings?.hasDiscount && walkerSettings?.discountPercentage > 0) {
                    price = price * (1 - walkerSettings.discountPercentage / 100);
                }
                
                return total + price;
            }
            return total;
        }, 0);
        
        const totalEarnings = completedWalks.reduce((total, walk) => {
            let price = walk.price || basePrice;
            
            // Aplicar descuento si está activo
            if (walkerSettings?.hasDiscount && walkerSettings?.discountPercentage > 0) {
                price = price * (1 - walkerSettings.discountPercentage / 100);
            }
            
            return total + price;
        }, 0);
        
        return {
            monthly: monthlyEarnings,
            total: totalEarnings,
            completedWalks: completedWalks.length
        };
    };

    const generateChartData = (walks) => {
        const last7Days = [];
        const today = new Date();
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            last7Days.push(date);
        }
        
        const chartData = last7Days.map(date => {
            const dayWalks = walks.filter(walk => {
                const walkDate = new Date(walk.startTime);
                return walkDate.toDateString() === date.toDateString() && 
                    walk.status === 'Finalizado';
            });
            
            return {
                day: date.toLocaleDateString('es-ES', { weekday: 'short' }),
                walks: dayWalks.length,
                date: date
            };
        });
        
        return chartData;
    };

    const getWalksStats = () => {
        const stats = {
            total: walksData.length,
            new: walksData.filter(w => w.status === 'Solicitado').length,
            awaitingPayment: walksData.filter(w => w.status === 'Esperando pago').length,
            scheduled: walksData.filter(w => w.status === 'Agendado').length,
            active: walksData.filter(w => w.status === 'Activo').length,
            completed: walksData.filter(w => w.status === 'Finalizado').length,
            rejected: walksData.filter(w => w.status === 'Rechazado').length
        };
        
        return stats;
    };

    const handleSettingsChange = (newSettings) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    };

    const handleSaveSettings = async () => {
        try {
            setSaving(true);
            const updatedSettings = await WalkerController.updateWalkerSettings(walkerId, settings);
            setSettings(updatedSettings);
            
            const updatedEarnings = calculateEarnings(walksData, updatedSettings);
            setEarnings(updatedEarnings);
            
            console.log('Configuración guardada exitosamente');
        } catch (err) {
            console.error('Error saving settings:', err);
            setError('Error al guardar la configuración');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="w-full min-h-screen p-6 bg-background dark:bg-foreground">
                <div className="bg-foreground-userProfile p-6 rounded-lg shadow-lg">
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        <p className="text-lg text-background ml-4">
                            Cargando dashboard del paseador...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full min-h-screen p-6 bg-background dark:bg-foreground">
                <div className="bg-foreground-userProfile p-6 rounded-lg shadow-lg">
                    <div className="flex justify-center items-center h-64">
                        <p className="text-lg text-danger">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    const walksStats = getWalksStats();

    return (
        <div className="w-full min-h-screen p-6 bg-background dark:bg-foreground">
            <div className="max-w-7xl mx-auto space-y-6">
                
                <div className="bg-foreground-userProfile p-6 rounded-lg shadow-lg">
                    <WalkerServiceHeaderComponent 
                        walkerData={walkerData}
                    />
                </div>

                <div className="bg-foreground-userProfile p-6 rounded-lg shadow-lg">
                    <WalkerServiceStatsComponent 
                        stats={walksStats}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-foreground-userProfile p-6 rounded-lg shadow-lg">
                        <WalkerServiceEarningsComponent 
                            earnings={earnings}
                        />
                    </div>
                    
                    <div className="bg-foreground-userProfile p-6 rounded-lg shadow-lg">
                        <WalkerServiceChartComponent 
                            chartData={chartData}
                        />
                    </div>
                </div>

                <div className="bg-foreground-userProfile p-6 rounded-lg shadow-lg">
                    <WalkerServiceSettingsComponent 
                        settings={settings}
                        onSettingsChange={handleSettingsChange}
                        onSave={handleSaveSettings}
                        isSaving={saving}
                    />
                </div>
            </div>
        </div>
    );
};

export default WalkerService;