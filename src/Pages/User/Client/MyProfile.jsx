import { useState, useEffect } from "react";
import { useUser } from "../../../BackEnd/Context/UserContext";
import { WalksController } from "../../../BackEnd/Controllers/WalksController"
import { useNavigation } from "../../../BackEnd/Context/NavigationContext";
import HeaderComponent from "../Components/ProfileComponents/HeaderComponent";
import PersonalDetailsComponent from "../Components/ProfileComponents/PersonalDetailsComponent";
import TripsComponent from "../Components/ProfileComponents/TripsComponent";
import PetsComponent from "../Components/ProfileComponents/PetsComponent";
import ReviewsComponent from "../Components/ProfileComponents/ReviewsComponent";

const MyProfile = () => {
    const [activeTab, setActiveTab] = useState("trips");
    const [trips, setTrips] = useState([]);
    const [loadingTrips, setLoadingTrips] = useState(true);
    const [tripsError, setTripsError] = useState(null);

    const { navigateToContent } = useNavigation();

    const user = useUser();

    const userData = {
        name: user?.fullName || "X",
        email: user?.email || "sin-email@example.com",
        avatar: user?.profileImage || "X",
        joinedDate: user?.createdAt || new Date().toISOString(),
        rol: user?.role || "No disponible",
        contact: user?.phone || "No disponible",
    };
    
    const pets = [];
    const reviews = [];


    const buttonBase = "px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-sm";
    const buttonActive = "bg-primary text-white shadow-md";
    const buttonInactive = "bg-background dark:bg-foreground border border-primary text-primary hover:bg-primary hover:text-white hover:shadow-md";

    // Cargar los trips al montar el componente
    useEffect(() => {
        const loadTrips = async () => {
            try {
                setLoadingTrips(true);
                setTripsError(null);
                if (!user?.id) return;
                const data = await WalksController.fetchWalksByOwner(user.id);
                setTrips(data.slice(0, 10));
            } catch (err) {
                console.error(err);
                setTripsError("Error al cargar los paseos.");
            } finally {
                setLoadingTrips(false);
            }
        };
        loadTrips();
    }, [user]);

    const handleCancelTrip = async (tripId) => {
    try {
        await WalksController.cancelWalk(tripId);
        setTrips((prevTrips) =>
            prevTrips.map((t) =>
                t.id === tripId ? { ...t, status: "Cancelado" } : t
            )
        );
        alert("Paseo cancelado correctamente");
    } catch (err) {
        console.error(err);
        alert("No se pudo cancelar el paseo");
    }
};

    return (
        <div className="w-full h-full p-6 bg-background dark:bg-foreground">
            <HeaderComponent userData={userData} buttonBase={buttonBase} buttonInactive={buttonInactive} />
            <PersonalDetailsComponent userData={userData} />

            <div className="flex space-x-4 mb-6">
                <button
                    onClick={() => setActiveTab("trips")}
                    className={`${buttonBase} ${activeTab === "trips" ? buttonActive : buttonInactive}`}
                >
                    Trips
                </button>
                <button
                    onClick={() => setActiveTab("pets")}
                    className={`${buttonBase} ${activeTab === "pets" ? buttonActive : buttonInactive}`}
                >
                    Pets
                </button>
                <button
                    onClick={() => setActiveTab("reviews")}
                    className={`${buttonBase} ${activeTab === "reviews" ? buttonActive : buttonInactive}`}
                >
                    Reviews
                </button>
            </div>

            {activeTab === "trips" && (
                <TripsComponent
                    trips={trips}
                    onCancel={handleCancelTrip} 
                    onView={(tripId) => navigateToContent('trip', { tripId })}
                    tripsError={tripsError}
                    tripsLoading={loadingTrips}
                />

            )}
            {activeTab === "pets" && <PetsComponent pets={pets} addButtonClass={`${buttonBase} ${buttonInactive}`} />}
            {activeTab === "reviews" && <ReviewsComponent reviews={reviews} />}
        </div>
    );
};

export default MyProfile;