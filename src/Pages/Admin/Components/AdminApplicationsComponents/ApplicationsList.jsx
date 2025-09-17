import { FaClock, FaCheckCircle, FaTimes, FaEye, FaUser, FaIdCard } from 'react-icons/fa';

const ApplicationsList = ({ 
    applications, 
    selectedApplication, 
    onApplicationSelect, 
    activeFilter 
}) => {
    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending':
                return <FaClock className="text-warning" />;
            case 'under_review':
                return <FaEye className="text-info" />;
            case 'approved':
                return <FaCheckCircle className="text-success" />;
            case 'rejected':
                return <FaTimes className="text-danger" />;
            default:
                return <FaClock className="text-warning" />;
        }
    };

    const getStatusText = (status) => {
        const statusTexts = {
            pending: 'Pendiente',
            under_review: 'En Revisión',
            approved: 'Aprobado',
            rejected: 'Rechazado'
        };
        return statusTexts[status] || status;
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'text-warning bg-warning/10 border-warning/20';
            case 'under_review':
                return 'text-info bg-info/10 border-info/20';
            case 'approved':
                return 'text-success bg-success/10 border-success/20';
            case 'rejected':
                return 'text-danger bg-danger/10 border-danger/20';
            default:
                return 'text-warning bg-warning/10 border-warning/20';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getFilterTitle = () => {
        switch (activeFilter) {
            case 'all':
                return 'Todas las Solicitudes';
            case 'new':
                return 'Solicitudes Nuevas';
            case 'reviewed':
                return 'Solicitudes Revisadas';
            case 'pending':
                return 'Solicitudes Pendientes';
            case 'approved':
                return 'Solicitudes Aprobadas';
            case 'rejected':
                return 'Solicitudes Rechazadas';
            default:
                return 'Solicitudes';
        }
    };

    return (
        <div className="bg-card dark:bg-card/10 rounded-xl border border-border dark:border-muted">
            <div className="p-6 border-b border-border dark:border-muted">
                <h2 className="text-xl font-bold text-foreground dark:text-background">
                    {getFilterTitle()}
                </h2>
                <p className="text-sm text-accent dark:text-muted mt-1">
                    {applications.length} solicitud{applications.length !== 1 ? 'es' : ''} encontrada{applications.length !== 1 ? 's' : ''}
                </p>
            </div>

            <div className="max-h-[600px] overflow-y-auto">
                {applications.length === 0 ? (
                    <div className="p-8 text-center">
                        <div className="text-4xl text-accent dark:text-muted mb-3">📝</div>
                        <h3 className="text-lg font-semibold text-foreground dark:text-background mb-2">
                            No hay solicitudes
                        </h3>
                        <p className="text-accent dark:text-muted">
                            No se encontraron solicitudes con el filtro actual
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-border dark:divide-muted">
                        {applications.map((application) => (
                            <div
                                key={application.id}
                                onClick={() => onApplicationSelect(application)}
                                className={`p-4 cursor-pointer transition-all duration-200 hover:bg-background dark:hover:bg-foreground/5 ${
                                    selectedApplication?.id === application.id
                                        ? 'bg-primary/5 border-r-4 border-primary'
                                        : ''
                                }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center mb-2">
                                            <FaUser className="text-accent dark:text-muted mr-2 text-sm" />
                                            <h3 className="font-semibold text-foreground dark:text-background">
                                                {application.fullName}
                                            </h3>
                                        </div>
                                        
                                        <div className="flex items-center mb-2">
                                            <FaIdCard className="text-accent dark:text-muted mr-2 text-sm" />
                                            <span className="text-sm text-accent dark:text-muted">
                                                DNI: {application.dni}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-accent dark:text-muted">
                                                ID: {application.id}
                                            </span>
                                            <span className="text-xs text-accent dark:text-muted">
                                                {formatDate(application.submittedAt)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="ml-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(application.status)}`}>
                                            {getStatusIcon(application.status)}
                                            <span className="ml-1">
                                                {getStatusText(application.status)}
                                            </span>
                                        </span>
                                    </div>
                                </div>

                                {application.city && application.province && (
                                    <div className="mt-2 text-xs text-accent dark:text-muted">
                                        📍 {application.city}, {application.province}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ApplicationsList;