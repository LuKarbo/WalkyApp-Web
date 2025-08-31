import React from "react";
import { format } from "date-fns";
import { FiCalendar, FiMapPin, FiClock, FiTrash2, FiEye } from "react-icons/fi";

const MyTripsCardComponent = ({ trip, onViewTrip, onDeleteTrip }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case "Waiting":
            case "Scheduled":
                return "bg-warning/70 text-black";
            case "Active":
                return "bg-success/70 text-black";
            case "Completed":
                return "bg-info/70 text-black";
            case "Cancelled":
                return "bg-danger/70 text-black";
            default:
                return "bg-neutral/70 text-black";
        }
    };

    const formatDistance = (distance) => {
        if (!distance) return null;
        return distance >= 1000 ? 
            `${(distance / 1000).toFixed(1)} km` : 
            `${distance} m`;
    };

    return (
        <div className="group relative overflow-hidden rounded-3xl bg-white/80 dark:bg-foreground/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-primary/10 h-full flex flex-col">
            {/* Status Badge */}
            <div className="absolute top-4 right-4 z-10">
                <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${getStatusColor(trip.status)}`}>
                    {trip.status}
                </span>
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-success/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative p-4 flex flex-col flex-1">
                {/* Header Section */}
                <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center mr-3 shadow-lg flex-shrink-0">
                        <span className="text-white font-bold text-sm">{trip.dogName?.[0] || 'P'}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-foreground dark:text-background group-hover:text-primary transition-colors duration-300 truncate">
                            {trip.dogName}
                        </h3>
                        <div className="flex items-center text-accent dark:text-muted">
                            <FiMapPin className="mr-1 flex-shrink-0" size={12} />
                            <span className="text-xs font-medium truncate">{trip.walker}</span>
                        </div>
                    </div>
                </div>

                {/* Trip Details */}
                <div className="space-y-2 mb-4 flex-1">
                    {/* Date */}
                    <div className="flex items-center p-2 bg-primary/10 rounded-lg">
                        <FiCalendar className="mr-2 text-primary flex-shrink-0" size={14} />
                        <span className="text-xs font-semibold text-foreground dark:text-background truncate">
                            {format(new Date(trip.startTime), "MMM dd, yyyy")}
                        </span>
                    </div>

                    {/* Time */}
                    <div className="flex items-center p-2 bg-success/10 rounded-lg">
                        <FiClock className="mr-2 text-success flex-shrink-0" size={14} />
                        <span className="text-xs font-semibold text-foreground dark:text-background truncate">
                            {format(new Date(trip.startTime), "h:mm a")}
                            {trip.endTime && ` - ${format(new Date(trip.endTime), "h:mm a")}`}
                        </span>
                    </div>

                    {/* Duration & Distance */}
                    {(trip.duration || trip.distance) && (
                        <div className="flex items-center p-2 bg-info/10 rounded-lg">
                            <FiMapPin className="mr-2 text-info flex-shrink-0" size={14} />
                            <span className="text-xs font-semibold text-foreground dark:text-background truncate">
                                {trip.duration && `${trip.duration} min`}
                                {trip.duration && trip.distance && ' • '}
                                {trip.distance && formatDistance(trip.distance)}
                            </span>
                        </div>
                    )}

                    {/* Notes */}
                    {trip.notes && (
                        <div className="p-2 bg-accent/10 rounded-lg">
                            <p className="text-xs text-accent dark:text-muted italic line-clamp-2">
                                "{trip.notes}"
                            </p>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-auto">
                    <button
                        onClick={() => onViewTrip(trip.id)}
                        className="flex-1 flex items-center justify-center px-3 py-2 text-xs font-semibold rounded-lg border-2 border-info text-info hover:bg-info hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        <FiEye className="mr-1" size={12} />
                        Ver
                    </button>
                    {(trip.status === "Waiting" || trip.status === "Scheduled") && (
                        <button
                            onClick={() => onDeleteTrip(trip.id)}
                            className="p-2 text-xs font-semibold rounded-lg border-2 border-danger text-danger hover:bg-danger hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            <FiTrash2 size={12} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyTripsCardComponent;