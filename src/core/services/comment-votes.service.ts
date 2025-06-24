import Api from "../api";

export class CommentVotesService {
    static async addVote(idComment: string, isPositive: boolean) {
        try {
            Api.post(`/comments/${idComment}/vote/`, { is_positive: isPositive });
        } catch (error) {
            console.warn(`Error adding comment vote for ${idComment}`, error);
        }
    }
}