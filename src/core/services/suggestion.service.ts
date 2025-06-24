import { CreateIdea } from "../../types";
import Api from "../api";

export class SuggestionService {
  static async getAllSuggestion() {
    const ideas = Api.get("/ideas");
    return ideas;
  }

  static async saveIdea(idea: CreateIdea) {
    try {
      const response = await Api.post("/ideas/", idea);
      return response.data;
    } catch (error) {
      console.warn("Saving suggestion error:", error);
      throw error;
    }
  }

  static async voteSuggestion(suggestionId: string, isPositive: boolean) {
    try {
      const response = await Api.post(`/ideas/${suggestionId}/vote/`, {
        is_positive: isPositive,
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors du vote sur l'idée :", error);
      throw error;
    }
  }
}
