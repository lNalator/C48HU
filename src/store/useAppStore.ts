import { create } from "zustand";
import { AppState, Comments, Suggestion, User } from "../types";
import userService from "../core/services/user.service";
import { SuggestionService } from "../core/services/suggestion.service";
import { Idea } from "../core/models/idea";
import { mockSuggestions } from "../data/mockData";

export const useAppStore = create<AppState>((set, get) => ({
  suggestions: [],
  user: null,

  fetchSuggestions: async () => {
    try {
      const result = await SuggestionService.getAllSuggestion();
      const ideas: Idea[] = result.results;
      console.log(ideas);
      const suggestions: Suggestion[] = ideas.map(
        (idea) => ({
          id: idea.id.toString(),
          title: idea.title,
          description: '', //ajouter la description à idea
          type: [idea.category],
          position: {
            lat: Number(idea.latitude),
            lng: Number(idea.longitude),
          },
          votes: {
            up: idea.positive_votes,
            down: idea.negative_votes,
          },
          author: idea.author_email,
          createdAt: idea.created_at,
          userVote: null,
          comments: [],
          status: idea.status,
        }) 
      );
      suggestions.push(...mockSuggestions);
      set({ suggestions });
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
    }
  },

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
    if (!user) return;

    set((state) => ({
      suggestions: state.suggestions.map((suggestion) => {
        if (suggestion.id !== id) return suggestion;

        const currentVote = suggestion.userVote;
        let newVotes = { ...suggestion.votes };
        let newUserVote: "up" | "down" | null = null;

        // Remove previous vote if exists
        if (currentVote === "up") newVotes.up--;
        if (currentVote === "down") newVotes.down--;

        // Add new vote if different from current
        if (currentVote !== voteType) {
          if (voteType === "up") {
            newVotes.up++;
            newUserVote = "up";
          } else {
            newVotes.down++;
            newUserVote = "down";
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

  setUser: (user: User) => {
    set({ user });
  },

  login: async (email, password) => {
    try {
      const user = await userService.login(email, password);
      set({ user });
    } catch (error) {
      console.error("Login failed:", error);
    }
  },

  logout: () => {
    userService
      .logout()
      .then(() => {
        set({ user: null });
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  },

  isAuthenticated: () => {
    const { user } = get();
    return user !== null && !user.is_anonymous;
  },

  getUserById: (userId: string) => {
    const { user } = get();
    return user?.id === userId ? user : null;
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
