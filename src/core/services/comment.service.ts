import { BackendComment } from "../../types";
import Api from "../api";

export class CommentService {
    static async getCommentsBySuggestion(idSuggestion: string): Promise<BackendComment[]> {
        return Api.get(`/ideas/${idSuggestion}/comments`);
    }
}