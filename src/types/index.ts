import { SuggestionStatusEnum } from "./suggestion-status.enum";
import { SuggestionTypeEnum } from "./suggestion-type.enum";

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  type: SuggestionTypeEnum[];
  position: {
    lat: number;
    lng: number;
  };
  votes: {
    up: number;
    down: number;
  };
  author: string;
  createdAt: string;
  userVote?: 'up' | 'down' | null;
  comments?: Comments[];
  status: SuggestionStatusEnum;
}

export interface User {
  id: string;
  name: string;
  isAuthenticated: boolean;
}

export interface AppState {
  suggestions: Suggestion[];
  user: User | null;
  addSuggestion: (suggestion: Omit<Suggestion, 'id' | 'votes' | 'createdAt'>) => void;
  voteSuggestion: (id: string, voteType: 'up' | 'down') => void;
  login: (username: string) => void;
  logout: () => void;
  addComment: (suggestionId: string, comment: Comments) => void;
  voteComment: (suggestionId: string, commentId: string, voteType: 'up' | 'down') => void;
}

export interface Comments {
  id: string;
  userName: string;
  votes: {
    up: number;
    down: number;
  };
  comments: string;
  userVotes?: {
    [userId: string]: 'up' | 'down';
  };
}