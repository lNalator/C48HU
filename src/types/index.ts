import { SuggestionStatusEnum } from "./suggestion-status.enum";
import { SuggestionTypeEnum } from "./suggestion-type.enum";

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  type: SuggestionTypeEnum[] | string[];
  position: {
    lat: number;
    lng: number;
  };
  votes: {
    total: number;
    up: number;
    down: number;
  };
  author: string;
  createdAt: string;
  userVote?: "up" | "down" | null;
  comments?: Comments[];
  status?: SuggestionStatusEnum | string;
}

export interface Idea {
  id: number;
  title: string;
  description: string;
  category: SuggestionTypeEnum;
  status: string;
  author: {
    username: string;
    name: string;
  };
  position: {
    lat: number;
    lng: number;
  };
  zone?: Zone;
  votesStats: {
    total: number;
    up: number;
    down: number;
  };
  comments: [];
  created_at: string;
}

export interface CreateIdea {
  title: string;
  description: string;
  category: string;
  latitude: number;
  longitude: number;
  zone: number;
}

export interface Zone {
  id: number;
  name: string;
  zone_type: string;
  zone_type_display: string;
  latitude: string;
  longitude: string;
  description: string;
  created_at: string;
  idea_count: number;
}

export interface User {
  id: string;
  created_at: string;
  email: string;
  username: string;
  is_anonymous: boolean;
}

export interface AppState {
  suggestions: Suggestion[];
  userSuggestions: Suggestion[];
  user: User | null;
  addSuggestion: (
    suggestion: Omit<Suggestion, "id" | "votes" | "createdAt">
  ) => void;
  getUserSuggestions: () => void;
  voteSuggestion: (id: string, voteType: "up" | "down") => void;
  setUser: (user: User) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  addComment: (suggestionId: string, comment: Comments) => void;
  voteComment: (
    suggestionId: string,
    commentId: string,
    voteType: "up" | "down"
  ) => void;
  fetchSuggestions: () => Promise<void>;
}

export interface Comments {
  id: string;
  userName: string;
  votes: Votes;
  comments: string;
  userVotes?: {
    [userId: string]: "up" | "down";
  };
}

export interface Votes {
  up: number;
  down: number;
}

export interface BackendComment {
  id: number;
  idea: number;
  user: { id: number, username: string, name: string };
  content: string;
  created_at: string;
  updated_at: string;
  votes: BackendCommentVote[];
}

export interface BackendCommentVote {
  id: number;
  comment: number;
  user: { id: number, username: string, name: string };
  isPositive: boolean;
}

export type Tokens = {
  access: string;
  refresh: string;
};
