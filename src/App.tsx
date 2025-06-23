import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header";
import Home from "./pages/Home";
import Suggestions from "./pages/Suggestions";
import { useEffect } from "react";
import Api from "./core/api";
import { useAppStore } from "./store/useAppStore";
import { initializeAuth } from "./core/auth.utils";
import Profile from "./pages/Profile";

function App() {
  const setUser = useAppStore((state) => state.setUser);

  useEffect(() => {
    const user = initializeAuth();
    if (user) {
      setUser(user);
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/suggestions" element={<Suggestions />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
