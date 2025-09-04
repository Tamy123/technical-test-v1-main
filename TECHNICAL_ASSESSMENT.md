# Reddit Clone - Technical Assessment

Welcome to the Reddit Clone technical assessment! This project is built with Next.js 15, TypeScript, MongoDB, and Tailwind CSS. Your task is to implement several key features to complete this Reddit-like application.

## Project Setup

1. Install dependencies:

```bash
pnpm install
```

2. Set up your environment variables:
Create a `.env.local` file with:

```
MONGODB_URI=your_mongodb_connection_string
```

3. Run the development server:

```bash
pnpm dev
```

## Assessment Overview

You will be implementing 5 main tasks. Each task builds upon the previous ones and tests both frontend and backend skills.

---

## Task 1: Fix PostCard Responsive Design ⏳

**Description** Fix the responsive design of the PostCard component to ensure it looks good on both desktop and mobile devices.

**Location:** `components/PostCard.tsx`

### Acceptance Criteria

- [ ] Fix image sizing on desktop (maintain aspect ratio and fill available space)
- [ ] Vertically align vote buttons on desktop
- [ ] Post content in column on desktop
- [ ] Responsive layout for mobile/tablet:

  - [ ] Vote buttons aligned to the left
  - [ ] Content stacks vertically as needed
  - [ ] Appropriately sized images for small screens
- [ ] Test component across various breakpoints

### Implementation Requirements

1. **CSS Adjustments:**
   - Use Tailwind CSS classes to adjust layout
   - Ensure images maintain aspect ratio and fill available space
   - Use flexbox or grid for layout adjustments

2. **Responsive Design:**
   - Use Tailwind's responsive utilities to adjust styles based on screen size
   - Ensure the component is visually appealing on both desktop and mobile devices  

## Task 2: Enhanced PostCard Component ✅

**Description:** Complete the PostCard component with all required Reddit-like features.

**Location:** `components/PostCard.tsx`

### Acceptance Criteria

- [x] Display subreddit name (r/subreddit)
- [x] Display poster username (u/username)
- [x] Display created date with relative time
- [x] Comments button (functional navigation)
- [x] Share button (implement clipboard functionality)
- [x] Save button (implement save/unsave functionality)
- [x] Upvote & downvote buttons with proper state management
- [x] Hover effects and smooth transitions

### Implementation Requirements

1. **Upvote/Downvote Logic:**
   - Implement `handleUpvote()` and `handleDownvote()` functions
   - Handle vote toggling (remove vote if clicking same button)
   - Handle vote switching (upvote to downvote and vice versa)
   - Make API calls to persist votes

2. **Share Functionality:**
   - Implement `handleShare()` function
   - Copy post URL to clipboard
   - Show success notification

3. **Save Functionality:**
   - Implement `handleSave()` function
   - Toggle saved state with visual feedback
   - Make API calls to persist save state

**Files to modify:**

- `components/PostCard.tsx` (implement TODO functions)

---

## Task 3: Create Post Modal ✅

**Description:** Create a modal component for creating new posts.

**Location:** `components/CreatePostModal.tsx`

### Acceptance Criteria

- [x] Modal with form fields:
  - Title (required, max 50 characters)
  - Body (optional, max 200 characters)
  - Subreddit selection (required)
  - Poster name (required, since auth is not included)
- [x] Form validation with error messages
- [x] Character counters for title and body
- [x] Submit button calls backend route

### Implementation Requirements

1. **Form Validation:**
   - Implement `validateForm()` function
   - Validate title: required, max 50 characters
   - Validate body: max 200 characters (optional)
   - Validate subreddit: required selection
   - Validate poster name: required

2. **Form Submission:**
   - Implement `handleSubmit()` function
   - Make API call to `/api/posts`
   - Handle success/error responses
   - Reset form and close modal on success

**Files to modify:**

- `components/CreatePostModal.tsx` (implement TODO functions)
- `app/page.tsx` (already integrated)

---

## Task 4: Post Creation API Route ⏳

**Description:** Implement backend logic for post creation with validation and database operations.

**Location:** `app/api/posts/route.ts`

### Acceptance Criteria

- [ ] Validate request data:
  - Post title < 50 characters
  - Post description < 200 characters
  - Required fields present
- [ ] Create database entries:
  - Find or create user
  - Find or create subreddit
  - Create post with proper relationships
- [ ] Return created post with populated data

### Implementation Requirements

1. **Data Validation:**
   - Implement validation in `POST` function
   - Return appropriate error responses (400 status)
   - Validate title length, body length, required fields

2. **Database Operations:**
   - Uncomment and implement user creation/lookup
   - Uncomment and implement subreddit creation/lookup
   - Create post with proper references
   - Use MongoDB transactions if needed

3. **Response Handling:**
   - Return created post with populated author and subreddit
   - Handle errors gracefully
   - Return appropriate HTTP status codes

**Files to modify:**

- `app/api/posts/route.ts` (implement POST function)
- Database models are already set up in `lib/models/`

**Database Schema:**

- Post model already includes subreddit field
- User and Subreddit models are properly configured
- Use Mongoose populate for relationships

---

## Task 5: Post Sorting Functionality ⏳

**Description:** Implement frontend and backend sorting for posts.

**Locations:** `app/page.tsx` and `app/api/posts/route.ts`

### Acceptance Criteria

- [ ] Frontend sorting controls:
  - "New" button (sort by createdAt)
  - "Top" button (sort by upvotes)
  - Visual feedback for active sort
- [ ] Backend GET route supports sorting:
  - Sort by createdAt (newest first)
  - Sort by upvotes (highest first)
  - Query parameters: `sortBy` and `sortOrder`

### Implementation Requirements

1. **Frontend Implementation:**
   - Implement `fetchPosts()` function
   - Make API calls with sort parameters
   - Update posts state with fetched data
   - Handle loading states

2. **Backend Implementation:**
   - Implement GET function in `/api/posts/route.ts`
   - Parse query parameters for sorting
   - Fetch posts with proper sorting
   - Populate author and subreddit data

3. **Integration:**
   - Connect frontend sort buttons to API
   - Update UI when sort changes
   - Handle error states

**Files to modify:**

- `app/page.tsx` (implement `fetchPosts()` and integrate with buttons)
- `app/api/posts/route.ts` (implement GET function)

---

## Technical Requirements

### Frontend

- Use TypeScript with proper type definitions
- Implement proper error handling
- Use React hooks appropriately
- Follow existing code patterns and styling

### Backend

- Use Next.js 15 App Router API routes
  - You may use Server Actions instead if preferred.
- Implement proper error handling and HTTP status codes
- Use MongoDB with Mongoose/Typegoose
- Follow RESTful API conventions

### Database

- Models are already defined in `lib/models/`
- Use proper relationships between User, Post, and Subreddit
- Implement data validation at the database level

## Evaluation Criteria

You will be evaluated on:

1. **Code Quality:**
   - Clean, readable code
   - Proper TypeScript usage
   - Following existing patterns

2. **Functionality:**
   - All acceptance criteria met
   - Proper error handling
   - Good user experience

3. **Technical Implementation:**
   - Efficient database queries
   - Proper API design
   - Frontend/backend integration

4. **Problem Solving:**
   - Understanding of requirements
   - Implementation approach
   - Handling edge cases

## Getting Help

- Check existing code patterns in the project
- Review the database models in `lib/models/`
- Use TypeScript for better development experience
- Test your implementation thoroughly

## Submission

Please ensure all tasks are completed and the application runs without errors. Be prepared to explain your implementation choices and demonstrate the functionality.

Good luck! 🚀
