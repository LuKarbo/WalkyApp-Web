import { useState, useEffect } from "react";
import { FiCalendar } from "react-icons/fi";
import { WalksController } from '../../../BackEnd/Controllers/WalksController';
import { useUser } from '../../../BackEnd/Context/UserContext';
import { useNavigation } from '../../../BackEnd/Context/NavigationContext';

import WalkerWalksHeaderComponent from '../Components/WalkerWalksComponents/WalkerWalksHeaderComponent';
import WalkerWalksCardComponent from '../Components/WalkerWalksComponents/WalkerWalksCardComponent';
import WalkerWalksFilter from '../Filters/WalkerWalks/WalkerWalksFilter';
import AcceptWalkModal from '../Modals/WalkerWalks/AcceptWalkModal';
import RejectWalkModal from '../Modals/WalkerWalks/RejectWalkModal';
import WaitingPaymentModal from '../Modals/WalkerWalks/WaitingPaymentModal';
import StartWalkModal from '../Modals/WalkerWalks/StartWalkModal';
import FinishWalkModal from '../Modals/WalkerWalks/FinishWalkModal';

const WalkerWalks = () => {
    const [walks, setWalks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("requests");
    const [searchQuery, setSearchQuery] = useState("");
    
    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [showWaitingPaymentModal, setShowWaitingPaymentModal] = useState(false);
    const [showStartWalkModal, setShowStartWalkModal] = useState(false);
    const [showFinishWalkModal, setShowFinishWalkModal] = useState(false);

    const [selectedWalk, setSelectedWalk] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);

    const user = useUser();
    const walkerId = user?.id;
    const { navigateToContent } = useNavigation();

    useEffect(() => {
        const loadWalks = async () => {
            if (!walkerId) return;
            
            try {
                setLoading(true);
                setError(null);
                
                const walksData = await WalksController.fetchWalksByWalker(walkerId);
                setWalks(walksData);
            } catch (err) {
                setError('Error loading walks: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        loadWalks();
    }, [walkerId]);

    const handleAcceptWalk = (walk) => {
        setSelectedWalk(walk);
        setShowAcceptModal(true);
    };

    const handleConfirmAccept = async () => {
        if (!selectedWalk) return;
        
        try {
            setActionLoading(true);
            await WalksController.acceptWalkRequest(selectedWalk.id);
            setWalks(walks.map(walk => 
                walk.id === selectedWalk.id 
                    ? { ...walk, status: 'Esperando pago' }
                    : walk
            ));
            setShowAcceptModal(false);
            setSelectedWalk(null);
        } catch (err) {
            setError('Error accepting walk: ' + err.message);
        } finally {
            setActionLoading(false);
        }
    };

    const handleRejectWalk = (walk) => {
        setSelectedWalk(walk);
        setShowRejectModal(true);
    };

    const handleConfirmReject = async () => {
        if (!selectedWalk) return;
        
        try {
            setActionLoading(true);
            await WalksController.rejectWalkRequest(selectedWalk.id);
            setWalks(walks.map(walk => 
                walk.id === selectedWalk.id 
                    ? { ...walk, status: 'Rechazado' }
                    : walk
            ));
            setShowRejectModal(false);
            setSelectedWalk(null);
        } catch (err) {
            setError('Error rejecting walk: ' + err.message);
        } finally {
            setActionLoading(false);
        }
    };

    const handleFinishWalk = (walk) => {
        setSelectedWalk(walk);
        setShowFinishWalkModal(true);
    };

    const handleConfirmFinishWalk = async () => {
        if (!selectedWalk) return;

        if (selectedWalk.status !== "Activo") {
            setError("Solo los paseos activos pueden finalizarse.");
            return;
        }

        try {
            setActionLoading(true);
            await WalksController.finishWalk(selectedWalk.id);
            setWalks(walks.map(walk => 
                walk.id === selectedWalk.id 
                    ? { ...walk, status: 'Finalizado' }
                    : walk
            ));
            setShowFinishWalkModal(false);
            setSelectedWalk(null);
        } catch (err) {
            setError('Error finishing walk: ' + err.message);
        } finally {
            setActionLoading(false);
        }
    };


    const handleShowWaitingPayment = (walk) => {
        setSelectedWalk(walk);
        setShowWaitingPaymentModal(true);
    };

    const handleStartWalk = (walk) => {
        setSelectedWalk(walk);
        setShowStartWalkModal(true);
    };

    const handleConfirmStartWalk = async () => {
        if (!selectedWalk) return;
        
        try {
            setActionLoading(true);
            await WalksController.startWalk(selectedWalk.id);
            setWalks(walks.map(walk => 
                walk.id === selectedWalk.id 
                    ? { ...walk, status: 'Activo' }
                    : walk
            ));
            setShowStartWalkModal(false);
            setSelectedWalk(null);
        } catch (err) {
            setError('Error starting walk: ' + err.message);
        } finally {
            setActionLoading(false);
        }
    };

    const handleViewWalk = (walkId) => {
        navigateToContent('trip', { tripId: walkId });
    };

    const handleCloseModals = () => {
        setShowAcceptModal(false);
        setShowRejectModal(false);
        setShowWaitingPaymentModal(false);
        setShowStartWalkModal(false);
        setShowFinishWalkModal(false);
        setSelectedWalk(null);
    };

    const filteredWalks = walks.filter((walk) => {
        let isInTab = false;
        
        switch (activeTab) {
            case "requests":
                isInTab = ["Solicitado", "Esperando pago", "Agendado"].includes(walk.status);
                break;
            case "active":
                isInTab = walk.status === "Activo";
                break;
            case "history":
                isInTab = ["Finalizado", "Rechazado"].includes(walk.status);
                break;
            default:
                isInTab = false;
        }

        const matchesSearch = walk.dogName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                walk.notes?.toLowerCase().includes(searchQuery.toLowerCase());

        return isInTab && matchesSearch;
    });

    const requestsCount = walks.filter(walk => 
        ["Solicitado", "Esperando pago", "Agendado"].includes(walk.status)
    ).length;

    const activeCount = walks.filter(walk => 
        walk.status === "Activo"
    ).length;

    const historyCount = walks.filter(walk => 
        ["Finalizado", "Rechazado"].includes(walk.status)
    ).length;

    if (loading) {
        return (
            <div className="w-full h-full p-6 bg-background dark:bg-foreground">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    <p className="text-lg text-foreground dark:text-background ml-4">Cargando paseos...</p>
                </div>
            </div>
        );
    }

    if (error && !showAcceptModal && !showRejectModal) {
        return (
            <div className="w-full h-full p-6 bg-background dark:bg-foreground">
                <div className="flex justify-center items-center h-64">
                    <p className="text-lg text-danger">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w- min-h-screen p-6 bg-background dark:bg-foreground">
            <div className="mx-auto">
                
                <WalkerWalksHeaderComponent 
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    requestsCount={requestsCount}
                    activeCount={activeCount}
                    historyCount={historyCount}
                />

                <WalkerWalksFilter 
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />

                {filteredWalks.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="bg-white/50 dark:bg-foreground/50 backdrop-blur-sm rounded-3xl p-12 max-w-md mx-auto shadow-xl">
                            <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FiCalendar className="text-4xl text-primary" />
                            </div>
                            <p className="text-xl font-semibold text-foreground dark:text-background mb-2">
                                {activeTab === "requests" && "No tienes solicitudes pendientes"}
                                {activeTab === "active" && "No tienes paseos activos"}
                                {activeTab === "history" && "No hay paseos en el historial"}
                            </p>
                            <p className="text-accent dark:text-muted">
                                {activeTab === "requests" && "Las nuevas solicitudes aparecerán aquí"}
                                {activeTab === "active" && "Los paseos en progreso aparecerán aquí"}
                                {activeTab === "history" && "Tus paseos completados aparecerán aquí"}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-6 grid-cols-[repeat(auto-fill,350px)] justify-center">
                        {filteredWalks.map((walk) => (
                            <WalkerWalksCardComponent 
                                key={walk.id}
                                walk={walk}
                                onAcceptWalk={handleAcceptWalk}
                                onRejectWalk={handleRejectWalk}
                                onShowWaitingPayment={handleShowWaitingPayment}
                                onStartWalk={handleStartWalk}
                                onViewWalk={handleViewWalk}
                                onFinishWalk={handleFinishWalk}
                            />
                        ))}
                    </div>
                )}

                <AcceptWalkModal 
                    isOpen={showAcceptModal}
                    onClose={handleCloseModals}
                    onConfirm={handleConfirmAccept}
                    walkData={selectedWalk}
                    isLoading={actionLoading}
                />

                <RejectWalkModal 
                    isOpen={showRejectModal}
                    onClose={handleCloseModals}
                    onConfirm={handleConfirmReject}
                    walkData={selectedWalk}
                    isLoading={actionLoading}
                />

                <WaitingPaymentModal 
                    isOpen={showWaitingPaymentModal}
                    onClose={handleCloseModals}
                    walkData={selectedWalk}
                />

                <StartWalkModal 
                    isOpen={showStartWalkModal}
                    onClose={handleCloseModals}
                    onConfirm={handleConfirmStartWalk}
                    walkData={selectedWalk}
                    isLoading={actionLoading}
                />

                <FinishWalkModal 
                    isOpen={showFinishWalkModal}
                    onClose={handleCloseModals}
                    onConfirm={handleConfirmFinishWalk}
                    walkData={selectedWalk}
                    isLoading={actionLoading}
                />

            </div>
        </div>
    );
};

export default WalkerWalks;