import { Comments, CreateIdea, Idea, Suggestion } from "../../types";
import { SuggestionTypeEnum } from "../../types/suggestion-type.enum";
import { transformCommentForFrontend } from "./comment.utils";

export const suggestionToIdea = (suggestion: Suggestion): CreateIdea => {
  console.log(suggestion.position);
  return {
    title: suggestion.title,
    description: suggestion.description,
    category: suggestion.type[0] as SuggestionTypeEnum,
    latitude: suggestion.position.lat,
    longitude: suggestion.position.lng,
    zone: 1,
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

  const comments: Comments[] = idea.comments.map((comment) => {
    return transformCommentForFrontend(comment);
  });

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
    comments: comments,
    status: idea.status,
  };
};
