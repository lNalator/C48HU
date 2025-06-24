import { BackendComment, BackendCommentVote, Comments, Votes } from "../../types";

export const transformCommentForFrontend = (comment: BackendComment): Comments => {
    const votes: Votes = { up: 0, down: 0 };
    let userVotes: Record<string, 'up' | 'down'> = {} ;
    comment.votes.forEach((vote) => {
        const voteUserId: string = vote.user.id.toString();
        if(vote.isPositive) {
            votes.up += 1;
            userVotes = {...userVotes, [voteUserId]: 'up'};
        } else {
            votes.down += 1;
            userVotes = {...userVotes, [voteUserId]: 'down'};
        }
    });
    return {
        id: comment.id.toString(),
        userName: comment.user.username,
        votes: votes,
        comments: comment.content,
        userVotes: userVotes,
    }
}

export const transformCommentForBackend = (comment: Comments, idSuggestion: string): BackendComment => {
    const votes: BackendCommentVote[] = [];
    if(comment.userVotes) {
        for(const [userId, vote] of Object.entries(comment.userVotes)) {
            votes.push({
                id: Number(userId),
                comment: Number(comment.id),
                user: { id: Number(userId), username: '', name: '' },
                isPositive: vote === 'up',
            });
        }
    }
    return {
        id: Number(comment.id),
        idea: Number(idSuggestion),
        user: { id: 0, username: comment.userName, name: '' },
        content: comment.comments,
        created_at: '',
        updated_at: '',
        votes: votes,
    }
}