import { Post, User } from '../types';

const users: User[] = [
  {
    id: '1',
    name: 'Alex Thompson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  },
  {
    id: '2',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
  },
  {
    id: '3',
    name: 'Marcus Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
  },
];

export const mockPosts: Post[] = [
  {
    id: '1',
    title: 'The Future of Web Development',
    content: 'As we move into 2024, the landscape of web development continues to evolve...',
    author: users[0],
    createdAt: '2024-03-10T10:00:00Z',
    likes: 42,
    tags: ['webdev', 'programming', 'future'],
    comments: [
      {
        id: '1',
        content: 'Great insights! I especially agree with the point about WebAssembly.',
        author: users[1],
        createdAt: '2024-03-10T10:30:00Z',
        likes: 12,
        replies: [
          {
            id: '2',
            content: 'WebAssembly is definitely game-changing. Have you tried using it with Rust?',
            author: users[2],
            createdAt: '2024-03-10T11:00:00Z',
            likes: 8,
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Best Practices for React Performance',
    content: 'Performance optimization in React applications is crucial for providing a smooth user experience...',
    author: users[1],
    createdAt: '2024-03-09T15:00:00Z',
    likes: 35,
    tags: ['react', 'performance', 'javascript'],
    comments: [
      {
        id: '3',
        content: 'Memoization has been a game-changer in my applications.',
        author: users[2],
        createdAt: '2024-03-09T16:00:00Z',
        likes: 15,
        replies: [],
      },
    ],
  },
];