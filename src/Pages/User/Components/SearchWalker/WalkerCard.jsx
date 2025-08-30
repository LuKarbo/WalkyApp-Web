import { useState } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import GetServiceModal from "../../Modals/GetServiceModal";

const WalkerCard = ({ 
    walker, 
    onViewProfile, 
    onViewReviews 
}) => {
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const StarRating = ({ rating }) => {
        return (
            <div className="flex items-center space-x-1">
                <AiOutlineStar className="text-yellow-400 text-lg" />
                <span className="text-sm font-semibold text-white">
                    {rating}
                </span>
            </div>
        );
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

    return (
        <>
            <div className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent shadow-lg border border-primary/20">

                <div className="relative h-48 overflow-hidden">
                    <img
                        src={walker.image}
                        alt={walker.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde";
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1">
                        <StarRating rating={walker.rating} />
                    </div>

                    {walker.verified && (
                        <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm rounded-full p-2">
                            <MdVerified className="text-white w-4 h-4" />
                        </div>
                    )}
                </div>

                <div className="p-5">
                    <div className="space-y-4">
                        
                        <div className="space-y-2">
                            <h3 className="font-bold text-lg text-foreground dark:text-background leading-tight">
                                {walker.name}
                            </h3>
                            <div className="flex items-center space-x-1 text-sm text-accent dark:text-muted">
                                <FaMapMarkerAlt />
                                <span>{walker.location}</span>
                            </div>
                            {walker.experience && (
                                <p className="text-accent dark:text-muted text-sm">
                                    {walker.experience}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-2 pt-2">
                            <button 
                                onClick={handleRequestWalk}
                                className="w-full bg-primary text-white py-2.5 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                                Solicitar Paseo
                            </button>
                            <div className="grid grid-cols-2 gap-2">
                                <button 
                                    onClick={() => onViewProfile(walker.id)}
                                    className="w-full bg-background dark:bg-foreground border border-primary text-primary hover:bg-primary hover:text-white py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md text-sm"
                                >
                                    Ver Perfil
                                </button>
                                <button 
                                    onClick={() => onViewReviews(walker.id)}
                                    className="w-full bg-background dark:bg-foreground border border-primary text-primary hover:bg-primary hover:text-white py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md text-sm"
                                >
                                    Reviews
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <GetServiceModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                walker={walker}
                onRequestSent={handleRequestSent}
            />
        </>
    );
};

export default WalkerCard;