import { format } from "date-fns";
import { useNavigation } from "../../../../BackEnd/Context/NavigationContext";

const TableComponent = ({ trips }) => {

    const { navigateToContent } = useNavigation();

    const handleViewTrip = (tripId) => {
        navigateToContent('trip', { tripId });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-foreground dark:text-background">
                    Mis viajes activos 
                    <span className="text-lg font-normal text-accent dark:text-muted ml-2">
                        (limitado a 5)
                    </span>
                </h2>
                <button className="px-4 py-2 text-sm bg-primary/10 text-black hover:bg-primary/20 rounded-lg transition-colors duration-300 border border-primary/20">
                    Ir a mis viajes
                </button>
            </div>
            
            <div className="bg-card dark:bg-accent rounded-xl shadow-lg overflow-hidden border border-border dark:border-muted">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground dark:text-background uppercase tracking-wider">
                                    Trip ID
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground dark:text-background uppercase tracking-wider">
                                    Dog Name
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground dark:text-background uppercase tracking-wider">
                                    Walker
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground dark:text-background uppercase tracking-wider">
                                    Start Time
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground dark:text-background uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground dark:text-background uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border dark:divide-muted">
                            {trips.map((trip, index) => (
                                <tr 
                                    key={trip.id} 
                                    className={`hover:bg-muted/50 dark:hover:bg-foreground/10 transition-colors duration-200 ${
                                        index % 2 === 0 ? 'bg-background/50 dark:bg-foreground/5' : ''
                                    }`}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-foreground dark:text-background">
                                            {trip.id}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                                                <span className="text-primary text-sm font-bold">
                                                    {trip.dogName[0]}
                                                </span>
                                            </div>
                                            <div className="text-sm font-medium text-foreground dark:text-background">
                                                {trip.dogName}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground dark:text-background">
                                        {trip.walker}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground dark:text-background">
                                        {format(new Date(trip.startTime), "MMM d, yyyy h:mm a")}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                                                trip.status === "Active" 
                                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                                                    : trip.status === "Completed" 
                                                    ? "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400" 
                                                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                            }`}
                                        >
                                            {trip.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="flex space-x-3">
                                            <button 
                                                onClick={() => handleViewTrip(trip.id)}
                                                className="text-primary hover:text-primary/80 font-medium transition-colors duration-200">
                                                View
                                            </button>
                                            <button className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors duration-200">
                                                Cancel
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TableComponent;