
const WalkView = ({ id }) => {
    console.log('Parámetro recibido:', id);
    
    const { tripId } = id || {};
    console.log('Trip ID extraído:', tripId);


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
        </div>
    );
};

export default WalkView;