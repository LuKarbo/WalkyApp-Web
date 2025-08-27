import { createContext, useContext } from 'react';

const NavigationContext = createContext();

export const NavigationProvider = ({ children, navigateToContent }) => {
    return (
        <NavigationContext.Provider value={{ navigateToContent }}>
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigation = () => {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error('useNavigation debe ser usado dentro de NavigationProvider');
    }
    return context;
};