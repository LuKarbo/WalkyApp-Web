import { format } from "date-fns";

const PersonalDetailsComponent = ({ userData }) => (
    <div className="bg-foreground-userProfile p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-heading mb-4 text-background">Información Personal</h2>
        <div className="grid grid-cols-5 gap-4">
            <div>
                <p className="text-accent dark:text-muted">Nombre</p>
                <p className="font-semibold text-background">{userData.name}</p>
            </div>
            <div>
                <p className="text-accent dark:text-muted">Email</p>
                <p className="font-semibold text-background">{userData.email}</p>
            </div>
            <div>
                <p className="text-accent dark:text-muted">Teléfono</p>
                <p className="font-semibold text-background">{userData.contact}</p>
            </div>
            <div>
                <p className="text-accent dark:text-muted">Permisos</p>
                <p className="font-semibold text-background">{userData.rol}</p>
            </div>
            <div>
                <p className="text-accent dark:text-muted">Localidad</p>
                <p className="font-semibold text-background">{userData.contact}</p>
            </div>
            <div>
                <p className="text-accent dark:text-muted">Fecha de Ingreso</p>
                <p className="font-semibold text-background">
                    {format(new Date(userData.joinedDate), "MMMM dd, yyyy")}
                </p>
            </div>
        </div>
    </div>
);

export default PersonalDetailsComponent;
