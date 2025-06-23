import { create } from "zustand";
import { AppState, Suggestion, User } from "../types";
import { mockSuggestions } from "../data/mockData";
import Api from "../core/api";
import userService from "../core/services/user.service";

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
}));
