import React from 'react';
import { ThumbsUp, ThumbsDown, User, Calendar } from 'lucide-react';
import { Suggestion } from '../../types';
import { useAppStore } from '../../store/useAppStore';
import { SuggestionTypeLabelsConstant } from '../../constants/suggestion-type-labels.constant';

interface SuggestionPopupProps {
  suggestion: Suggestion;
}

const SuggestionPopup: React.FC<SuggestionPopupProps> = ({ suggestion }) => {
  const { user, voteSuggestion } = useAppStore();

  const typeColors = {
    transport: 'bg-blue-100 text-blue-800',
    amenagement: 'bg-green-100 text-green-800',
    environnement: 'bg-yellow-100 text-yellow-800',
    social: 'bg-purple-100 text-purple-800',
  };

  const handleVote = (voteType: 'up' | 'down') => {
    if (user) {
      voteSuggestion(suggestion.id, voteType);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="p-2 max-w-xs">
      {suggestion.type.map((type) => 
          <div className="mb-2" key={type}>
            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${(typeColors as Record<string, string>)[type]}`}>
              {SuggestionTypeLabelsConstant[type as keyof typeof SuggestionTypeLabelsConstant]}
            </span>
          </div>
        )}
      
      <h3 className="font-semibold text-gray-900 mb-2">{suggestion.title}</h3>
      <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
      
      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
        <div className="flex items-center space-x-1">
          <User className="h-3 w-3" />
          <span>{suggestion.author}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Calendar className="h-3 w-3" />
          <span>{formatDate(suggestion.createdAt)}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleVote('up')}
            disabled={!user}
            className={`flex items-center space-x-1 px-2 py-1 rounded transition-colors ${
              suggestion.userVote === 'up'
                ? 'bg-green-100 text-green-700'
                : 'text-gray-600 hover:bg-gray-100'
            } ${!user ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            <ThumbsUp className="h-3 w-3" />
            <span className="text-xs font-medium">{suggestion.votes.up}</span>
          </button>
          
          <button
            onClick={() => handleVote('down')}
            disabled={!user}
            className={`flex items-center space-x-1 px-2 py-1 rounded transition-colors ${
              suggestion.userVote === 'down'
                ? 'bg-red-100 text-red-700'
                : 'text-gray-600 hover:bg-gray-100'
            } ${!user ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            <ThumbsDown className="h-3 w-3" />
            <span className="text-xs font-medium">{suggestion.votes.down}</span>
          </button>
        </div>
        
        {!user && (
          <span className="text-xs text-gray-400">Connectez-vous pour voter</span>
        )}
      </div>
    </div>
  );
};

export default SuggestionPopup;