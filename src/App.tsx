import React, { useRef, useState } from "react";
import { Post as PostComponent } from "./components/Post";
import { CreatePostForm } from "./components/CreatePostForm";
import { mockPosts } from "./data/mockData";
import { Post, Comment } from "./types";

import logo from "/assets/images/logo.png";
import useWindowScroll from "./hooks/useWindowScroll";

function App() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  const scroll = useWindowScroll();

  // Create a reference for the top section of the component
  const topSectionRef = useRef<HTMLDivElement | null>(null); // Properly typed reference for a div element

  const handleTop = () => {
    window.scrollTo({
      top: 0, // Scroll to the top of the page
      behavior: "smooth", // Smooth scrolling
    });
  };

  // Create a new post function
  const handleCreatePost = (
    title: string,
    content: string,
    tags: string[],
    media: string[]
  ) => {
    // Create a new post object with the provided details
    const newPost: Post = {
      id: String(Date.now()), // Unique ID based on the current timestamp
      title,
      content,
      author: {
        id: "1",
        name: "Alex Thompson",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", // Author avatar URL
      },
      createdAt: new Date().toISOString(), // Timestamp of post creation
      comments: [],
      likes: 0,
      tags,
      media,
    };

    // Update the posts state with the new post added to the beginning of the list
    setPosts([newPost, ...posts]);

    // Call a function to handle scroll up actions after creating the post
    handleTop();
  };

  // Add a post comments
  const handleComment = (postId: string, content: string) => {
    // Update the posts state by mapping over the existing posts
    setPosts(
      posts.map((post) => {
        // Check if the current post matches the postId
        if (post.id === postId) {
          // Create a new comment object with the provided content
          const newComment: Comment = {
            id: String(Date.now()), // Unique ID based on the current timestamp
            content,
            author: {
              id: "1",
              name: "Alex Thompson",
              avatar:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", // Author avatar URL
            },
            createdAt: new Date().toISOString(), // Timestamp of comment creation
            replies: [],
            likes: 0,
          };

          // Return the updated post with the new comment added to the comments array
          return {
            ...post,
            comments: [newComment, ...post.comments], // Add the new comment to the beginning of the comments array
          };
        }
        // Return the post unchanged if it does not match the postId
        return post;
      })
    );
  };

  // Add a post comments reply and re-reply
  const handleReply = (commentId: string, content: string) => {
    // Update the posts state by mapping over the existing posts
    setPosts(
      posts.map((post) => ({
        ...post,
        comments: post.comments.map((comment) => {
          // Check if the current comment matches the commentId
          if (comment.id === commentId) {
            // Create a new reply object with the provided content
            const newReply: Comment = {
              id: String(Date.now()), // Unique ID based on the current timestamp
              content,
              author: {
                id: "1",
                name: "Alex Thompson",
                avatar:
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", // Author avatar URL
              },
              createdAt: new Date().toISOString(), // Timestamp of reply creation
              replies: [],
              likes: 0,
            };

            // Return the updated comment with the new reply added to the replies array
            return {
              ...comment,
              replies: [...comment.replies, newReply], // Add the new reply to the existing replies
            };
          }

          // If the comment has replies, check each reply
          const updatedReplies = comment.replies.map((reply) => {
            // Check if the current reply matches the commentId
            if (reply.id === commentId) {
              // Create a new reply object with the provided content
              const newReply: Comment = {
                id: String(Date.now()), // Unique ID based on the current timestamp
                content,
                author: {
                  id: "1",
                  name: "Alex Thompson",
                  avatar:
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", // Author avatar URL
                },
                createdAt: new Date().toISOString(), // Timestamp of reply creation
                replies: [],
                likes: 0,
              };

              // Return the updated reply with the new reply added to the replies array
              return {
                ...reply,
                replies: [...reply.replies, newReply], // Add the new reply to the existing replies
              };
            }
            return reply;
          });

          // Return the comment with updated replies
          return {
            ...comment,
            replies: updatedReplies,
          };
        }),
      }))
    );
  };

  return (
    <div className={`min-h-screen main_container_wrapper`}>
      <header
        className={`bg-white shadow-sm sticky top-0 ${
          scroll > 20 ? " onscroll" : ""
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 py-3 h-20">
          <div className="flex items-center gap-3 h-full">
            <img
              src={logo}
              className="w-full h-full object-contain"
              alt="logo"
            />
          </div>
        </div>
      </header>

      <main className="main_content">
        <div className="myContainer">
          <div className="inner_container">
            <CreatePostForm onSubmit={handleCreatePost} />

            <div className="flex-1" ref={topSectionRef}>
              {posts.map((post) => (
                <PostComponent
                  key={post.id}
                  post={post}
                  onComment={handleComment}
                  onReply={handleReply}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
