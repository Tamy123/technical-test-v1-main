# Technical Assessment Checklist

Use this checklist to track your progress through the assessment tasks.

## Task 1: Fix PostCard Responsive Design

- [ ] Review the PostCard component for responsive issues
- [ ] Fix image sizing on desktop (should maintain correct aspect ratio and fill available space)
- [ ] Ensure vote buttons are vertically aligned on desktop
- [ ] Ensure post content is in a column on desktop
- [ ] Fix layout for small screens (mobile/tablet):
  - [ ] Vote buttons should be to the left of the content
  - [ ] Content should stack vertically if needed
  - [ ] Image should be sized appropriately for small screens
- [ ] Test the component at various breakpoints to confirm fixes
- [ ] Verify no visual regressions on desktop or mobile

## Task 2: Enhanced PostCard Component

- [ ] Implement `handleUpvote()` function with API call
- [ ] Implement `handleDownvote()` function with API call
- [ ] Implement `handleShare()` function with clipboard functionality
- [ ] Implement `handleSave()` function with API call
- [ ] Test vote toggling (remove vote when clicking same button)
- [ ] Test vote switching (upvote to downvote and vice versa)
- [ ] Verify hover effects and transitions work properly

## Task 3: Create Post Modal

- [ ] Implement `validateForm()` function
  - [ ] Title validation (required, max 50 chars)
  - [ ] Body validation (max 200 chars)
  - [ ] Subreddit validation (required)
  - [ ] Poster name validation (required)
- [ ] Implement `handleSubmit()` function
  - [ ] Form validation before submission
  - [ ] API call to `/api/posts`
  - [ ] Handle success/error responses
  - [ ] Reset form and close modal on success
- [ ] Test form validation with various inputs
- [ ] Test character counters

## Task 4: Post Creation API Route

- [ ] Implement validation in `POST` function
  - [ ] Title length validation (< 50 chars)
  - [ ] Body length validation (< 200 chars)
  - [ ] Required fields validation
- [ ] Implement database operations
  - [ ] Find or create user
  - [ ] Find or create subreddit
  - [ ] Create post with proper relationships
- [ ] Return created post with populated data
- [ ] Test API with various inputs
- [ ] Test error handling

## Task 5: Post Sorting Functionality

### Frontend (app/page.tsx)

- [ ] Implement `fetchPosts()` function
  - [ ] Make API call with sort parameters
  - [ ] Update posts state
  - [ ] Handle loading states
  - [ ] Handle error states
- [ ] Connect sort buttons to `handleSortChange()`
- [ ] Test sorting by "New" (createdAt)
- [ ] Test sorting by "Top" (upvotes)

### Backend (app/api/posts/route.ts)

- [ ] Implement `GET` function
  - [ ] Parse query parameters (sortBy, sortOrder)
  - [ ] Fetch posts with sorting
  - [ ] Populate author and subreddit data
  - [ ] Return sorted posts
- [ ] Test API with different sort parameters
- [ ] Verify populated data is returned correctly

## Additional API Routes (Optional Enhancement)

- [ ] Implement voting API (`/api/posts/[id]/vote`)
- [ ] Implement save API (`/api/posts/[id]/save`)

## Final Testing

- [ ] All components render without errors
- [ ] All API routes respond correctly
- [ ] Database operations work properly
- [ ] UI is responsive and user-friendly
- [ ] No TypeScript errors
- [ ] No console errors

## Submission Checklist

- [ ] All tasks completed
- [ ] Code is clean and well-commented
- [ ] Application runs without errors
- [ ] Ready to demonstrate functionality
