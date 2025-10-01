import { useState, useEffect } from "react";
import WalkMap from "../Components/WalkMap";
import WalkData from "../Components/WalkData";
import WalkChat from "../Components/WalkChat";
import { WalksController } from "../../../../BackEnd/Controllers/WalksController";

const WalkView = ({ id }) => {
    console.log('Parámetro recibido:', id);
    const { tripId } = id || {};
    console.log('Trip ID extraído:', tripId);

    const [walkData, setWalkData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Cargar datos del paseo
    useEffect(() => {
        const loadWalkData = async () => {
            if (!tripId) {
                setLoading(false);
                return;
            }

            try {
                const data = await WalksController.fetchWalkDetails(tripId);
                setWalkData(data);
            } catch (error) {
                console.error('Error cargando datos del paseo:', error);
            } finally {
                setLoading(false);
            }
        };

        loadWalkData();
    }, [tripId]);

    if (loading) {
        return (
            <div className="w-full h-full p-6 bg-background dark:bg-foreground overflow-y-auto">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mr-4"></div>
                    <p className="text-lg text-foreground dark:text-background">Cargando datos del paseo...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full p-6 bg-background dark:bg-foreground overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        ID: {tripId}
                    </p>
                    {walkData && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Estado: {walkData.status}
                        </p>
                    )}
                </div>
            </div>

            <div className="mx-auto px-4 py-8 min-h-[80vh] grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Chat Component */}
                <WalkChat tripId={tripId} walkStatus={walkData?.status} />

                {/* WalkMap + WalkData */}
                <div className="md:col-span-2 flex flex-col gap-4 h-full">
                    <WalkMap
                        tripId={tripId}
                        walkStatus={walkData?.status}
                    />
                    <WalkData
                        tripId={tripId}
                        walkStatus={walkData?.status}
                    />
                </div>
            </div>
        </div>
    );
};

export default WalkView;