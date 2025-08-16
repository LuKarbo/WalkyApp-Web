import { useState } from "react";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Navbar from "./Pages/General/Navbar";
import Home from "./Pages/General/Home";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('home');

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
    setCurrentView('home');
  };

  const handleRegister = (userData) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
    setCurrentView('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setShowRegister(false);
    setCurrentView('home');
  };

  const switchToRegister = () => {
    setShowRegister(true);
  };

  const switchToLogin = () => {
    setShowRegister(false);
  };

  const renderMainContent = () => {
    switch (currentView) {
      case 'home':
        return <Home user={currentUser} />;
      case 'dashboard':
        return (
          <div className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <h1 className="text-3xl font-bold text-foreground mb-4">Dashboard</h1>
              <p className="text-accent">Dashboard content will go here...</p>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <h1 className="text-3xl font-bold text-foreground mb-4">Profile</h1>
              <div className="bg-card p-6 rounded-lg shadow-sm border border-border/50">
                <p className="text-foreground"><strong>Name:</strong> {currentUser?.fullName || 'N/A'}</p>
                <p className="text-foreground mt-2"><strong>Email:</strong> {currentUser?.email}</p>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <h1 className="text-3xl font-bold text-foreground mb-4">Settings</h1>
              <p className="text-accent">Settings content will go here...</p>
            </div>
          </div>
        );
      default:
        return <Home user={currentUser} />;
    }
  };

  if (!isAuthenticated) {
    if (showRegister) {
      return (
        <Register 
          onRegister={handleRegister}
          switchToLogin={switchToLogin}
        />
      );
    }
    
    return (
      <Login 
        onLogin={handleLogin}
        switchToRegister={switchToRegister}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        user={currentUser}
        onLogout={handleLogout}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
      {renderMainContent()}
    </div>
  );
}

export default App;