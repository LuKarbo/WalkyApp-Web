import { getComponentById, getMenuTitle } from '../../BackEnd/Generics/Menu.jsx';

const MainContent = ({ activeItem }) => {

    const ActiveComponent = getComponentById(activeItem);
    const pageTitle = getMenuTitle(activeItem);
    
    return (
        <main className="flex-1 p-8 overflow-auto bg-background dark:bg-foreground">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground dark:text-background">
                    {pageTitle}
                </h1>
                <div className="h-1 w-20 bg-primary rounded mt-2"></div>
            </div>
            
            <div className="bg-card dark:bg-accent rounded-lg shadow-lg min-h-[calc(100vh-200px)]">
                <ActiveComponent />
            </div>
        </main>
    );
};

export default MainContent;