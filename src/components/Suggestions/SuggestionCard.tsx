import React from 'react';
import { ThumbsUp, ThumbsDown, User, Calendar, MapPin } from 'lucide-react';
import { Suggestion } from '../../types';
import { useAppStore } from '../../store/useAppStore';
import { SuggestionTypeLabelsConstant } from '../../constants/suggestion-type-labels.constant';

interface SuggestionCardProps {
  suggestion: Suggestion;
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({ suggestion }) => {
  const { user, voteSuggestion } = useAppStore();

  const typeColors = {
    transport: 'bg-blue-100 text-blue-800 border-blue-200',
    amenagement: 'bg-green-100 text-green-800 border-green-200',
    environnement: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    social: 'bg-purple-100 text-purple-800 border-purple-200',
  };

  const handleVote = (voteType: 'up' | 'down') => {
    if (user?.isAuthenticated) {
      voteSuggestion(suggestion.id, voteType);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const totalVotes = suggestion.votes.up + suggestion.votes.down;
  const upvotePercentage = totalVotes > 0 ? (suggestion.votes.up / totalVotes) * 100 : 0;

  return (
    <div className="card p-6 hover:shadow-lg transition-all duration-200">
      <div className="flex justify-between items-start mb-3">
        {suggestion.type.map(
          (type) =>
            <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full border ${typeColors[type]}`}>
              {SuggestionTypeLabelsConstant[type]}
            </span>
          )}
        <div className="text-right text-sm text-gray-500">
          <div className="flex items-center space-x-1 mb-1">
            <User className="h-4 w-4" />
            <span>{suggestion.author}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(suggestion.createdAt)}</span>
          </div>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{suggestion.title}</h3>
      <p className="text-gray-600 mb-4 leading-relaxed">{suggestion.description}</p>
      
      <div className="flex items-center space-x-1 text-sm text-gray-500 mb-4">
        <MapPin className="h-4 w-4" />
        <span>
          {suggestion.position.lat.toFixed(4)}, {suggestion.position.lng.toFixed(4)}
        </span>
      </div>
      
      {/* Vote progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Popularité</span>
          <span>{totalVotes} vote{totalVotes !== 1 ? 's' : ''}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${upvotePercentage}%` }}
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleVote('up')}
            disabled={!user?.isAuthenticated}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              suggestion.userVote === 'up'
                ? 'bg-green-100 text-green-700 border border-green-200'
                : 'text-gray-600 hover:bg-gray-100 border border-gray-200'
            } ${!user?.isAuthenticated ? 'cursor-not-allowed opacity-50' : 'hover:shadow-sm'}`}
          >
            <ThumbsUp className="h-4 w-4" />
            <span className="font-medium">{suggestion.votes.up}</span>
          </button>
          
          <button
            onClick={() => handleVote('down')}
            disabled={!user?.isAuthenticated}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              suggestion.userVote === 'down'
                ? 'bg-red-100 text-red-700 border border-red-200'
                : 'text-gray-600 hover:bg-gray-100 border border-gray-200'
            } ${!user?.isAuthenticated ? 'cursor-not-allowed opacity-50' : 'hover:shadow-sm'}`}
          >
            <ThumbsDown className="h-4 w-4" />
            <span className="font-medium">{suggestion.votes.down}</span>
          </button>
        </div>
        
        {!user?.isAuthenticated && (
          <span className="text-sm text-gray-400">Connectez-vous pour voter</span>
        )}
      </div>
    </div>
  );
};

export default SuggestionCard;