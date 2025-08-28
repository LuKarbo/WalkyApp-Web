import { FiEdit2, FiTrash2 } from "react-icons/fi";

const PetsComponent = ({ pets, addButtonClass }) => (
    <div className="bg-foreground-userProfile p-6 rounded-lg shadow-lg mb-6">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-heading text-background">Pets</h2>
            <button className={addButtonClass}>
                Add Pet
            </button>
        </div>
        {pets.length === 0 ? (
            <p className="text-accent dark:text-muted">No pets registered yet.</p>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pets.map((pet) => (
                    <div key={pet.id} className="border rounded-lg p-4">
                        <img
                            src={pet.photo}
                            alt={pet.name}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h3 className="font-semibold mb-2 text-background">{pet.name}</h3>
                        <p className="text-accent dark:text-muted mb-1">
                            {pet.type} - {pet.breed}
                        </p>
                        <p className="text-accent dark:text-muted mb-4">{pet.age} years old</p>
                        <div className="flex space-x-2">
                            <button className="p-2 text-primary hover:bg-primary hover:text-white rounded transition-colors">
                                <FiEdit2 />
                            </button>
                            <button className="p-2 text-destructive hover:bg-destructive hover:text-white rounded transition-colors">
                                <FiTrash2 />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
);

export default PetsComponent;
