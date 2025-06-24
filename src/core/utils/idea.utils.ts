import { Idea, Suggestion } from "../../types";
import { SuggestionTypeEnum } from "../../types/suggestion-type.enum";

export const suggestionToIdea = (suggestion: Suggestion): Idea => {
  return {
    id: Number(suggestion.id),
    title: suggestion.title,
    description: suggestion.description,
    category: suggestion.type[0] as SuggestionTypeEnum,
    position: suggestion.position,
    votesStats: suggestion.votes,
    author: { username: suggestion.author, name: suggestion.author },
    created_at: suggestion.createdAt,
    comments: [],
    status: suggestion.status ? suggestion.status : "proposed",
  };
};

export const ideaToSuggestion = (idea: Idea): Suggestion => {
  const rawCategory = idea.category.toLowerCase();

  const categoryEnum = Object.values(SuggestionTypeEnum).find(
    (value) => value === rawCategory
  ) as SuggestionTypeEnum | undefined;

  if (!categoryEnum) {
    console.warn("Unknown category:", idea.category);
  }

  return {
    id: idea.id.toString(),
    title: idea.title,
    description: idea.description,
    type: categoryEnum ? [categoryEnum] : [],
    position: idea.position,
    votes: idea.votesStats,
    author: idea.author.username,
    createdAt: idea.created_at,
    userVote: null,
    comments: idea.comments || [],
    status: idea.status,
  };
};
