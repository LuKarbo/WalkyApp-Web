import { useState } from 'react';
import { FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';

function Navbar({ user, onLogout, currentView, setCurrentView }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        { id: 'home', label: 'Home' },
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'profile', label: 'Profile' },
        { id: 'settings', label: 'Settings' }
    ];

    return (
        <nav className="bg-card/95 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">

            <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-primary">WalkyApp</h1>
            </div>

            <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                {menuItems.map((item) => (
                    <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        currentView === item.id
                        ? 'bg-primary text-background'
                        : 'text-foreground hover:bg-muted hover:text-primary'
                    }`}
                    >
                    {item.label}
                    </button>
                ))}
                </div>
            </div>

            <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                    <FiUser className="w-5 h-5 text-accent" />
                    <span className="text-sm text-foreground">{user.email}</span>
                    </div>
                    <button
                    onClick={onLogout}
                    className="p-2 rounded-lg border border-border hover:bg-muted transition-colors text-accent hover:text-destructive"
                    title="Logout"
                    >
                    <FiLogOut className="w-4 h-4" />
                    </button>
                </div>
                </div>
            </div>

            <div className="md:hidden">
                <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-accent hover:text-primary hover:bg-muted focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                >
                {isMenuOpen ? (
                    <FiX className="block h-6 w-6" />
                ) : (
                    <FiMenu className="block h-6 w-6" />
                )}
                </button>
            </div>
            </div>
        </div>

        {isMenuOpen && (
            <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card/95 backdrop-blur-sm border-t border-border/50">
                {menuItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => {
                    setCurrentView(item.id);
                    setIsMenuOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    currentView === item.id
                        ? 'bg-primary text-background'
                        : 'text-foreground hover:bg-muted hover:text-primary'
                    }`}
                >
                    {item.label}
                </button>
                ))}
                
                <div className="border-t border-border/50 pt-4 pb-3">
                <div className="flex items-center px-3">
                    <FiUser className="w-5 h-5 text-accent mr-2" />
                    <span className="text-sm text-foreground">{user.email}</span>
                </div>
                <button
                    onClick={onLogout}
                    className="mt-3 w-full text-left px-3 py-2 rounded-md text-base font-medium text-destructive hover:bg-muted transition-colors flex items-center"
                >
                    <FiLogOut className="w-4 h-4 mr-2" />
                    Logout
                </button>
                </div>
            </div>
            </div>
        )}
        </nav>
    );
    }

export default Navbar;