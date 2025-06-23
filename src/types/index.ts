export interface Suggestion {
  id: string;
  title: string;
  description: string;
  type: 'transport' | 'amenagement' | 'environnement' | 'social';
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
  user: User | null;
  addSuggestion: (suggestion: Omit<Suggestion, 'id' | 'votes' | 'createdAt'>) => void;
  voteSuggestion: (id: string, voteType: 'up' | 'down') => void;
  setUser: (user: User) => void;
  login: (email: string, password:string) => void;
  logout: () => void;
}

export type Tokens = {
  access: string;
  refreshToken: string;
}