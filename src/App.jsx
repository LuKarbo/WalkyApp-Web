import { useState, useEffect } from "react";
import Navbar from "./Pages/General/Navbar";
import MainContent from "./Pages/General/MainContent";
import Login from "./Pages/Auth/Login.jsx";
import Register from "./Pages/Auth/Register.jsx";
import { AuthController } from "./BackEnd/Controllers/AuthController.js";

const App = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeItem, setActiveItem] = useState("home"); 
  const [user, setUser] = useState(null);
  const [authScreen, setAuthScreen] = useState("login");
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // pagina principal por rol de usuario
  const getDefaultActiveItem = (userRole) => {
    switch (userRole) {
      case 'admin':
        return 'statistics';
      case 'client':
        return 'home';
      case 'walker':
        return 'home';
      case 'support':
        return 'tickets-general';
      default:
        return 'home';
    }
  };

  const handleLogin = async (credentials) => {
    const loggedUser = await AuthController.login(credentials);
    sessionStorage.setItem("token", loggedUser.token);
    setUser(loggedUser);
    
    setActiveItem(getDefaultActiveItem(loggedUser.role));
  };

  const handleRegister = async (data) => {
    await AuthController.register(data);
    setAuthScreen("login");
  };

  const handleLogout = async () => {
    await AuthController.logout();
    sessionStorage.removeItem("token");
    setUser(null);
    setAuthScreen("login");
    setActiveItem("home"); 
  };

  useEffect(() => {
    const verifySession = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) return;
        const u = await AuthController.checkSession(token);
        setUser(u);
        
        setActiveItem(getDefaultActiveItem(u.role));

      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    verifySession();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-foreground">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-foreground dark:text-background">Cargando...</p>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      {!user ? (
        authScreen === "login" ? (
          <Login
            onLogin={handleLogin}
            switchToRegister={() => setAuthScreen("register")}
          />
        ) : (
          <Register
            onRegister={handleRegister}
            switchToLogin={() => setAuthScreen("login")}
          />
        )
      ) : (
        <div className="flex h-screen bg-background dark:bg-foreground">
          <Navbar
            isOpen={isOpen}
            toggleSidebar={toggleSidebar}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            user={user}
            onLogout={handleLogout}
          />
          <MainContent activeItem={activeItem} isDarkMode={isDarkMode} />
        </div>
      )}
    </div>
  );
};

export default App;