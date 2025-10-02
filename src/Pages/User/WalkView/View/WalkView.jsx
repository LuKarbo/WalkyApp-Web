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
        <div className="w-full h-full bg-background dark:bg-foreground p-6">
            <div className="max-h-[850px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
                    
                    <div className="lg:col-span-3 h-full overflow-hidden">
                        <div className="h-full overflow-y-auto">
                            <WalkChat tripId={tripId} walkStatus={walkData?.status} />
                        </div>
                    </div>
                    
                    <div className="lg:col-span-9 flex flex-col gap-6 h-full">
                        
                        <div className="flex-[3]">
                            <div className="">
                                <WalkMap
                                    tripId={tripId}
                                    walkStatus={walkData?.status}
                                />
                            </div>
                        </div>
                        
                        <div className="flex-[2]">
                            <div className="">
                                <WalkData
                                    tripId={tripId}
                                    walkStatus={walkData?.status}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalkView;