import { AiOutlineStar } from "react-icons/ai";
import { useNavigation } from "../../../../BackEnd/Context/NavigationContext";

const WalkerCardComponent = ({ walkers }) => {
    
    const { navigateToContent } = useNavigation();
    
    // ver perfil del paseador seleccionado
    const handleViewProfile = (walkerId) => {
        console.log('navigateToContent');
        navigateToContent('walker-profile', { walkerId });
    };

    // solicitar paseo al paseador seleccionado
    const handleRequestWalk = (walkerId) => {
        navigateToContent('request-walk', { walkerId });
    };

    // formulario de joinTous
    const handleJoinToUs = () => {
        console.log();
        navigateToContent('join-to-us');
    };

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-foreground dark:text-background">
                Best Dog Walkers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                {walkers.map((walker) => (
                    <div
                        key={walker.id}
                        className={`group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${
                            walker.isPlaceholder 
                                ? 'bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-dashed border-primary/40 shadow-lg' 
                                : 'bg-gradient-to-br from-primary/10 via-primary/5 to-transparent shadow-lg border border-primary/20'
                        }`}
                    >
                        {/* Image with overlay gradient */}
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={walker.image}
                                alt={walker.name || walker.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            {!walker.isPlaceholder && (
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            )}
                            
                            {/* Rating badge - only for real walkers */}
                            {!walker.isPlaceholder && (
                                <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                                    <AiOutlineStar className="text-yellow-red text-sm" />
                                    <span className="text-sm font-semibold text-foreground dark:text-white">
                                        {walker.rating}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="p-5">
                            {walker.isPlaceholder ? (
                                <div className="text-center space-y-4">
                                    <div className="space-y-2">
                                        <h3 className="font-bold text-xl text-primary mb-1">
                                            {walker.title}
                                        </h3>
                                        <p className="text-accent dark:text-muted font-medium text-sm">
                                            {walker.subtitle}
                                        </p>
                                    </div>
                                    <p className="text-sm text-foreground/80 dark:text-background/80 leading-relaxed">
                                        {walker.description}
                                    </p>
                                    <button 
                                        onClick={() => handleJoinToUs()}
                                        className="w-full bg-gradient-to-r from-primary to-success text-white py-3 rounded-xl font-semibold hover:from-primary/90 hover:to-success/90 transform hover:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl">
                                        🚀 Únete Ahora
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {/* Walker info */}
                                    <div className="space-y-2">
                                        <h3 className="font-bold text-lg text-foreground dark:text-background leading-tight">
                                            {walker.name}
                                        </h3>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-accent dark:text-muted font-medium">
                                                {walker.experience}
                                            </span>
                                        </div>
                                        <p className="text-accent dark:text-muted text-sm leading-relaxed">
                                            {walker.specialties}
                                        </p>
                                    </div>

                                    {/* Action buttons */}
                                    <div className="flex flex-col gap-2 pt-2">
                                        <button 
                                            onClick={() => handleRequestWalk(walker.id)}
                                            className="w-full bg-background dark:bg-foreground border border-primary text-primary hover:bg-primary hover:text-white py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
                                        >
                                            Solicitar Paseo
                                        </button>
                                        <button 
                                            onClick={() => handleViewProfile(walker.id)}
                                            className="w-full bg-background dark:bg-foreground border border-primary text-primary hover:bg-primary hover:text-white py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
                                        >
                                            Ver Perfil
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Decorative elements for placeholder card */}
                        {walker.isPlaceholder && (
                            <>
                                <div className="absolute top-4 left-4 w-8 h-8 bg-primary/20 rounded-full animate-pulse" />
                                <div className="absolute bottom-4 right-4 w-6 h-6 bg-success/20 rounded-full animate-pulse delay-300" />
                                <div className="absolute top-1/2 right-4 w-4 h-4 bg-warning/20 rounded-full animate-pulse delay-700" />
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WalkerCardComponent;