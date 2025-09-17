import { useState, useEffect } from 'react';
import { FaUsers, FaClock, FaCheckCircle, FaTimes, FaFilter } from 'react-icons/fa';
import { JoinToUsController } from '../../../BackEnd/Controllers/JoinToUsController';
import { UserController } from '../../../BackEnd/Controllers/UserController';

import ApplicationsList from '../Components/AdminApplicationsComponents/ApplicationsList';
import ApplicationDetails from '../Components/AdminApplicationsComponents/ApplicationDetails';
import ApplicationsStats from '../Components/AdminApplicationsComponents/ApplicationsStats';
import ReviewModal from '../Components/AdminApplicationsComponents/ReviewModal';

const AdminApplicationsManagement = () => {
    const [applications, setApplications] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reviewing, setReviewing] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [reviewAction, setReviewAction] = useState(null); // 'approve' or 'reject'
    const [activeFilter, setActiveFilter] = useState('all');
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
        under_review: 0
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        loadApplications();
        loadStats();
    }, []);

    useEffect(() => {
        filterApplications();
    }, [applications, activeFilter]);

    const loadApplications = async () => {
        try {
            setLoading(true);
            const response = await JoinToUsController.getAllRegistrations();
            setApplications(response);
        } catch (error) {
            console.error('Error loading applications:', error);
            setErrors({ load: 'Error al cargar las solicitudes' });
        } finally {
            setLoading(false);
        }
    };

    const loadStats = async () => {
        try {
            const response = await JoinToUsController.getRegistrationStats();
            setStats(response);
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    };

    const filterApplications = () => {
        let filtered = [...applications];
        
        switch (activeFilter) {
            case 'new':
                filtered = applications.filter(app => 
                    ['pending', 'under_review'].includes(app.status)
                );
                break;
            case 'reviewed':
                filtered = applications.filter(app => 
                    ['approved', 'rejected'].includes(app.status)
                );
                break;
            case 'pending':
                filtered = applications.filter(app => app.status === 'pending');
                break;
            case 'approved':
                filtered = applications.filter(app => app.status === 'approved');
                break;
            case 'rejected':
                filtered = applications.filter(app => app.status === 'rejected');
                break;
            default:
                // 'all' - no filter
                break;
        }

        setFilteredApplications(filtered);
    };

    const handleApplicationSelect = (application) => {
        setSelectedApplication(application);
    };

    const handleReviewStart = (action) => {
        setReviewAction(action);
        setShowReviewModal(true);
    };

    const handleReviewSubmit = async (adminNotes = '') => {
        if (!selectedApplication || !reviewAction) return;

        try {
            setReviewing(true);
            setErrors({});

            await JoinToUsController.updateRegistrationStatus(
                selectedApplication.id,
                reviewAction === 'approve' ? 'approved' : 'rejected',
                adminNotes
            );

            if (reviewAction === 'approve') {
                await UserController.promoteUserToWalker(selectedApplication.userId);
            }

            await loadApplications();
            await loadStats();

            const updatedApplication = await JoinToUsController.getRegistrationById(selectedApplication.id);
            setSelectedApplication(updatedApplication);

            setShowReviewModal(false);
            setReviewAction(null);

        } catch (error) {
            console.error('Error reviewing application:', error);
            setErrors({ 
                review: error.message || 'Error al procesar la solicitud' 
            });
        } finally {
            setReviewing(false);
        }
    };

    const handleCloseReviewModal = () => {
        setShowReviewModal(false);
        setReviewAction(null);
    };

    if (loading) {
        return (
            <div className="w-full h-full p-6 bg-background dark:bg-foreground flex items-center justify-center">
                <div className="flex items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mr-3"></div>
                    <span className="text-foreground dark:text-background">Cargando solicitudes...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full p-6 bg-background dark:bg-foreground">
            <div className="max-w-7xl mx-auto">
                
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-4xl font-bold text-foreground dark:text-background">
                                Gestión de Solicitudes
                            </h1>
                            <p className="text-lg text-accent dark:text-muted mt-2">
                                Administra las solicitudes de paseadores
                            </p>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            <FaFilter className="text-accent dark:text-muted mr-2" />
                            {[
                                { key: 'all', label: 'Todas', icon: FaUsers },
                                { key: 'new', label: 'Nuevas', icon: FaClock },
                                { key: 'approved', label: 'Aprobadas', icon: FaCheckCircle },
                                { key: 'rejected', label: 'Rechazadas', icon: FaTimes }
                            ].map(filter => (
                                <button
                                    key={filter.key}
                                    onClick={() => setActiveFilter(filter.key)}
                                    className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                                        activeFilter === filter.key
                                            ? 'bg-primary text-white'
                                            : 'bg-card dark:bg-card/10 text-foreground dark:text-background hover:bg-primary/10'
                                    }`}
                                >
                                    <filter.icon className="mr-2" />
                                    {filter.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <ApplicationsStats stats={stats} />
                </div>

                {errors.load && (
                    <div className="mb-6 p-4 bg-danger/10 border border-danger/30 rounded-xl text-danger">
                        {errors.load}
                    </div>
                )}

                {errors.review && (
                    <div className="mb-6 p-4 bg-danger/10 border border-danger/30 rounded-xl text-danger">
                        {errors.review}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    <div className="lg:col-span-1">
                        <ApplicationsList
                            applications={filteredApplications}
                            selectedApplication={selectedApplication}
                            onApplicationSelect={handleApplicationSelect}
                            activeFilter={activeFilter}
                        />
                    </div>

                    <div className="lg:col-span-1">
                        {selectedApplication ? (
                            <ApplicationDetails
                                application={selectedApplication}
                                onReviewStart={handleReviewStart}
                                reviewing={reviewing}
                            />
                        ) : (
                            <div className="bg-card dark:bg-card/10 rounded-xl p-8 border border-border dark:border-muted text-center">
                                <div className="text-6xl text-accent dark:text-muted mb-4">📋</div>
                                <h3 className="text-xl font-semibold text-foreground dark:text-background mb-2">
                                    Selecciona una solicitud
                                </h3>
                                <p className="text-accent dark:text-muted">
                                    Elige una solicitud de la lista para ver sus detalles
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                
                {showReviewModal && (
                    <ReviewModal
                        isOpen={showReviewModal}
                        onClose={handleCloseReviewModal}
                        onSubmit={handleReviewSubmit}
                        action={reviewAction}
                        application={selectedApplication}
                        loading={reviewing}
                    />
                )}
            </div>
        </div>
    );
};

export default AdminApplicationsManagement;