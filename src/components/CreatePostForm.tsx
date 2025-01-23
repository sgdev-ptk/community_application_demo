import React, { useState, useRef } from "react";
import { Send, X, Upload } from "lucide-react";

// Interface defining the props for the CreatePostForm component
interface CreatePostFormProps {
  onSubmit: (
    title: string,
    content: string,
    tags: string[],
    media: string[]
  ) => void;
}

export function CreatePostForm({ onSubmit }: CreatePostFormProps) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [mediaError, setMediaError] = useState<string>("");

  // Reference for the file input element
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Function to validate if the uploaded file is an image of valid type
  const validateImageFile = (file: File): boolean => {
    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    return validTypes.includes(file.type);
  };

  // Handler for file input change event
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Process each selected file
    Array.from(files).forEach((file) => {
      // Validate the file type
      if (!validateImageFile(file)) {
        setMediaError("Please select only image files (JPEG, PNG, or GIF)");
        return;
      }

      // Check the file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMediaError("Image size should be less than 5MB");
        return;
      }

      // Create a FileReader to read the file
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          // Add the image URL to the mediaUrls state
          setMediaUrls((prev) => [...prev, e.target!.result as string]);
          setMediaError("");
        }
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    });

    // Reset file input after processing
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handler to remove a media item from the mediaUrls state
  const handleRemoveMedia = (index: number) => {
    setMediaUrls(mediaUrls.filter((_, i) => i !== index));
  };

  // Handler for form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Check if title and content are not empty
    if (title.trim() && content.trim()) {
      // Split tags by comma, trim whitespace, and filter out empty values
      const tagList = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
      onSubmit(title, content, tagList, mediaUrls);
      setTitle("");
      setContent("");
      setTags("");
      setMediaUrls([]);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-md p-6 mb-6 w-[400px] sticky top-28 form"
    >
      <h2 className="text-xl font-bold mb-4">Create a New Post</h2>
      <div className="space-y-4">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post..."
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <div className="flex gap-2 mb-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/jpeg,image/png,image/gif"
              multiple
              className="hidden"
              id="media-upload"
            />
            <label
              htmlFor="media-upload"
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 cursor-pointer border border-gray-400 border-dashed min-h-16"
            >
              <Upload size={24} />
              Click to Upload Images
            </label>
          </div>
          {mediaError && (
            <p className="text-red-500 text-sm mt-1">{mediaError}</p>
          )}
          {mediaUrls.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              {mediaUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Media ${index + 1}`}
                    className="w-full object-contain rounded-lg aspect-square"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveMedia(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Tags (comma-separated)"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-[#2f9be0] text-white rounded-lg hover:bg-[#1a58a5] transition-colors flex items-center justify-center gap-2 min-h-12"
        >
          <Send size={18} />
          Create Post
        </button>
      </div>
    </form>
  );
}
