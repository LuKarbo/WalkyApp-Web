import { useState, useEffect } from "react";
import Navbar from "./Pages/General/Navbar";
import MainContent from "./Pages/General/MainContent";
import { UserController } from "./BackEnd/Controllers/UserController.js";

const App = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeItem, setActiveItem] = useState("dashboard");
  const [user, setUser] = useState(null);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

useEffect(() => {
    const loadUser = async () => {
      const u = await UserController.fetchUserProfile("1");
      setUser(u);
    };
    loadUser();
}, []);

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="flex h-screen bg-background dark:bg-foreground">
        {/* Navbar */}
        <Navbar
          isOpen={isOpen}
          toggleSidebar={toggleSidebar}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          user={user}
        />

        {/* Main Content */}
        <MainContent activeItem={activeItem} isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default App;
