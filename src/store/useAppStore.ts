import { create } from 'zustand';
import { AppState, Comments, Suggestion, User } from '../types';
import { mockSuggestions } from '../data/mockData';

export const useAppStore = create<AppState>((set, get) => ({
  suggestions: mockSuggestions,
  user: null,

  addSuggestion: (newSuggestion) => {
    const suggestion: Suggestion = {
      ...newSuggestion,
      id: crypto.randomUUID(),
      votes: { up: 0, down: 0 },
      createdAt: new Date().toISOString(),
      userVote: null,
    };
    
    set((state) => ({
      suggestions: [...state.suggestions, suggestion],
    }));
  },

  voteSuggestion: (id, voteType) => {
    const { user } = get();
    if (!user?.isAuthenticated) return;

    set((state) => ({
      suggestions: state.suggestions.map((suggestion) => {
        if (suggestion.id !== id) return suggestion;

        const currentVote = suggestion.userVote;
        let newVotes = { ...suggestion.votes };
        let newUserVote: 'up' | 'down' | null = null;

        // Remove previous vote if exists
        if (currentVote === 'up') newVotes.up--;
        if (currentVote === 'down') newVotes.down--;

        // Add new vote if different from current
        if (currentVote !== voteType) {
          if (voteType === 'up') {
            newVotes.up++;
            newUserVote = 'up';
          } else {
            newVotes.down++;
            newUserVote = 'down';
          }
        }

        return {
          ...suggestion,
          votes: newVotes,
          userVote: newUserVote,
        };
      }),
    }));
  },

  login: (username) => {
    const user: User = {
      id: crypto.randomUUID(),
      name: username,
      isAuthenticated: true,
    };
    set({ user });
  },

  logout: () => {
    set({ user: null });
  },

  addComment: (suggestionId: string, comment: Comments) => {
    set((state) => {
      const updatedSuggestions = state.suggestions.map((suggestion) =>
        suggestion.id === suggestionId
          ? { ...suggestion, comments: [...(suggestion.comments || []), comment] }
          : suggestion
      );
      return { suggestions: updatedSuggestions };
    });
  },

  voteComment: (suggestionId: string, commentId: string, voteType: 'up' | 'down') =>
    set((state) => {
      const userId = state.user?.id;
      if (!userId) return state;
      const suggestions = [...state.suggestions];
      const suggestion = suggestions.find(s => s.id === suggestionId);
      if (!suggestion || !suggestion.comments) return state;
  
      const comment = suggestion.comments.find(comment => comment.id === commentId);
      if(!comment){
        return state;
      }

      if (!comment.userVotes) comment.userVotes = {};
      const previousVote = comment.userVotes[userId];
      if (previousVote === voteType) return state;

      if (previousVote) {
        comment.votes[previousVote] -= 1;
      }
  
      // Add new vote
      comment.userVotes[userId] = voteType;
      comment.votes[voteType] += 1;
  
      return { suggestions };
    }),
  
}));