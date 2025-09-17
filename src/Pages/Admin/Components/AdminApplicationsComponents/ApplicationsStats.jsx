import { FaUsers, FaClock, FaCheckCircle, FaTimes, FaEye } from 'react-icons/fa';

const ApplicationsStats = ({ stats }) => {
    const statCards = [
        {
            title: 'Total',
            value: stats.total,
            icon: FaUsers,
            color: 'bg-primary',
            textColor: 'text-primary'
        },
        {
            title: 'Pendientes',
            value: stats.pending + stats.under_review,
            icon: FaClock,
            color: 'bg-warning',
            textColor: 'text-warning'
        },
        {
            title: 'Aprobadas',
            value: stats.approved,
            icon: FaCheckCircle,
            color: 'bg-success',
            textColor: 'text-success'
        },
        {
            title: 'Rechazadas',
            value: stats.rejected,
            icon: FaTimes,
            color: 'bg-danger',
            textColor: 'text-danger'
        },
        {
            title: 'En Revisión',
            value: stats.under_review,
            icon: FaEye,
            color: 'bg-info',
            textColor: 'text-info'
        }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {statCards.map((stat, index) => (
                <div
                    key={index}
                    className="bg-card dark:bg-card/10 rounded-xl p-4 border border-border dark:border-muted hover:shadow-lg transition-all duration-200"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-accent dark:text-muted font-medium">
                                {stat.title}
                            </p>
                            <p className={`text-2xl font-bold ${stat.textColor} mt-1`}>
                                {stat.value}
                            </p>
                        </div>
                        <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center`}>
                            <stat.icon className="text-xl text-white" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ApplicationsStats;