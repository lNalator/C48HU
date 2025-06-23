import { Suggestion } from "../../types";
import Api from "../api";

export class SuggestionService {
    static async getAllSuggestion() {
        const ideas = Api.get('/ideas');
        return ideas;
    }

    static async saveSuggestion(suggestion: Suggestion) {
        try {
            const body = { ideas: suggestion };
            Api.post('/save/ideas', body);
        } catch(error) {
            console.warn("Saving suggestion error:", error);
        }
    }
}