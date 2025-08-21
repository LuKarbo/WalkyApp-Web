import { useState, useEffect } from "react";
import Navbar from "./Pages/General/Navbar";
import MainContent from "./Pages/General/MainContent";
import Login from "./Pages/Auth/Login.jsx";
import Register from "./Pages/Auth/Register.jsx";
import { AuthController } from "./BackEnd/Controllers/AuthController.js";

const App = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeItem, setActiveItem] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [authScreen, setAuthScreen] = useState("login");
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleLogin = async (credentials) => {
    const loggedUser = await AuthController.login(credentials);
    sessionStorage.setItem("token", loggedUser.token);
    setUser(loggedUser);
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
  };

  useEffect(() => {
    const verifySession = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) return;
        const u = await AuthController.checkSession(token);
        setUser(u);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    verifySession();
  }, []);

  if (loading) return <div>Cargando...</div>;

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
