import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MapPin, List, User, LogOut } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";
import LoginModal from "./LoginModal";

const Header: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAppStore();
  const [showLoginModal, setShowLoginModal] = React.useState(false);

  useEffect(() => {});

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-2">
                <MapPin className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">
                  UrbanVoice
                </span>
              </Link>

              <nav className="hidden md:flex space-x-6">
                <Link
                  to="/"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive("/")
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <MapPin className="h-4 w-4" />
                  <span>Carte</span>
                </Link>
                <Link
                  to="/suggestions"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive("/suggestions")
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <List className="h-4 w-4" />
                  <span>Suggestions</span>
                </Link>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <User className="h-4 w-4" />
                    <span>{user.username}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Déconnexion</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="btn-primary"
                >
                  Se connecter
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
};

export default Header;
