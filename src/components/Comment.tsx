import React, { useState } from "react";
import { MessageCircle, ThumbsUp, Clock, AlertCircle } from "lucide-react";
import { Comment as CommentType } from "../types";
import { CommentForm } from "./CommentForm";
import { formatDate } from "../utils/formatDate";

// Interface defining the props for the Comment component
interface CommentProps {
  comment: CommentType;
  onReply: (commentId: string, content: string) => void;
  depth?: number;
  maxDepth?: number;
}

export function Comment({
  comment,
  onReply,
  depth = 4,
  maxDepth = 20,
}: CommentProps) {
  const [showReplyForm, setShowReplyForm] = useState<boolean>(false);
  
  const isMaxDepthReached = depth >= maxDepth;
  
  // Function to handle the reply submission
  const handleReply = (content: string) => {
    onReply(comment.id, content);
    setShowReplyForm(false); // Hide the reply form after submission
  };
  

  const indentationClasses = [
    '',
    'ml-8 border-l-2 border-blue-200 pl-4',
    'ml-8 border-l-2 border-purple-200 pl-4',
    'ml-8 border-l-2 border-pink-200 pl-4',
    'ml-8 border-l-2 border-orange-200 pl-4',
    'ml-8 border-l-2 border-green-200 pl-4',
    'ml-8 border-l-2 border-purple-200 pl-4',
  ];

  return (
    <div className={depth > 0 ? indentationClasses[Math.min(depth, 6)] : ""}>
      <div className="flex items-start gap-3 mb-4">
        <img
          src={comment.author.avatar}
          alt={comment.author.name}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold">{comment.author.name}</span>
              <span className="text-gray-500 text-sm flex items-center gap-1">
                <Clock size={14} />
                {formatDate(comment.createdAt)}
              </span>
            </div>
            <p className="text-gray-700">{comment.content}</p>
            <div className="flex items-center gap-4 mt-3">
              <button className="text-gray-500 hover:text-blue-500 flex items-center gap-1">
                <ThumbsUp size={16} />
                {comment.likes}
              </button>
              {!isMaxDepthReached ? (
                <button
                  onClick={() => setShowReplyForm(!showReplyForm)}
                  className="text-gray-500 hover:text-blue-500 flex items-center gap-1"
                >
                  <MessageCircle size={16} />
                  Reply
                </button>
              ) : (
                <div className="flex items-center gap-1 text-orange-500 text-sm">
                  <AlertCircle size={16} />
                  Max reply depth reached
                </div>
              )}
            </div>
          </div>
          {showReplyForm && !isMaxDepthReached && (
            <div className="mt-3">
              <CommentForm
                onSubmit={handleReply}
                placeholder="Write a reply..."
              />
            </div>
          )}
        </div>
      </div>
      {comment.replies.map((reply) => (
        <Comment
          key={reply.id}
          comment={reply}
          onReply={onReply}
          depth={depth + 1}
          maxDepth={maxDepth}
        />
      ))}
    </div>
  );
}
