import React from 'react';
import { X } from 'lucide-react';
import { Comments } from '../../types';

interface CommentModalProps {
  title: string;
  suggestionId: string;
  onClose: () => void;
}

import { useState } from "react";
import { useAppStore } from '../../store/useAppStore';
import ErrorDisplayer from '../Errors/ErrorDisplayer';


const CommentModal: React.FC<CommentModalProps> = ({ title, suggestionId, onClose }) => {
    const suggestion = useAppStore(
        (state) => state.suggestions.find((s) => s.id === suggestionId)
      );
    const comments: Comments[] = suggestion?.comments || [];
    const [newComment, setNewComment] = useState('');
    const { user, addComment, voteComment } = useAppStore();
    const [error, setError] = useState('');
    
    const handleAddComment = () => {
      if (!newComment.trim()) return;
      if (!user) {
        setError('Vous devez être connecté pour commenter.');
        return;
      }

      const newId: string =
        suggestion?.comments && suggestion.comments.length > 0
        ? (suggestion.comments.length + 1).toString()
        : '1';


      const comment = {
        id: newId,
        userName: user?.username ?? 'Unknown',
        votes: { up: 0, down: 0 },
        comments: newComment.trim(),
      };
    
      addComment(suggestionId, comment);
      setNewComment('');
    };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl h-[90vh] overflow-y-auto relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black">
          <X />
        </button>

        <h2 className="text-xl font-bold mb-4">Commentaires pour : {title}</h2>

        {comments.length === 0 ? (
          <p className="text-gray-500 italic">Aucun commentaire pour l’instant.</p>
        ) : (
          <ul className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {comments.map((comment, idx) => (
              <li key={idx} className="border border-gray-200 p-3 rounded">
                <div className="text-sm text-gray-500 flex justify-between">
                    <span>{comment.userName}</span>
                </div>
                <div className="text-gray-800 mb-1">{comment.comments}</div>
                <div className="text-sm text-gray-500 flex justify-between items-center mt-2">
                    <div className="flex items-center gap-2">
                        <button
                        onClick={() => voteComment(suggestionId, comment.id, 'up')}
                        disabled={!user}
                        className="text-green-600 hover:text-green-800 text-sm disabled:opacity-50"
                        >
                        👍 {comment.votes.up}
                        </button>
                        <button
                        onClick={() => voteComment(suggestionId, comment.id, 'down')}
                        disabled={!user}
                        className="text-red-600 hover:text-red-800 text-sm disabled:opacity-50"
                        >
                        👎 {comment.votes.down}
                        </button>
                    </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-6">
        <textarea
            className="w-full border rounded-md p-2 text-sm resize-none"
            rows={3}
            placeholder="Écrivez un commentaire..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
        />
        <ErrorDisplayer error={error} />
        <button
            onClick={handleAddComment}
            disabled={!newComment.trim()}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
            Ajouter un commentaire
        </button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
