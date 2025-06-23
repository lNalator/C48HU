import { Suggestion } from "../../types";
import Api from "../api";

export class SuggestionService {
    static async getAllSuggestion(): Promise<Suggestion[]> {
        return Api.get('suggestions');
    }

    static async saveSuggestion() {
        
    }
}