import { useState } from "react";
import { format } from "date-fns";

const TripsComponent = ({ trips, onCancel, onView, tripsError, tripsLoading }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const tripsPerPage = 5;

    const displayedTrips = trips.slice(0, 10);
    const totalPages = Math.ceil(displayedTrips.length / tripsPerPage);
    const paginatedTrips = displayedTrips.slice(
        (currentPage - 1) * tripsPerPage,
        currentPage * tripsPerPage
    );

    const getStatusClasses = (status) => {
        switch (status) {
            case "Waiting":
            case "Scheduled":
                return "bg-warning/70 text-black";
            case "Completed":
                return "bg-success/70 text-black";
            case "Active":
                return "bg-info/70 text-black";
            case "Cancelled":
                return "bg-danger/70 text-black";
            default:
                return "bg-neutral/70 text-black";
        }
    };

    if (tripsError) {
        return (
            <div className="bg-background dark:bg-foreground rounded-xl shadow-xl overflow-hidden border border-border dark:border-muted p-4 text-red-600 font-semibold">
                Error al cargar los viajes: {tripsError}
            </div>
        );
    }

    if (tripsLoading) {
        return (
            <div className="bg-background dark:bg-foreground rounded-xl shadow-xl overflow-hidden border border-border dark:border-muted p-4">
                Cargando Paseos...
            </div>
        );
    }

    return (
        <div className="bg-foreground-userProfile p-6 rounded-lg shadow-lg mb-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground dark:text-background">
                    Mis Paseos
                </h3>
            </div>
            
            <div className="bg-background dark:bg-foreground rounded-xl shadow-xl overflow-hidden border border-border dark:border-muted">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-foreground2">
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
                            {paginatedTrips.map((trip) => (
                                <tr
                                    key={trip.id}
                                    className="transition-colors duration-200 bg-background dark:bg-foreground hover:bg-muted/30 dark:hover:bg-accent/30"
                                >
                                    <td className="px-6 py-4 font-medium text-foreground dark:text-background">
                                        {trip.id}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                                                <span className="text-primary font-bold">{trip.dogName[0]}</span>
                                            </div>
                                            <span className="font-medium text-foreground dark:text-background">
                                                {trip.dogName}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-foreground dark:text-background">
                                        {trip.walkerName}
                                    </td>
                                    <td className="px-6 py-4 text-foreground dark:text-background">
                                        {format(new Date(trip.startTime), "MMM d, yyyy h:mm a")}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusClasses(trip.status)}`}
                                        >
                                            {trip.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-3">
                                            <button
                                                onClick={() => onView(trip.id)}
                                                className="px-3 py-1 text-sm rounded-lg border border-info text-info hover:bg-info hover:text-black transition-colors duration-200"
                                            >
                                                Ver
                                            </button>
                                            {(trip.status === "Waiting" || trip.status === "Scheduled") && (
                                                <button
                                                    onClick={() => onCancel(trip.id)}
                                                    className="px-3 py-1 text-sm rounded-lg border border-danger text-danger hover:bg-danger hover:text-black transition-colors duration-200"
                                                >
                                                    Cancelar
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-4 flex justify-center space-x-2">
                    <button
                        className="px-3 py-1 border rounded disabled:opacity-50"
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Anterior
                    </button>
                    <span className="px-3 py-1">{currentPage} / {totalPages}</span>
                    <button
                        className="px-3 py-1 border rounded disabled:opacity-50"
                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    );
};

export default TripsComponent;
