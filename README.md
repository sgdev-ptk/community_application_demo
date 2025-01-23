# Have a look

https://sgdev-ptk.github.io/community_application_demo/

# Social Media Post & Comment System

A modern, feature-rich social media post and comment system built with React, TypeScript, and Tailwind CSS. This application provides a Facebook-like experience for creating posts, managing media, and nested comments.

## Features

### Posts
- Create posts with title, content, and tags
- Rich media support with multiple image uploads
- Facebook-style image grid layout
  - Images: Side-by-side layout
- Tag system with visual tag chips
- Like and comment counters

### Comments
- Nested comments
- Visual thread lines with distinct colors per nesting level
- Like system for comments
- Real-time comment form
- Timestamp display
- User avatars and names

## Tech Stack

- **React**: UI library
- **TypeScript**: Type safety and better developer experience
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Modern icon system
- **Vite**: Build tool and development server

## Project Structure

```
src/
├── components/
│   ├── Comment.tsx        # Nested comment component
│   ├── CommentForm.tsx    # Comment input form
│   ├── CreatePostForm.tsx # Post creation form
│   └── Post.tsx           # Main post component
├── data/
│   └── mockData.ts        # Sample data for development
├── types/
│   └── index.ts           # TypeScript interfaces
├── utils/
│   └── formatDate.ts      # Date formatting utility
├── App.tsx               # Main application component
└── main.tsx             # Application entry point
```

## Component Details

### Post Component
The post component handles:
- Post header with author info and timestamp
- Content display
- Tag display
- Like and comment actions
- Nested comments section

## Usage

### Creating a Post
```tsx
<CreatePostForm
  onSubmit={(title, content, tags, media) => {
    // Handle post creation
  }}
/>
```

### Rendering a Post
```tsx
<Post
  post={postData}
  onComment={(postId, content) => {
    // Handle new comment
  }}
  onReply={(commentId, content) => {
    // Handle comment reply
  }}
/>
```

### Comment Component
```tsx
<Comment
  comment={commentData}
  onReply={(commentId, content) => {
    // Handle reply
  }}
  depth={0}
  maxDepth={4}
/>
```

## Development

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Type Definitions

### Post Interface
```typescript
interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  comments: Comment[];
  likes: number;
  tags: string[];
  media?: string[];
}
```

### Comment Interface
```typescript
interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  replies: Comment[];
  likes: number;
}
```

### User Interface
```typescript
interface User {
  id: string;
  name: string;
  avatar: string;
}
```

## Best Practices

1. **Media Handling**
   - Support for multiple image uploads
   - Responsive image 

2. **Comment System**
   - Nesting for readability
   - Visual thread lines for easy tracking
   - Intuitive reply interface
   - Clear maximum depth indicator

3. **Performance**
   - Optimized image loading
   - Efficient comment rendering
   - Responsive design for all screen sizes

4. **User Experience**
   - Intuitive post creation
   - Easy media management
   - Clear visual hierarchy
   - Smooth animations and transitions

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
