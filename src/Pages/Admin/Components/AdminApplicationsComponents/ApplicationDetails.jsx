import { FaUser, FaPhone, FaIdCard, FaMapMarkerAlt, FaClock, FaCheckCircle, FaTimes, FaEye, FaImage, FaStar } from 'react-icons/fa';

const ApplicationDetails = ({ application, onReviewStart, reviewing }) => {
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

    const canReview = () => {
        return ['pending', 'under_review'].includes(application.status);
    };

    const imageTypes = [
        { key: 'dniFront', label: 'DNI Frente' },
        { key: 'dniBack', label: 'DNI Dorso' },
        { key: 'selfieWithDni', label: 'Selfie con DNI' }
    ];

    return (
        <div className="bg-card dark:bg-card/10 rounded-xl border border-border dark:border-muted">
            <div className="p-6 border-b border-border dark:border-muted">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-foreground dark:text-background">
                        Detalles de la Solicitud
                    </h2>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(application.status)}`}>
                        {getStatusIcon(application.status)}
                        <span className="ml-2">
                            {getStatusText(application.status)}
                        </span>
                    </span>
                </div>
                <p className="text-sm text-accent dark:text-muted">
                    ID: {application.id}
                </p>
            </div>

            <div className="p-6 space-y-6">
                
                <div>
                    <h3 className="text-lg font-semibold text-foreground dark:text-background mb-4 flex items-center">
                        <FaUser className="mr-2 text-primary" />
                        Información Personal
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-background dark:bg-foreground rounded-lg p-4">
                            <label className="text-sm text-accent dark:text-muted">Nombre Completo</label>
                            <p className="font-medium text-foreground dark:text-background">{application.fullName}</p>
                        </div>
                        <div className="bg-background dark:bg-foreground rounded-lg p-4">
                            <label className="text-sm text-accent dark:text-muted flex items-center">
                                <FaPhone className="mr-1" /> Teléfono
                            </label>
                            <p className="font-medium text-foreground dark:text-background">{application.phone}</p>
                        </div>
                        <div className="bg-background dark:bg-foreground rounded-lg p-4">
                            <label className="text-sm text-accent dark:text-muted flex items-center">
                                <FaIdCard className="mr-1" /> DNI
                            </label>
                            <p className="font-medium text-foreground dark:text-background">{application.dni}</p>
                        </div>
                        <div className="bg-background dark:bg-foreground rounded-lg p-4">
                            <label className="text-sm text-accent dark:text-muted flex items-center">
                                <FaMapMarkerAlt className="mr-1" /> Ubicación
                            </label>
                            <p className="font-medium text-foreground dark:text-background">
                                {application.city}, {application.province}
                            </p>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-foreground dark:text-background mb-4 flex items-center">
                        <FaImage className="mr-2 text-primary" />
                        Documentación
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {imageTypes.map((imageType) => (
                            <div key={imageType.key} className="bg-background dark:bg-foreground rounded-lg p-4">
                                <label className="text-sm text-accent dark:text-muted mb-2 block">
                                    {imageType.label}
                                </label>
                                {application.images[imageType.key] ? (
                                    <div className="space-y-2">
                                        <div className="bg-success/10 border border-success/20 rounded-lg p-2 text-center">
                                            <FaCheckCircle className="text-success mx-auto mb-1" />
                                            <p className="text-xs text-success">Imagen cargada</p>
                                        </div>
                                        <div className="text-xs text-accent dark:text-muted">
                                            <p>Archivo: {application.images[imageType.key].originalName}</p>
                                            <p>Tamaño: {(application.images[imageType.key].size / 1024 / 1024).toFixed(2)} MB</p>
                                        </div>
                                        <button 
                                            onClick={() => window.open(application.images[imageType.key].url, '_blank')}
                                            className="w-full text-xs bg-primary text-white py-1 px-2 rounded hover:bg-primary/80 transition-colors"
                                        >
                                            Ver Imagen
                                        </button>
                                    </div>
                                ) : (
                                    <div className="bg-danger/10 border border-danger/20 rounded-lg p-2 text-center">
                                        <FaTimes className="text-danger mx-auto mb-1" />
                                        <p className="text-xs text-danger">No cargada</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-foreground dark:text-background mb-4 flex items-center">
                        <FaClock className="mr-2 text-primary" />
                        Cronología
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-background dark:bg-foreground rounded-lg p-4">
                            <label className="text-sm text-accent dark:text-muted">Enviada</label>
                            <p className="font-medium text-foreground dark:text-background">
                                {formatDate(application.submittedAt)}
                            </p>
                        </div>
                        {application.reviewedAt && (
                            <div className="bg-background dark:bg-foreground rounded-lg p-4">
                                <label className="text-sm text-accent dark:text-muted">Revisada</label>
                                <p className="font-medium text-foreground dark:text-background">
                                    {formatDate(application.reviewedAt)}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {application.applicationScore && (
                    <div>
                        <h3 className="text-lg font-semibold text-foreground dark:text-background mb-4 flex items-center">
                            <FaStar className="mr-2 text-primary" />
                            Puntuación de la Aplicación
                        </h3>
                        <div className="bg-background dark:bg-foreground rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <span className="text-accent dark:text-muted">Puntuación Final</span>
                                <div className="flex items-center">
                                    <FaStar className="text-warning mr-1" />
                                    <span className="font-bold text-xl text-foreground dark:text-background">
                                        {application.applicationScore}/100
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {application.adminNotes && (
                    <div>
                        <h3 className="text-lg font-semibold text-foreground dark:text-background mb-4">
                            Notas del Administrador
                        </h3>
                        <div className={`rounded-lg p-4 border ${
                            application.status === 'approved' 
                                ? 'bg-success/10 border-success/20' 
                                : 'bg-danger/10 border-danger/20'
                        }`}>
                            <p className={`${
                                application.status === 'approved' ? 'text-success' : 'text-danger'
                            } font-medium`}>
                                {application.adminNotes}
                            </p>
                        </div>
                    </div>
                )}

                {canReview() && (
                    <div className="border-t border-border dark:border-muted pt-6">
                        <h3 className="text-lg font-semibold text-foreground dark:text-background mb-4">
                            Acciones de Revisión
                        </h3>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => onReviewStart('approve')}
                                disabled={reviewing}
                                className="flex-1 bg-gradient-to-r from-success to-success/80 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                <FaCheckCircle className="mr-2" />
                                {reviewing ? 'Procesando...' : 'Aprobar Solicitud'}
                            </button>
                            <button
                                onClick={() => onReviewStart('reject')}
                                disabled={reviewing}
                                className="flex-1 bg-gradient-to-r from-danger to-danger/80 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                <FaTimes className="mr-2" />
                                {reviewing ? 'Procesando...' : 'Rechazar Solicitud'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ApplicationDetails;