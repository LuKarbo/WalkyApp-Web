import { useState } from 'react';
import { FaCheckCircle, FaTimes, FaExclamationTriangle } from 'react-icons/fa';

const ReviewModal = ({ isOpen, onClose, onSubmit, action, application, loading }) => {
    const [adminNotes, setAdminNotes] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        // Validación para rechazo
        if (action === 'reject' && !adminNotes.trim()) {
            setErrors({ notes: 'Debes proporcionar una razón para el rechazo' });
            return;
        }

        if (adminNotes.trim().length > 500) {
            setErrors({ notes: 'Las notas no pueden exceder los 500 caracteres' });
            return;
        }

        onSubmit(adminNotes.trim());
    };

    const handleClose = () => {
        setAdminNotes('');
        setErrors({});
        onClose();
    };

    if (!isOpen) return null;

    const isApproval = action === 'approve';
    const actionText = isApproval ? 'Aprobar' : 'Rechazar';
    const actionColor = isApproval ? 'success' : 'danger';
    const ActionIcon = isApproval ? FaCheckCircle : FaTimes;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-card dark:bg-card/10 rounded-2xl max-w-md w-full border border-border dark:border-muted">
                <div className="p-6 border-b border-border dark:border-muted">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-foreground dark:text-background flex items-center">
                            <ActionIcon className={`mr-3 text-${actionColor}`} />
                            {actionText} Solicitud
                        </h2>
                        <button
                            onClick={handleClose}
                            disabled={loading}
                            className="text-accent dark:text-muted hover:text-foreground dark:hover:text-background transition-colors disabled:opacity-50"
                        >
                            <FaTimes className="text-xl" />
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="mb-6">
                        <div className={`bg-${actionColor}/10 border border-${actionColor}/20 rounded-xl p-4 mb-4`}>
                            <div className="flex items-start">
                                {isApproval ? (
                                    <FaCheckCircle className="text-success text-lg mr-3 mt-0.5 flex-shrink-0" />
                                ) : (
                                    <FaExclamationTriangle className="text-danger text-lg mr-3 mt-0.5 flex-shrink-0" />
                                )}
                                <div>
                                    <h3 className={`font-semibold text-${actionColor} mb-2`}>
                                        {isApproval 
                                            ? '¿Confirmar aprobación?' 
                                            : '¿Confirmar rechazo?'
                                        }
                                    </h3>
                                    <p className="text-sm text-accent dark:text-muted">
                                        <strong>Solicitante:</strong> {application?.fullName}
                                        <br />
                                        <strong>DNI:</strong> {application?.dni}
                                        <br />
                                        <strong>ID:</strong> {application?.id}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {isApproval && (
                            <div className="bg-info/10 border border-info/20 rounded-xl p-4 mb-4">
                                <div className="flex items-start">
                                    <FaCheckCircle className="text-info text-lg mr-3 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-info mb-2">
                                            Al aprobar esta solicitud:
                                        </h4>
                                        <ul className="text-sm text-accent dark:text-muted space-y-1">
                                            <li>• El usuario será promovido a rol de "Walker"</li>
                                            <li>• Tendrá acceso a funciones de paseador</li>
                                            <li>• Recibirá notificación de aprobación</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-foreground dark:text-background font-semibold mb-3">
                                {isApproval ? 'Comentarios (opcional)' : 'Razón del rechazo *'}
                            </label>
                            <textarea
                                value={adminNotes}
                                onChange={(e) => setAdminNotes(e.target.value)}
                                placeholder={
                                    isApproval 
                                        ? 'Comentarios adicionales sobre la aprobación...'
                                        : 'Explica por qué se rechaza la solicitud...'
                                }
                                className={`w-full p-4 border-2 rounded-xl bg-background dark:bg-foreground text-foreground dark:text-background transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary resize-none ${
                                    errors.notes ? 'border-danger' : 'border-border dark:border-muted hover:border-primary/50'
                                }`}
                                rows={4}
                                maxLength={500}
                            />
                            <div className="flex justify-between items-center mt-2">
                                {errors.notes && (
                                    <p className="text-sm text-danger">{errors.notes}</p>
                                )}
                                <p className="text-xs text-accent dark:text-muted ml-auto">
                                    {adminNotes.length}/500 caracteres
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={loading}
                            className="flex-1 bg-card dark:bg-card/10 text-foreground dark:text-background border border-border dark:border-muted py-3 px-6 rounded-xl font-semibold hover:bg-background dark:hover:bg-foreground/5 transition-all duration-200 disabled:opacity-50"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`flex-1 bg-gradient-to-r from-${actionColor} to-${actionColor}/80 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
                        >
                            {loading ? (
                                <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Procesando...
                                </div>
                            ) : (
                                <>
                                    <ActionIcon className="mr-2" />
                                    {actionText}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReviewModal;