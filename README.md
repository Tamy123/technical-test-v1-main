# Reddit Clone - Technical Test

A modern Reddit-like application built with Next.js 15, TypeScript, MongoDB, and Tailwind CSS.

## Features

- 📝 Create and view posts
- 🏷️ Subreddit organization
- 👤 User authentication system
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive design
- 🌙 Dark/Light theme support

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React

## Prerequisites

- Node.js 18+ 
- MongoDB database (local or cloud)
- pnpm

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd technical-test-v1
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/reddit-clone
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/reddit-clone

JWT_SECRET=your-super-secret-jwt-key-here
```

### 4. Seed the Database

Populate your database with mock data:

```bash
pnpm run seed
```

This will create:
- 5 mock users
- 5 sample posts

**Note**: The seed script is written in TypeScript and uses your existing model definitions from `lib/models/`.

### 5. Run the Development Server

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── posts/         # Posts CRUD operations
│   │   └── subreddits/    # Subreddits API
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── CreatePostModal.tsx
│   ├── PostCard.tsx
│   └── ...
├── lib/                  # Utility functions
│   ├── db.ts            # Database connection
│   └── utils.ts         # Helper functions
├── models/              # MongoDB/Mongoose models
│   ├── User.ts
│   └── Post.ts
└── scripts/             # Utility scripts
    └── seed-database.ts # Database seeding script (TypeScript)
```

## API Endpoints

### Posts
- `GET /api/posts` - Fetch all posts with populated author and subreddit data

## Database Models

### User
- `username` (unique)
- `email` (unique)
- `passwordHash`
- `avatar` (auto-generated)
- `karma`
- `following`

### Post
- `title`
- `content`
- `imageUrl`
- `upvotes`/`downvotes`
- `author` (User reference)
- `subreddit` (Subreddit reference)

## Available Scripts

- `pnpm run dev` - Start development server with Turbopack
- `pnpm run build` - Build for production
- `pnpm run start` - Start production server
- `pnpm run lint` - Run ESLint
- `pnpm run seed` - Seed database with mock data

## Features Implemented

✅ **Data Models**: Complete TypeScript models for User, Post, and Subreddit
✅ **API Routes**: RESTful endpoints for posts and subreddits
✅ **Real Data Integration**: Replaced mock data with actual database calls
✅ **Post Creation**: Functional modal with form validation
✅ **Database Seeding**: TypeScript script using existing models
✅ **Type Safety**: Full TypeScript implementation with proper typing
✅ **Modern UI**: Clean, responsive design with Tailwind CSS

## Development Notes

- The application uses Next.js 15 App Router for modern React development
- All API calls are properly typed with TypeScript interfaces
- Form validation is handled with React Hook Form and Zod
- Database operations use Mongoose with Typegoose for type safety
- The UI is built with Radix UI components and styled with Tailwind CSS
- The seed script is written in TypeScript and reuses existing model definitions

## Troubleshooting

### Database Connection Issues
- Ensure MongoDB is running (if using local instance)
- Check your `MONGODB_URI` in `.env.local`
- Verify network access (if using MongoDB Atlas)

### Seeding Issues
- Make sure your database is accessible
- Check that all required environment variables are set
- Ensure you have write permissions to the database
- Install dependencies: `pnpm install` (includes tsx for running TypeScript)

### Build Issues
- Clear `.next` folder and rebuild: `rm -rf .next && pnpm run build`
- Check for TypeScript errors: `pnpm run lint`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is for technical assessment purposes.