const TripsComponent = ({ trips, requestButtonClass }) => (
    <div className="bg-foreground-userProfile p-6 rounded-lg shadow-lg mb-6">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-heading text-background">Últimos 10 Paseos</h2>
            <button className={requestButtonClass}>
                Solicitar Paseo
            </button>
        </div>
        {trips.length === 0 ? (
            <p className="text-accent dark:text-muted">Sin paseos realizados.</p>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <p className="text-accent dark:text-muted">DATOS</p>
            </div>
        )}
    </div>
);

export default TripsComponent;
