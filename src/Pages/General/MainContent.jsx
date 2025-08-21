const MainContent = ({ activeItem }) => {
    return (
        <main className="flex-1 p-8 overflow-auto bg-background dark:bg-foreground">
            <h1 className="text-2xl font-bold text-foreground dark:text-background mb-4">
                {activeItem.charAt(0).toUpperCase() + activeItem.slice(1)}
            </h1>
            <div className="bg-card dark:bg-accent p-6 rounded-lg shadow-lg">
                <p className="text-foreground dark:text-background">
                    Content for <strong>{activeItem}</strong> goes here.
                </p>
            </div>
        </main>
    );
};

export default MainContent;
