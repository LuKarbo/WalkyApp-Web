import { useState, useEffect, useCallback } from "react";
import { WalkerController } from "../../../BackEnd/Controllers/WalkerController";
import { ReviewsController } from "../../../BackEnd/Controllers/ReviewsController";
import { useNavigation } from "../../../BackEnd/Context/NavigationContext";
import WalkerHeaderComponent from "../Components/WalkerProfileComponents/WalkerHeaderComponent";
import WalkerReviewsComponent from "../Components/WalkerProfileComponents/WalkerReviewsComponent";
import GetServiceModal from "../Modals/GetServiceModal";

const WalkerProfile = ({ id }) => {
    console.log(id);
    const { walkerId } = id || {};
    console.log(walkerId);
    const { navigateToContent } = useNavigation();
    
    const [walkerData, setWalkerData] = useState(null);
    const [loadingWalker, setLoadingWalker] = useState(true);
    const [walkerError, setWalkerError] = useState(null);
    
    const [reviewsData, setReviewsData] = useState({ reviews: [], pagination: {} });
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [reviewsError, setReviewsError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const buttonBase = "px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-sm";
    const buttonInactive = "bg-background dark:bg-foreground border border-primary text-primary hover:bg-primary hover:text-white hover:shadow-md";

    const loadWalkerData = useCallback(async () => {
        try {
            setLoadingWalker(true);
            setWalkerError(null);
            if (!walkerId) return;
            
            const data = await WalkerController.fetchWalkerProfile(walkerId);
            setWalkerData(data);
        } catch (err) {
            console.error("Error loading walker data:", err);
            setWalkerError("Error al cargar la información del paseador.");
        } finally {
            setLoadingWalker(false);
        }
    }, [walkerId]);

    const loadWalkerReviews = useCallback(async (page = 1, search = "") => {
        try {
            setLoadingReviews(true);
            setReviewsError(null);
            if (!walkerId) return;
            
            const data = await ReviewsController.fetchReviewsByWalker(walkerId, page, 6, search);
            setReviewsData(data);
        } catch (err) {
            console.error("Error loading walker reviews:", err);
            setReviewsError("Error al cargar las reseñas del paseador.");
        } finally {
            setLoadingReviews(false);
        }
    }, [walkerId]);

    useEffect(() => {
        loadWalkerData();
    }, [loadWalkerData]);

    useEffect(() => {
        loadWalkerReviews(currentPage, searchTerm);
    }, [loadWalkerReviews, currentPage, searchTerm]);

    const handleSearch = (search) => {
        setSearchTerm(search);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleBackToWalkers = () => {
        navigateToContent('home');
    };

    const handleRequestWalk = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleRequestSent = () => {
        console.log('Solicitud de paseo enviada exitosamente');
    };

    if (loadingWalker) {
        return (
            <div className="w-full h-full p-6 bg-background dark:bg-foreground flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                    <p className="text-foreground dark:text-background">Cargando perfil del paseador...</p>
                </div>
            </div>
        );
    }

    if (walkerError || !walkerData) {
        return (
            <div className="w-full h-full p-6 bg-background dark:bg-foreground flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 mb-4">{walkerError || "Paseador no encontrado"}</p>
                    <button 
                        onClick={handleBackToWalkers}
                        className={`${buttonBase} ${buttonInactive}`}
                    >
                        Volver a los paseadores
                    </button>
                </div>
            </div>
        );
    }

    const averageRating = reviewsData.reviews.length > 0 
        ? (reviewsData.reviews.reduce((sum, review) => sum + review.rating, 0) / reviewsData.reviews.length).toFixed(1)
        : walkerData.rating;

    return (
        <div className="w-full h-full p-6 bg-background dark:bg-foreground">
            <WalkerHeaderComponent
                walkerData={walkerData}
                averageRating={averageRating}
                reviewsCount={reviewsData.reviews.length}
                onRequestWalk={handleRequestWalk}
            />

            <WalkerReviewsComponent
                reviewsData={reviewsData}
                loadingReviews={loadingReviews}
                reviewsError={reviewsError}
                searchTerm={searchTerm}
                currentPage={currentPage}
                onSearchChange={handleSearch}
                onPageChange={handlePageChange}
            />

            <GetServiceModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                walker={{
                    id: walkerData.id,
                    name: walkerData.fullName,
                    image: walkerData.profileImage,
                    location: walkerData.location,
                    verified: walkerData.verified,
                    experience: `${walkerData.experienceYears} años de experiencia`,
                    pricePerPet: walkerData.pricePerPet || 15000,
                    hasGPSTracking: walkerData.hasGPSTracking || true
                }}
                onRequestSent={handleRequestSent}
            />
        </div>
    );
};

export default WalkerProfile;