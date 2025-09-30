import { useState, useEffect, useCallback } from "react";
import { useUser } from "../../../BackEnd/Context/UserContext";
import { WalksController } from "../../../BackEnd/Controllers/WalksController"
import { PetsController } from "../../../BackEnd/Controllers/PetsController";
import { ReviewsController } from "../../../BackEnd/Controllers/ReviewsController";
import { UserController } from "../../../BackEnd/Controllers/UserController";
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
    
    // Estados para mascotas
    const [pets, setPets] = useState([]);
    const [loadingPets, setLoadingPets] = useState(true);
    const [petsError, setPetsError] = useState(null);
    
    // Estados para reviews
    const [reviewsData, setReviewsData] = useState({ reviews: [], pagination: {} });
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [reviewsError, setReviewsError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    
    const [userProfileData, setUserProfileData] = useState({});
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const { navigateToContent } = useNavigation();
    const user = useUser();

    const loadUserProfile = useCallback(async () => {
        try {
            if (!user?.id) return;
            
            const fullProfile = await UserController.fetchUserProfile(user.id);
            
            setUserProfileData({
                id: fullProfile.id,
                name: fullProfile.fullName || "X",
                email: fullProfile.email || "sin-email@example.com",
                avatar: fullProfile.profileImage || "X",
                joinedDate: fullProfile.createdAt || new Date().toISOString(),
                rol: fullProfile.role || "No disponible",
                contact: fullProfile.phone || "No disponible",
                suscription: user?.suscription || "No Disponible",
                location: fullProfile.location || "No disponible"
            });
        } catch (error) {
            console.error("Error loading user profile:", error);
            setUserProfileData({
                id: user?.id,
                name: user?.fullName || "X",
                email: user?.email || "sin-email@example.com",
                avatar: user?.profileImage || "X",
                joinedDate: user?.createdAt || new Date().toISOString(),
                rol: user?.role || "No disponible",
                contact: user?.phone || "No disponible",
                suscription: user?.suscription || "No Disponible",
                location: user?.location || "No disponible"
            });
        }
    }, [user]);

    useEffect(() => {
        loadUserProfile();
    }, [user, refreshTrigger, loadUserProfile]);

    const buttonBase = "px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-sm";
    const buttonActive = "bg-primary text-white shadow-md";
    const buttonInactive = "bg-background dark:bg-foreground border border-primary text-primary hover:bg-primary hover:text-white hover:shadow-md";

    const loadTrips = useCallback(async () => {
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
    }, [user?.id]);

    const loadPets = useCallback(async () => {
        try {
            setLoadingPets(true);
            setPetsError(null);
            if (!user?.id) return;
            const data = await PetsController.fetchPetsByOwner(user.id);
            setPets(data);
        } catch (err) {
            console.error(err);
            setPetsError("Error al cargar las mascotas.");
        } finally {
            setLoadingPets(false);
        }
    }, [user?.id]);

    const loadReviews = useCallback(async (page = 1, search = "") => {
        try {
            setLoadingReviews(true);
            setReviewsError(null);
            if (!user?.id) return;
            const data = await ReviewsController.fetchReviewsByUser(user.id, page, 6, search);
            setReviewsData(data);
        } catch (err) {
            console.error(err);
            setReviewsError("Error al cargar las reseñas.");
        } finally {
            setLoadingReviews(false);
        }
    }, [user?.id]);

    useEffect(() => {
        loadTrips();
    }, [loadTrips, refreshTrigger]);

    useEffect(() => {
        loadPets();
    }, [loadPets, refreshTrigger]);

    useEffect(() => {
        loadReviews(currentPage, searchTerm);
    }, [loadReviews, refreshTrigger, currentPage, searchTerm]);

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

    const handleUpdateProfile = async (updatedData) => {
        try {
            await UserController.updateUserProfile(user.id, updatedData);
            
            setRefreshTrigger(prev => prev + 1);
            
            alert("Perfil actualizado correctamente");
        } catch (error) {
            console.error("Error al actualizar perfil:", error);
            alert(`Error al actualizar el perfil: ${error.message}`);
        }
    };

    const handleAddPet = async (petData) => {
        try {
            await PetsController.createPet(user.id, petData);
            setRefreshTrigger(prev => prev + 1);
            alert("Mascota agregada correctamente");
        } catch (error) {
            console.error("Error al agregar mascota:", error);
            alert(`Error al agregar la mascota: ${error.message}`);
        }
    };

    const handleEditPet = async (petId, petData) => {
        try {
            await PetsController.updatePet(petId, petData);
            setRefreshTrigger(prev => prev + 1);
            alert("Mascota actualizada correctamente");
        } catch (error) {
            console.error("Error al actualizar mascota:", error);
            alert(`Error al actualizar la mascota: ${error.message}`);
        }
    };

    const handleDeletePet = async (petId) => {
        try {
            await PetsController.deletePet(petId);
            setRefreshTrigger(prev => prev + 1);
            alert("Mascota eliminada correctamente");
        } catch (error) {
            console.error("Error al eliminar mascota:", error);
        }
    };

    const handleEditReview = async (reviewId, reviewData) => {
        try {
            await ReviewsController.updateReview(reviewId, reviewData);
            setRefreshTrigger(prev => prev + 1);
            alert("Reseña actualizada correctamente");
        } catch (error) {
            console.error("Error al actualizar reseña:", error);
            alert(`Error al actualizar la reseña: ${error.message}`);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = (search) => {
        setSearchTerm(search);
        setCurrentPage(1);
    };

    return (
        <div className="w-full min-h-screen p-6 bg-background dark:bg-foreground">
            <HeaderComponent 
                userData={userProfileData} 
                buttonBase={buttonBase} 
                buttonInactive={buttonInactive}
                onUpdateProfile={handleUpdateProfile}
                userId={user?.id}
            />
            <PersonalDetailsComponent userData={userProfileData} />

            {user.role === "client" && (
                <>
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
                            onView={(tripId) => navigateToContent("trip", { tripId })}
                            tripsError={tripsError}
                            tripsLoading={loadingTrips}
                        />
                    )}

                    {activeTab === "pets" && (
                        <PetsComponent
                            pets={pets}
                            addButtonClass={`${buttonBase} ${buttonInactive}`}
                            onAddPet={handleAddPet}
                            onEditPet={handleEditPet}
                            onDeletePet={handleDeletePet}
                            isLoading={loadingPets}
                            error={petsError}
                        />
                    )}

                    {activeTab === "reviews" && (
                        <ReviewsComponent
                            reviewsData={reviewsData}
                            onEditReview={handleEditReview}
                            onPageChange={handlePageChange}
                            onSearch={handleSearch}
                            isLoading={loadingReviews}
                            error={reviewsError}
                        />
                    )}
                </>
            )}

        </div>
    );
};

export default MyProfile;