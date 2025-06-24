import { create } from "zustand";
import { AppState, Comments, Idea, Suggestion, User } from "../types";
import AuthService from "../core/services/auth.service";
import userService from "../core/services/user.service";
import { SuggestionService } from "../core/services/suggestion.service";
import { SuggestionTypeEnum } from "../types/suggestion-type.enum";
import { ideaToSuggestion, suggestionToIdea } from "../core/utils/idea.utils";

export const useAppStore = create<AppState>((set, get) => ({
  suggestions: [],
  userSuggestions: [],
  user: null,

  fetchSuggestions: async () => {
    try {
      const result = await SuggestionService.getAllSuggestion();
      const ideas: Idea[] = result.results;
      const suggestions: Suggestion[] = ideas.map((idea: Idea) => {
        return ideaToSuggestion(idea);
      });

      set({ suggestions });
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
    }
  },

  addSuggestion: async (newSuggestion) => {
    const suggestion: Suggestion = {
      ...newSuggestion,
      id: crypto.randomUUID(), // ID temporaire local
      votes: { total: 0, up: 0, down: 0 },
      createdAt: new Date().toISOString(),
      userVote: null,
    };

    const idea = suggestionToIdea(suggestion);

    set((state) => ({
      suggestions: [...state.suggestions, suggestion],
    }));

    try {
      await SuggestionService.saveIdea(idea);
    } catch (error) {
      console.warn("Saving suggestion error:", error);
    }
  },

  getUserSuggestions: async () => {
    const { user } = get();
    if (!user) return;

    try {
      const userSuggestions = await userService
        .getUserSuggestions(user.id)
        .then((response) => {
          return response.results.map((idea: Idea) => {
            return ideaToSuggestion(idea);
          });
        });
      if (!userSuggestions) {
        console.warn("No suggestions found for user:", user.id);
        return;
      }
      set({ userSuggestions: userSuggestions });
    } catch (error) {
      console.warn("Error fetching suggestions by author:", error);
    }
  },

  voteSuggestion: (id, voteType) => {
    const { user } = get();
    if (!user) return;

    const currentState = get();
    const currentSuggestion = currentState.suggestions.find((s) => s.id === id);
    if (!currentSuggestion) return;

    const currentVote = currentSuggestion.userVote;
    let newVotes = { ...currentSuggestion.votes };
    let newUserVote: "up" | "down" | null = null;

    if (currentVote === "up") newVotes.up--;
    if (currentVote === "down") newVotes.down--;

    if (currentVote !== voteType) {
      if (voteType === "up") {
        newVotes.up++;
        newUserVote = "up";
      } else {
        newVotes.down++;
        newUserVote = "down";
      }
    }

    set((state) => ({
      suggestions: state.suggestions.map((suggestion) =>
        suggestion.id === id
          ? {
              ...suggestion,
              votes: newVotes,
              userVote: newUserVote,
            }
          : suggestion
      ),
    }));

    try {
      SuggestionService.voteSuggestion(
        id,
        newUserVote !== null && newUserVote === "up"
      );
    } catch (error) {
      console.error("Échec du vote côté serveur, réversion possible si besoin");
    }
  },

  setUser: (user: User) => {
    set({ user });
  },

  login: async (email, password) => {
    try {
      const user = await AuthService.login(email, password);
      set({ user });
    } catch (error) {
      console.error("Login failed:", error);
    }
  },

  logout: () => {
    AuthService.logout()
      .then(() => {
        set({ user: null });
      })
      .catch((error: any) => {
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
          ? {
              ...suggestion,
              comments: [...(suggestion.comments || []), comment],
            }
          : suggestion
      );
      return { suggestions: updatedSuggestions };
    });
  },

  voteComment: (
    suggestionId: string,
    commentId: string,
    voteType: "up" | "down"
  ) =>
    set((state) => {
      const userId = state.user?.id;
      if (!userId) return state;
      const suggestions = [...state.suggestions];
      const suggestion = suggestions.find((s) => s.id === suggestionId);
      if (!suggestion || !suggestion.comments) return state;

      const comment = suggestion.comments.find(
        (comment) => comment.id === commentId
      );
      if (!comment) {
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
