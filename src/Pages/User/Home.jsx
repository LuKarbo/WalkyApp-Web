import { useState, useEffect } from 'react';
import BannerHomeComponent from './Components/HomeComponents/BannerHomeComponent';
import WalkerCardComponent from './Components/HomeComponents/WalkerCardComponent';
import TableComponent from './Components/HomeComponents/TableComponent';
import { WalkerController } from '../../BackEnd/Controllers/WalkerController';
import { WalksController } from '../../BackEnd/Controllers/WalksController';
import { useUser } from '../../BackEnd/Context/UserContext';

const Home = ({ navigateToContent }) => {
    const [walkers, setWalkers] = useState([]);
    const [walks, setWalks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    // Cargar datos al montar el componente
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const [walkersData, walksData] = await Promise.all([
                    WalkerController.fetchWalkersForHome(),
                    WalksController.fetchWalksByOwner(userId)
                ]);
                
                setWalkers(walkersData);
                setWalks(walksData);
            } catch (err) {
                setError('Error loading data: ' + err.message);
                console.error('Error loading data:', err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) {
        return (
            <div className="w-full h-full p-6 bg-background dark:bg-foreground">
                <div className="flex justify-center items-center h-64">
                    <p className="text-lg">Loading data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-full p-6 bg-background dark:bg-foreground">
                <div className="flex justify-center items-center h-64">
                    <p className="text-lg text-red-500">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full p-6 bg-background dark:bg-foreground">
            {/* Banner de anuncios */}
            <BannerHomeComponent 
                announcements={announcements} 
                navigateToContent={navigateToContent}
            />

            {/* Sección de mejores paseadores */}
            <WalkerCardComponent 
                walkers={walkers} 
                navigateToContent={navigateToContent}
            />

            {/* Tabla de walks/paseos activos */}
            <TableComponent 
                trips={walks} 
                navigateToContent={navigateToContent}
            />
        </div>
    );
};

export default Home;