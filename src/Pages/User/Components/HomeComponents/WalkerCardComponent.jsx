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
            <h2 className="text-2xl font-bold mb-4 text-foreground dark:text-background">
                Best Dog Walkers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {walkers.map((walker) => (
                    <div
                        key={walker.id}
                        className={`bg-card dark:bg-accent rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                            walker.isPlaceholder 
                                ? 'border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10' 
                                : ''
                        }`}
                    >
                        <img
                            src={walker.image}
                            alt={walker.name || walker.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            {walker.isPlaceholder ? (
                                <div className="text-center">
                                    <h3 className="font-bold text-lg text-primary mb-2">
                                        {walker.title}
                                    </h3>
                                    <p className="text-accent dark:text-muted font-medium mb-2">
                                        {walker.subtitle}
                                    </p>
                                    <p className="text-sm text-foreground dark:text-background mb-4">
                                        {walker.description}
                                    </p>
                                    <button 
                                        onClick={() => handleJoinToUs()}
                                        className="w-full bg-gradient-to-r from-primary to-primary/80 text-white py-2 rounded-md hover:from-primary/90 hover:to-primary/70 transition-all duration-300">
                                        Únete Ahora
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h3 className="font-bold text-lg text-foreground dark:text-background">
                                        {walker.name}
                                    </h3>
                                    <div className="flex items-center text-yellow-400 mb-1">
                                        <AiOutlineStar />
                                        <span className="ml-1">{walker.rating}</span>
                                    </div>
                                    <p className="text-accent dark:text-muted">
                                        {walker.experience} experience
                                    </p>
                                    <p className="text-accent dark:text-muted mb-3">
                                        {walker.specialties}
                                    </p>

                                    <div className="flex gap-3">
                                        <button 
                                            onClick={() => handleRequestWalk(walker.id)}
                                            className="w-full bg-primary text-white py-2 rounded-md hover:bg-opacity-90 transition-all duration-300"
                                        >
                                            Solicitar Paseo
                                        </button>
                                        <button 
                                            onClick={() => handleViewProfile(walker.id)}
                                            className="w-full bg-info text-white py-2 rounded-md hover:bg-opacity-90 transition-all duration-300"
                                        >
                                            Ver Perfil
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WalkerCardComponent;