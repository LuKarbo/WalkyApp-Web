import { useState } from "react";
import WalkMap from "../Components/WalkMap";
import WalkData from "../Components/WalkData";
import WalkChat from "../Components/WalkChat";

const WalkView = ({ id }) => {

    console.log('Parámetro recibido:', id);
    const { tripId } = id || {};
    console.log('Trip ID extraído:', tripId);

    const [records, setRecords] = useState(() => {
        const saved = localStorage.getItem("records");
        return saved ? JSON.parse(saved) : [];
    }); //registros del recorrido

    const handlePointAdded = (record) => {
        setRecords((prev) => {
            const updated = [...prev, record];
            localStorage.setItem("records", JSON.stringify(updated)); //guardo punto de seguimiento
            return updated;
        });
    };

    const handleClearRecords = () => {
        setRecords([]);
        localStorage.removeItem("records");
    };

    return (
        <div className="w-full h-full p-6 bg-background dark:bg-foreground overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        ID: {tripId}
                    </p>
                </div>
            </div>

            <div className="mx-auto px-4 py-8 min-h-[80vh] grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Chat */}
                <WalkChat />

                {/* WalkMap + WalkData */}
                <div className="md:col-span-2 flex flex-col gap-4 h-full">
                    <WalkMap onPointAdded={handlePointAdded} onClear={handleClearRecords} />
                    <WalkData records={records} />
                </div>
            </div>
        </div>
    );
};

export default WalkView;