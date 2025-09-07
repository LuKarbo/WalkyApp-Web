import { format } from "date-fns";
import { FiCalendar, FiMapPin, FiClock, FiEye, FiCheck, FiX, FiInfo, FiPlay, FiCheckCircle } from "react-icons/fi";

const WalkerWalksCardComponent = ({ 
    walk, 
    onAcceptWalk, 
    onRejectWalk, 
    onShowWaitingPayment, 
    onStartWalk, 
    onViewWalk,
    onFinishWalk
}) => {
    const getStatusColor = (status) => {
        switch (status) {
            case "Solicitado":
                return "bg-blue-500/70 text-white";
            case "Esperando pago":
                return "bg-orange-500/70 text-white";
            case "Agendado":
                return "bg-yellow-500/70 text-black";
            case "Activo":
                return "bg-green-500/70 text-white";
            case "Finalizado":
                return "bg-gray-500/70 text-white";
            case "Rechazado":
                return "bg-red-500/70 text-white";
            default:
                return "bg-neutral/70 text-black";
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case "Solicitado":
                return "Nuevo";
            case "Esperando pago":
                return "Esperando Pago";
            case "Agendado":
                return "Agendado";
            case "Activo":
                return "En Progreso";
            case "Finalizado":
                return "Finalizado";
            case "Rechazado":
                return "Rechazado";
            default:
                return status;
        }
    };

    const formatDistance = (distance) => {
        if (!distance) return null;
        return distance >= 1000 ? 
            `${(distance / 1000).toFixed(1)} km` : 
            `${distance} m`;
    };

    const renderActionButtons = () => {
        switch (walk.status) {
            case "Solicitado":
                return (
                    <div className="flex items-center gap-2 mt-auto">
                        <button
                            onClick={() => onAcceptWalk(walk)}
                            className="flex-1 flex items-center justify-center px-3 py-2 text-xs font-semibold rounded-lg bg-green-500 text-white hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            <FiCheck className="mr-1" size={12} />
                            Aceptar
                        </button>
                        <button
                            onClick={() => onRejectWalk(walk)}
                            className="px-3 py-2 text-xs font-semibold rounded-lg border-2 border-danger text-danger hover:bg-danger hover:text-white transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
                        >
                            <FiX size={12} className="mr-1" />
                            Rechazar
                        </button>
                    </div>
                );

            case "Esperando pago":
                return (
                    <div className="flex items-center gap-2 mt-auto">
                        <button
                            onClick={() => onShowWaitingPayment(walk)}
                            className="flex-1 flex items-center justify-center px-3 py-2 text-xs font-semibold rounded-lg border-2 border-info text-info hover:bg-info hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            <FiInfo className="mr-1" size={12} />
                            Info
                        </button>
                    </div>
                );

            case "Agendado":
                return (
                    <div className="flex items-center gap-2 mt-auto">
                        <button
                            onClick={() => onStartWalk(walk)}
                            className="flex-1 flex items-center justify-center px-3 py-2 text-xs font-semibold rounded-lg bg-primary text-white hover:bg-primary/80 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            <FiPlay className="mr-1" size={12} />
                            Iniciar Paseo
                        </button>
                    </div>
                );

            case "Activo":
                return (
                    <div className="flex items-center gap-2 mt-auto">
                        <button
                            onClick={() => onViewWalk(walk.id)}
                            className="flex-1 flex items-center justify-center px-3 py-2 text-xs font-semibold rounded-lg border-2 border-success text-success hover:bg-success hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            <FiEye className="mr-1" size={12} />
                            Ver Paseo
                        </button>
                        <button
                            onClick={() => onFinishWalk(walk)}
                            className="flex-1 flex items-center justify-center px-3 py-2 text-xs font-semibold rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            <FiCheckCircle className="mr-1" size={12} />
                            Finalizar
                        </button>
                    </div>
                );

            case "Finalizado":
            case "Rechazado":
            default:
                return null;
        }
    };

    return (
        <div className="group relative overflow-hidden rounded-3xl bg-white/80 dark:bg-foreground/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-success/10 h-full flex flex-col min-w-[325px]">

            <div className="absolute top-4 right-4 z-10">
                <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${getStatusColor(walk.status)}`}>
                    {getStatusText(walk.status)}
                </span>
            </div>

            <div className="absolute inset-0 bg-gradient-to-br from-success/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative p-4 flex flex-col flex-1">
                <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-success to-primary rounded-full flex items-center justify-center mr-3 shadow-lg flex-shrink-0">
                        <span className="text-white font-bold text-sm">{walk.dogName?.[0] || 'P'}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-foreground dark:text-background group-hover:text-success transition-colors duration-300 truncate">
                            {walk.dogName}
                        </h3>
                        <div className="flex items-center text-accent dark:text-muted">
                            <FiMapPin className="mr-1 flex-shrink-0" size={12} />
                            <span className="text-xs font-medium truncate">Solicitud de paseo</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-3 mb-6 flex-1">
                    <div className="flex items-center p-2 bg-success/10 rounded-lg">
                        <FiCalendar className="mr-2 text-success flex-shrink-0" size={14} />
                        <span className="text-xs font-semibold text-foreground dark:text-background truncate">
                            {format(new Date(walk.startTime), "MMM dd, yyyy")}
                        </span>
                    </div>

                    <div className="flex items-center p-2 bg-primary/10 rounded-lg">
                        <FiClock className="mr-2 text-primary flex-shrink-0" size={14} />
                        <span className="text-xs font-semibold text-foreground dark:text-background truncate">
                            {format(new Date(walk.startTime), "h:mm a")}
                            {walk.endTime && ` - ${format(new Date(walk.endTime), "h:mm a")}`}
                        </span>
                    </div>

                    {(walk.duration || walk.distance) && (
                        <div className="flex items-center p-2 bg-info/10 rounded-lg">
                            <FiMapPin className="mr-2 text-info flex-shrink-0" size={14} />
                            <span className="text-xs font-semibold text-foreground dark:text-background truncate">
                                {walk.duration && `${walk.duration} min`}
                                {walk.duration && walk.distance && ' • '}
                                {walk.distance && formatDistance(walk.distance)}
                            </span>
                        </div>
                    )}

                    {walk.notes && (
                        <div className="p-2 bg-accent/10 rounded-lg">
                            <p className="text-xs text-accent dark:text-muted italic line-clamp-2">
                                "{walk.notes}"
                            </p>
                        </div>
                    )}

                    {walk.status === "Esperando pago" && (
                        <div className="flex items-center p-2 bg-orange-100 rounded-lg border border-orange-200">
                            <FiInfo className="mr-2 text-orange-600 flex-shrink-0" size={14} />
                            <span className="text-xs font-semibold text-orange-800 truncate">
                                Cliente notificado - Esperando pago
                            </span>
                        </div>
                    )}
                </div>

                {renderActionButtons()}
            </div>
        </div>
    );
};

export default WalkerWalksCardComponent;