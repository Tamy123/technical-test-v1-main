import mongoose from "mongoose";
import { UserModel } from "../lib/models/User";
import { PostModel } from "../lib/models/Post";
import connectToDatabase from "../lib/mongodb";

// Mock data
const mockUsers = [
  {
    username: "dogLover42",
    email: "doglover42@example.com",
    passwordHash: "mock-hash-1",
  },
  {
    username: "reactFanatic",
    email: "reactfanatic@example.com",
    passwordHash: "mock-hash-2",
  },
  {
    username: "unluckyGamer",
    email: "unluckygamer@example.com",
    passwordHash: "mock-hash-3",
  },
  {
    username: "techEnthusiast",
    email: "techenthusiast@example.com",
    passwordHash: "mock-hash-4",
  },
  {
    username: "codeNinja",
    email: "codeninja@example.com",
    passwordHash: "mock-hash-5",
  },
];

const mockPosts = [
  {
    title: "Just got a new puppy! Meet Max!",
    content:
      "After months of waiting, I finally got a new puppy. He's a Golden Retriever and his name is Max. He's already made himself at home!",
    imageUrl:
      "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Z29sZGVuJTIwcmV0cmlldmVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    upvotes: 243,
    downvotes: 12,
    authorUsername: "dogLover42",
    subredditName: "pets",
  },
  {
    title: "React 19 is amazing! Here's what you need to know",
    content:
      "React 19 was just released with some amazing new features. I've been testing it out and here are my thoughts on the most important changes and how they might affect your projects.",
    upvotes: 1587,
    downvotes: 42,
    authorUsername: "reactFanatic",
    subredditName: "reactjs",
  },
  {
    title: "TIFU by bringing my gaming PC to a LAN party",
    content:
      "So I was invited to a LAN party this weekend and I brought my gaming rig. Everything was going well until I spilled my energy drink all over my PC. I heard a pop and then smoke started coming out. Now my $3000 PC is fried and I have no idea if my homeowner's insurance will cover it.",
    upvotes: 4211,
    downvotes: 120,
    authorUsername: "unluckyGamer",
    subredditName: "tifu",
  },
  {
    title: "Best practices for Next.js 14 App Router",
    content:
      "I've been working with the new App Router for a few months now. Here are some patterns and best practices I've discovered that might help other developers.",
    upvotes: 892,
    downvotes: 23,
    authorUsername: "techEnthusiast",
    subredditName: "nextjs",
  },
  {
    title: "JavaScript performance tips that actually matter",
    content:
      "After profiling hundreds of applications, here are the JavaScript performance optimizations that actually make a difference in real-world applications.",
    upvotes: 1234,
    downvotes: 56,
    authorUsername: "codeNinja",
    subredditName: "javascript",
  },
];

async function seedDatabase() {
  try {
    // Connect to MongoDB using the existing connection function
    await connectToDatabase();
    console.log("Connected to MongoDB");

    // Clear existing data
    await UserModel.deleteMany({});
    await PostModel.deleteMany({});
    console.log("Cleared existing data");

    // Create users
    const users = await UserModel.insertMany(mockUsers);
    console.log(`Created ${users.length} users`);

    // Create posts
    const postsWithRefs = mockPosts.map((post) => {
      const author = users.find(
        (user) => user.username === post.authorUsername
      );

      if (!author) {
        throw new Error(`Could not find author for post: ${post.title}`);
      }

      return {
        title: post.title,
        content: post.content,
        imageUrl: post.imageUrl || "",
        upvotes: post.upvotes,
        downvotes: post.downvotes,
        author: author._id,
        subreddit: post.subredditName,
      };
    });

    const posts = await PostModel.insertMany(postsWithRefs);
    console.log(`Created ${posts.length} posts`);

    console.log("Database seeded successfully!");
    console.log("\nSummary:");
    console.log(`- Users: ${users.length}`);
    console.log(`- Posts: ${posts.length}`);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
    process.exit(0);
  }
}

// Run the seed function
seedDatabase();
