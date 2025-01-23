import React, { useState, useEffect } from "react";
import { Send } from "lucide-react";

// Interface defining the props for the CommentForm component
interface CommentFormProps {
  onSubmit: (content: string) => void;
  placeholder?: string;
}

export function CommentForm({
  onSubmit,
  placeholder = "Write a comment...",
}: CommentFormProps) {
  const [content, setContent] = useState<string>("");

  // Handler for form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the content is not just whitespace
    if (content.trim()) {
      onSubmit(content);
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        type="submit"
        aria-label="Back to top"
        className="px-4 py-2 bg-[#2f9be0] text-white rounded-lg hover:bg-[#1a58a5] transition-colors flex items-center gap-2"
      >
        <Send size={18} />
        Send
      </button>
    </form>
  );
}
