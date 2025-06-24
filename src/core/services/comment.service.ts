import { BackendComment } from "../../types";
import Api from "../api";

export class CommentService {
    static async getCommentsBySuggestion(idSuggestion: string): Promise<BackendComment[]> {
        return Api.get(`/ideas/${idSuggestion}/comments`);
    }

    static async saveComment(idSuggestion: string, content: string) {
        try{
            Api.post(`/ideas/${idSuggestion}/comments`, { content: content });
        } catch (error) {
            console.warn(`Error when saving comment for ${idSuggestion} :`, error);
        }
    }
}