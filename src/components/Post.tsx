import React, { useState } from "react";
import { ThumbsUp, MessageCircle, Clock, Tag } from "lucide-react";
import { Post as PostType } from "../types";
import { Comment } from "./Comment";
import { CommentForm } from "./CommentForm";
import { formatDate } from "../utils/formatDate";

// Interface defining the props for the Post component
interface PostProps {
  post: PostType;
  onComment: (postId: string, content: string) => void;
  onReply: (commentId: string, content: string) => void;
}

export function Post({ post, onComment, onReply }: PostProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="font-semibold">{post.author.name}</h3>
            <div className="text-gray-500 text-sm flex items-center gap-1">
              <Clock size={14} />
              {formatDate(post.createdAt)}
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-3">{post.title}</h2>
        <p className="text-gray-700 mb-4">{post.content}</p>

        {post.media && post.media.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            {post.media.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Post media ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg"
              />
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-[#1a58a5] text-sm"
            >
              <Tag size={14} />
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 border-t border-b border-gray-200 py-3">
          <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500">
            <ThumbsUp size={20} />
            <span>{post.likes}</span>
          </button>
          <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500">
            <MessageCircle size={20} />
            <span>{post.comments.length}</span>
          </button>
        </div>

        <div className="mt-6">
          <h4 className="font-semibold mb-4">Comments</h4>
          <CommentForm
            onSubmit={(content) => onComment(post.id, content)}
            placeholder="Write a comment..."
          />
          <div className="mt-6 space-y-6">
            {post.comments.map((comment) => (
              <Comment key={comment.id} comment={comment} onReply={onReply} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
