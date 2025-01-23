export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  replies: Comment[];
  likes: number;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  comments: Comment[];
  likes: number;
  tags: string[];
  media?: string[]; // Array of media URLs
}