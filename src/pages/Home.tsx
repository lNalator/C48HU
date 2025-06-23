import React from 'react';
import InteractiveMap from '../components/Map/InteractiveMap';
import { useAppStore } from '../store/useAppStore';

const Home: React.FC = () => {
  const { suggestions, user } = useAppStore();

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Carte Participative du Quartier
          </h1>
          <p className="text-gray-600 mb-4">
            Découvrez les suggestions de vos voisins et contribuez à l'amélioration de votre quartier.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Transport ({suggestions.filter(s => s.type === 'transport').length})</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Aménagement ({suggestions.filter(s => s.type === 'amenagement').length})</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Environnement ({suggestions.filter(s => s.type === 'environnement').length})</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span>Social ({suggestions.filter(s => s.type === 'social').length})</span>
            </div>
          </div>
          
          {!user?.isAuthenticated && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">
                💡 Connectez-vous pour ajouter vos propres suggestions et voter pour celles qui vous intéressent.
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto h-full">
          <InteractiveMap />
        </div>
      </div>
    </div>
  );
};

export default Home;