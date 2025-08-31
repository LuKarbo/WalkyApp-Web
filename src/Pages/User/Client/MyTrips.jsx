import React, { useState, useEffect } from "react";
import { FiCalendar } from "react-icons/fi";
import { WalksController } from '../../../BackEnd/Controllers/WalksController';
import { WalkerController } from '../../../BackEnd/Controllers/WalkerController';
import { PetsController } from '../../../BackEnd/Controllers/PetsController';
import { useUser } from '../../../BackEnd/Context/UserContext';
import { useNavigation } from '../../../BackEnd/Context/NavigationContext';

import MyTripsHeaderComponent from '../Components/MyTripsComponents/MyTripsHeaderComponent';
import MyTripsCardComponent from '../Components/MyTripsComponents/MyTripsCardComponent';
import MyTripsFilter from '../Filters/MyTrips/MyTripsFilter';
import GetServiceModal_Client from '../Modals/MyTrips/GetServiceModal_Client';

const MyTrips = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("active");
    const [searchQuery, setSearchQuery] = useState("");
    const [showCreateForm, setShowCreateForm] = useState(false);
    
    const [walkers, setWalkers] = useState([]);
    const [pets, setPets] = useState([]);
    const [selectedWalker, setSelectedWalker] = useState(null);
    const [selectedPets, setSelectedPets] = useState([]);
    const [walkDate, setWalkDate] = useState('');
    const [walkTime, setWalkTime] = useState('');
    const [description, setDescription] = useState('');
    const [loadingModal, setLoadingModal] = useState(false);
    const [loadingWalkers, setLoadingWalkers] = useState(false);
    const [loadingPets, setLoadingPets] = useState(false);

    const user = useUser();
    const userId = user?.id;
    const { navigateToContent } = useNavigation();

    useEffect(() => {
        const loadTrips = async () => {
            if (!userId) return;
            
            try {
                setLoading(true);
                setError(null);
                
                const tripsData = await WalksController.fetchWalksByOwner(userId);
                setTrips(tripsData);
            } catch (err) {
                setError('Error loading trips: ' + err.message);
                console.error('Error loading trips:', err);
            } finally {
                setLoading(false);
            }
        };

        loadTrips();
    }, [userId]);

    useEffect(() => {
        if (showCreateForm && userId) {
            loadModalData();
        }
    }, [showCreateForm, userId]);

    const loadModalData = async () => {
        try {
            setLoadingWalkers(true);
            setLoadingPets(true);
            
            const [walkersData, petsData] = await Promise.all([
                WalkerController.fetchWalkersForHome(),
                PetsController.fetchPetsByOwner(userId)
            ]);
            
            const realWalkers = walkersData.filter(walker => !walker.isPlaceholder);
            setWalkers(realWalkers);
            setPets(petsData);
        } catch (err) {
            setError('Error loading modal data: ' + err.message);
        } finally {
            setLoadingWalkers(false);
            setLoadingPets(false);
        }
    };

    const handleCreateTrip = async (e) => {
        e.preventDefault();
        
        if (!selectedWalker) {
            setError('Debe seleccionar un paseador');
            return;
        }
        
        if (selectedPets.length === 0) {
            setError('Debe seleccionar al menos una mascota');
            return;
        }

        if (!walkDate || !walkTime) {
            setError('Debe seleccionar fecha y hora');
            return;
        }

        try {
            setLoadingModal(true);
            setError(null);

            const walkRequest = {
                walkerId: selectedWalker.id,
                ownerId: userId,
                petIds: selectedPets,
                scheduledDateTime: `${walkDate}T${walkTime}`,
                description: description,
                totalPrice: selectedPets.length * (selectedWalker.pricePerPet || 15000),
                status: 'Waiting'
            };

            const createdTrip = await WalksController.createWalkRequest(walkRequest);
            
            const newTrip = {
                id: createdTrip.id,
                dogName: selectedPets.map(petId => pets.find(p => p.id === petId)?.name).join(', '),
                walker: selectedWalker.name,
                startTime: walkRequest.scheduledDateTime,
                endTime: null,
                status: 'Waiting',
                duration: null,
                distance: null,
                notes: description
            };
            
            setTrips([newTrip, ...trips]);
            handleCloseModal();
        } catch (err) {
            setError('Error creating trip: ' + err.message);
        } finally {
            setLoadingModal(false);
        }
    };

    const handleCloseModal = () => {
        setShowCreateForm(false);
        setSelectedWalker(null);
        setSelectedPets([]);
        setWalkDate('');
        setWalkTime('');
        setDescription('');
        setError(null);
    };

    const handleDeleteTrip = async (tripId) => {
        try {
            await WalksController.updateWalkStatus(tripId, 'Cancelled');
            setTrips(trips.filter((trip) => trip.id !== tripId));
        } catch (err) {
            setError('Error cancelling trip: ' + err.message);
        }
    };

    const handleViewTrip = (tripId) => {
        navigateToContent('trip', { tripId });
    };

    const handlePetSelection = (petId) => {
        setSelectedPets(prev => 
            prev.includes(petId) 
                ? prev.filter(id => id !== petId)
                : [...prev, petId]
        );
    };

    const filteredTrips = trips.filter((trip) => {
        const isActive = activeTab === "active" ?
            ["Waiting", "Scheduled", "Active"].includes(trip.status) :
            ["Cancelled", "Completed"].includes(trip.status);

        const matchesSearch = trip.dogName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                trip.walker?.toLowerCase().includes(searchQuery.toLowerCase());

        return isActive && matchesSearch;
    });

    const activeTripsCount = trips.filter(trip => 
        ["Waiting", "Scheduled", "Active"].includes(trip.status)
    ).length;

    const completedTripsCount = trips.filter(trip => 
        ["Cancelled", "Completed"].includes(trip.status)
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

    if (error && !showCreateForm) {
        return (
            <div className="w-full h-full p-6 bg-background dark:bg-foreground">
                <div className="flex justify-center items-center h-64">
                    <p className="text-lg text-danger">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 bg-gradient-to-br from-background via-background to-primary/5 dark:from-foreground dark:via-foreground dark:to-primary/10">
            <div className="max-w-7xl mx-auto">
                
                <MyTripsHeaderComponent 
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    setShowCreateForm={setShowCreateForm}
                    activeTripsCount={activeTripsCount}
                    completedTripsCount={completedTripsCount}
                />

                <MyTripsFilter 
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />

                {filteredTrips.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="bg-white/50 dark:bg-foreground/50 backdrop-blur-sm rounded-3xl p-12 max-w-md mx-auto shadow-xl">
                            <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FiCalendar className="text-4xl text-primary" />
                            </div>
                            <p className="text-xl font-semibold text-foreground dark:text-background mb-2">
                                {activeTab === "active" ? "No tienes paseos activos" : "No hay paseos en el historial"}
                            </p>
                            <p className="text-accent dark:text-muted">
                                {activeTab === "active" ? "¡Programa tu primer paseo!" : "Tus paseos completados aparecerán aquí"}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                        {filteredTrips.map((trip) => (
                            <MyTripsCardComponent 
                                key={trip.id}
                                trip={trip}
                                onViewTrip={handleViewTrip}
                                onDeleteTrip={handleDeleteTrip}
                            />
                        ))}
                    </div>
                )}

                <GetServiceModal_Client 
                    showCreateForm={showCreateForm}
                    onCloseModal={handleCloseModal}
                    onSubmit={handleCreateTrip}
                    error={error}
                    walkers={walkers}
                    pets={pets}
                    selectedWalker={selectedWalker}
                    setSelectedWalker={setSelectedWalker}
                    selectedPets={selectedPets}
                    onPetSelection={handlePetSelection}
                    walkDate={walkDate}
                    setWalkDate={setWalkDate}
                    walkTime={walkTime}
                    setWalkTime={setWalkTime}
                    description={description}
                    setDescription={setDescription}
                    loadingModal={loadingModal}
                    loadingWalkers={loadingWalkers}
                    loadingPets={loadingPets}
                />
            </div>
        </div>
    );
};

export default MyTrips;