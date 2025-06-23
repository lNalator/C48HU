import { Suggestion } from '../types';
import { SuggestionTypeEnum } from '../types/suggestion-type.enum';

export const mockSuggestions: Suggestion[] = [
  {
    id: '1',
    title: 'Piste cyclable Avenue de la République',
    description: 'Créer une piste cyclable sécurisée sur toute la longueur de l\'avenue pour encourager les déplacements à vélo.',
    type: [SuggestionTypeEnum.TRANSPORT, SuggestionTypeEnum.ENVIRONEMENT, SuggestionTypeEnum.SOCIAL, SuggestionTypeEnum.AMENAGEMENT],
    position: { lat: 48.8566, lng: 2.3522 },
    votes: { up: 24, down: 3 },
    author: 'Marie Dubois',
    createdAt: '2024-01-15T10:30:00Z',
    userVote: null,
    comments: [
      {
        id: '1',
        userName: 'Enzo',
        votes: {
          up: 10,
          down: 254,
        },
        comments: 'Pas ouf, je suis un gros nullos',
      }
    ]
  },
  {
    id: '2',
    title: 'Bancs publics Place du Marché',
    description: 'Installer des bancs pour permettre aux personnes âgées et aux familles de se reposer lors des courses au marché.',
    type: [SuggestionTypeEnum.AMENAGEMENT],
    position: { lat: 48.8576, lng: 2.3512 },
    votes: { up: 18, down: 1 },
    author: 'Jean Martin',
    createdAt: '2024-01-12T14:20:00Z',
    userVote: null,
  },
  {
    id: '3',
    title: 'Jardin partagé Rue des Lilas',
    description: 'Transformer le terrain vague en jardin partagé pour renforcer les liens sociaux du quartier.',
    type: [SuggestionTypeEnum.ENVIRONEMENT],
    position: { lat: 48.8586, lng: 2.3532 },
    votes: { up: 31, down: 2 },
    author: 'Claire Rousseau',
    createdAt: '2024-01-10T09:15:00Z',
    userVote: null,
  },
  {
    id: '4',
    title: 'Aire de jeux pour enfants',
    description: 'Créer une aire de jeux moderne et sécurisée pour les enfants du quartier avec équipements adaptés.',
    type: [SuggestionTypeEnum.SOCIAL],
    position: { lat: 48.8556, lng: 2.3542 },
    votes: { up: 42, down: 5 },
    author: 'Pierre Moreau',
    createdAt: '2024-01-08T16:45:00Z',
    userVote: null,
  },
  {
    id: '5',
    title: 'Station vélos en libre-service',
    description: 'Installer une station de vélos partagés près du métro pour faciliter les déplacements multimodaux.',
    type: [SuggestionTypeEnum.TRANSPORT],
    position: { lat: 48.8546, lng: 2.3552 },
    votes: { up: 19, down: 8 },
    author: 'Sophie Durand',
    createdAt: '2024-01-05T11:30:00Z',
    userVote: null,
  },
  {
    id: '6',
    title: 'Éclairage LED écologique',
    description: 'Remplacer l\'éclairage public par des LED pour réduire la consommation énergétique et améliorer la visibilité.',
    type: [SuggestionTypeEnum.ENVIRONEMENT],
    position: { lat: 48.8596, lng: 2.3502 },
    votes: { up: 15, down: 3 },
    author: 'Thomas Petit',
    createdAt: '2024-01-03T13:20:00Z',
    userVote: null,
  },
];