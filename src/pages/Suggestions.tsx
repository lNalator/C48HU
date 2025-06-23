import React, { useState, useMemo } from 'react';
import { useAppStore } from '../store/useAppStore';
import SuggestionCard from '../components/Suggestions/SuggestionCard';
import SortFilter from '../components/Suggestions/SortFilter';

const Suggestions: React.FC = () => {
  const { suggestions } = useAppStore();
  const [sortBy, setSortBy] = useState<'popularity' | 'date' | 'type'>('popularity');
  const [filterType, setFilterType] = useState<'all' | 'transport' | 'amenagement' | 'environnement' | 'social'>('all');

  const sortedAndFilteredSuggestions = useMemo(() => {
    let filtered = suggestions;
    
    // Filter by type
    if (filterType !== 'all') {
      filtered = suggestions.filter(s => s.type === filterType);
    }
    
    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          const aScore = a.votes.up - a.votes.down;
          const bScore = b.votes.up - b.votes.down;
          return bScore - aScore;
        case 'date':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'type':
          return a.type.localeCompare(b.type);
        default:
          return 0;
      }
    });
    
    return sorted;
  }, [suggestions, sortBy, filterType]);

  const typeLabels = {
    all: 'toutes les suggestions',
    transport: 'suggestions de transport',
    amenagement: 'suggestions d\'aménagement',
    environnement: 'suggestions environnementales',
    social: 'suggestions sociales',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Toutes les Suggestions
        </h1>
        <p className="text-lg text-gray-600">
          Explorez et votez pour les idées qui amélioreront votre quartier.
        </p>
      </div>

      <SortFilter 
        sortBy={sortBy}
        setSortBy={setSortBy}
        filterType={filterType}
        setFilterType={setFilterType}
      />

      <div className="mb-4">
        <p className="text-sm text-gray-600">
          {sortedAndFilteredSuggestions.length} {typeLabels[filterType]} trouvée{sortedAndFilteredSuggestions.length !== 1 ? 's' : ''}
        </p>
      </div>

      {sortedAndFilteredSuggestions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Aucune suggestion trouvée.</p>
          <p className="text-gray-400 mt-2">
            {filterType !== 'all' 
              ? 'Essayez de changer les filtres ou d\'ajouter une nouvelle suggestion.'
              : 'Soyez le premier à ajouter une suggestion sur la carte !'
            }
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {sortedAndFilteredSuggestions.map((suggestion) => (
            <SuggestionCard key={suggestion.id} suggestion={suggestion} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Suggestions;