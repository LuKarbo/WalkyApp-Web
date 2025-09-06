import { useState, useEffect } from 'react';
import BannerHomeComponent from './Components/HomeComponents/BannerHomeComponent';
import WalkerCardComponent from './Components/HomeComponents/WalkerCardComponent';
import TableComponent from './Components/HomeComponents/TableComponent';
import CancelWalkModal from './Modals/MyTrips/CancelWalkModal';
import PaymentModal from './Modals/MyTrips/PaymentModal';
import { WalkerController } from '../../BackEnd/Controllers/WalkerController';
import { WalksController } from '../../BackEnd/Controllers/WalksController';
import { useUser } from '../../BackEnd/Context/UserContext';

const Home = ({ navigateToContent }) => {
    const [walkers, setWalkers] = useState([]);
    const [walks, setWalks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showCancelModal, setShowCancelModal] = useState(false);
    const [tripToCancel, setTripToCancel] = useState(null);
    const [cancelLoading, setCancelLoading] = useState(false);

    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [tripToPay, setTripToPay] = useState(null);
    const [paymentLoading, setPaymentLoading] = useState(false);

    const user = useUser();
    const userId = user?.id;
    
    const announcements = [
        {
            id: 1,
            title: "Summer Special Offer",
            description: "Get 20% off on your first walk!",
            image: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6"
        },
        {
            id: 2,
            title: "New Walker Feature",
            description: "Real-time GPS tracking now available",
            image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b"
        },
        {
            id: 3,
            title: "Holiday Schedule",
            description: "Book early for the holiday season",
            image: "https://images.unsplash.com/photo-1513757271804-385fb022e70f"
        }
    ];

    useEffect(() => {
        const loadData = async () => {
            if (!userId) return;
            
            try {
                setLoading(true);
                setError(null);
                
                const [walkersData, walksData] = await Promise.all([
                    WalkerController.fetchWalkersForHome(),
                    WalksController.fetchWalksByOwner(userId)
                ]);
                
                setWalkers(walkersData);
                const activeWalks = walksData
                    .filter(walk => ["Solicitado", "Esperando pago", "Agendado", "Activo"].includes(walk.status))
                    .slice(0, 5);
                setWalks(activeWalks);
            } catch (err) {
                setError('Error loading data: ' + err.message);
                console.error('Error loading data:', err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [userId]);

    const handleCancelTrip = (trip) => {
        setTripToCancel(trip);
        setShowCancelModal(true);
    };

    const handleConfirmCancel = async () => {
        if (!tripToCancel) return;
        
        try {
            setCancelLoading(true);
            await WalksController.changeWalkStatus(tripToCancel.id, 'Rechazado');
            
            setWalks(walks.map(trip => 
                trip.id === tripToCancel.id 
                    ? { ...trip, status: 'Rechazado' }
                    : trip
            ).filter(trip => ["Solicitado", "Esperando pago", "Agendado", "Activo"].includes(trip.status)));
            
            setShowCancelModal(false);
            setTripToCancel(null);
        } catch (err) {
            setError('Error cancelling trip: ' + err.message);
        } finally {
            setCancelLoading(false);
        }
    };

    const handleCloseCancelModal = () => {
        setShowCancelModal(false);
        setTripToCancel(null);
    };

    const handlePayTrip = (trip) => {
        setTripToPay(trip);
        setShowPaymentModal(true);
    };

    const handleConfirmPayment = async () => {
        if (!tripToPay) return;
        
        try {
            setPaymentLoading(true);
            await WalksController.changeWalkStatus(tripToPay.id, 'Agendado');
            
            setWalks(walks.map(trip => 
                trip.id === tripToPay.id 
                    ? { ...trip, status: 'Agendado' }
                    : trip
            ));
            
            setShowPaymentModal(false);
            setTripToPay(null);
        } catch (err) {
            setError('Error processing payment: ' + err.message);
        } finally {
            setPaymentLoading(false);
        }
    };

    const handleClosePaymentModal = () => {
        setShowPaymentModal(false);
        setTripToPay(null);
    };

    if (loading) {
        return (
            <div className="w-full h-full p-6 bg-background dark:bg-foreground">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mr-4"></div>
                    <p className="text-lg text-foreground dark:text-background">Loading data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-full p-6 bg-background dark:bg-foreground">
                <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                        <p className="text-lg text-red-500 mb-4">{error}</p>
                        <button 
                            onClick={() => window.location.reload()} 
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            Recargar
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full p-6 bg-background dark:bg-foreground">

            <BannerHomeComponent 
                announcements={announcements} 
                navigateToContent={navigateToContent}
            />

            <WalkerCardComponent 
                walkers={walkers} 
                navigateToContent={navigateToContent}
            />

            <TableComponent 
                trips={walks} 
                onCancelTrip={handleCancelTrip}
                onPayTrip={handlePayTrip}
            />

            <CancelWalkModal 
                isOpen={showCancelModal}
                onClose={handleCloseCancelModal}
                onConfirm={handleConfirmCancel}
                tripData={tripToCancel}
                isLoading={cancelLoading}
            />

            <PaymentModal 
                isOpen={showPaymentModal}
                onClose={handleClosePaymentModal}
                onConfirm={handleConfirmPayment}
                tripData={tripToPay}
                isLoading={paymentLoading}
            />
        </div>
    );
};

export default Home;