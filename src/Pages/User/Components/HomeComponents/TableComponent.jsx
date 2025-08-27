import { format } from "date-fns";
import { useNavigation } from "../../../../BackEnd/Context/NavigationContext";

const TableComponent = ({ trips }) => {
    const { navigateToContent } = useNavigation();

    const handleViewTrip = (tripId) => {
        navigateToContent('trip', { tripId });
    };

    const handleMyTrips = () => {
        navigateToContent('my-walks');
    };

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-foreground dark:text-background">
                    Mis paseos activos
                    <span className="text-lg font-normal text-accent dark:text-muted ml-2">
                        (limitado a 5)
                    </span>
                </h2>
                <button 
                    onClick={handleMyTrips}
                    className="px-4 py-2 text-sm bg-primary text-white rounded-lg shadow-md hover:bg-primary/90 transition-all duration-300 btn-hover"
                >
                    Ver todos
                </button>
            </div>

            {/* Table */}
            <div className="bg-card dark:bg-accent rounded-xl shadow-xl overflow-hidden border border-border dark:border-muted">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-accent dark:bg-foreground2">
                            <tr>
                                {["Trip ID", "Dog Name", "Walker", "Start Time", "Status", "Actions"].map((col) => (
                                <th
                                    key={col}
                                    className="px-6 py-3 text-left font-semibold text-white uppercase tracking-wider text-xs"
                                >
                                    {col}
                                </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                        {trips.map((trip, index) => (
                            <tr
                                key={trip.id}
                                className={`transition-colors duration-200 bg-white dark:bg-background hover:bg-muted/90`}
                            >
                            {/* Trip ID */}
                            <td className="px-6 py-4 font-medium text-foreground dark:text-foreground">
                                {trip.id}
                            </td>

                            {/* Dog Name */}
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-primary font-bold">{trip.dogName[0]}</span>
                                    </div>
                                    <span className="font-medium text-foreground dark:text-foreground">
                                        {trip.dogName}
                                    </span>
                                </div>
                            </td>

                            {/* Walker */}
                            <td className="px-6 py-4 text-foreground dark:text-foreground">
                                {trip.walker}
                            </td>

                            {/* Start Time */}
                            <td className="px-6 py-4 text-foreground dark:text-foreground">
                                {format(new Date(trip.startTime), "MMM d, yyyy h:mm a")}
                            </td>

                            {/* Status */}
                            <td className="px-6 py-4">
                                <span
                                    className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                                        trip.status === "Active"
                                        ? "bg-success/20 text-success"
                                        : trip.status === "Completed"
                                        ? "bg-neutral/20 text-neutral"
                                        : "bg-warning/20 text-warning"
                                    }`}
                                >
                                {trip.status}
                                </span>
                            </td>

                            {/* Actions */}
                                <td className="px-6 py-4">
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => handleViewTrip(trip.id)}
                                            className="px-3 py-1 text-sm rounded-lg border border-info/40 text-info hover:bg-info/10 transition-colors duration-200"
                                        >
                                            Ver
                                        </button>
                                        <button
                                            className="px-3 py-1 text-sm rounded-lg border border-danger/40 text-danger hover:bg-danger/10 transition-colors duration-200"
                                        >
                                            Cancelar
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
