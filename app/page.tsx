"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";

interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  author: {
    id: string;
    username: string;
    avatar?: string;
  };
  subreddit: {
    id: string;
    name: string;
  };
  upvotes: number;
  downvotes: number;
  commentCount: number;
  createdAt: Date;
}

interface ApiPost extends Omit<Post, "createdAt"> {
  createdAt: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch posts from API
  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/posts`);
      if (response.ok) {
        const data = await response.json();
        setPosts(
          data.posts.map((post: ApiPost) => ({
            ...post,
            createdAt: new Date(post.createdAt),
          }))
        );
      } else {
        setError("Failed to fetch posts");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to fetch posts");
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchPosts();
  }, []);

  if (error) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
            <p className="text-muted-foreground">{error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Retry
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="container grid grid-cols-1 md:grid-cols-7 gap-6 px-4 py-6 mx-auto">
        {/* Main content - Posts */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Popular Posts</h1>
          </div>

          {/* Posts list */}
          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading posts...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No posts found. Be the first to create one!
                </p>
              </div>
            ) : (
              posts.map((post) => <PostCard key={post.id} {...post} />)
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="md:col-span-2 space-y-4">
          {/* Create post CTA */}
          <div className="bg-card rounded-lg border shadow-sm p-4">
            <h3 className="font-semibold mb-2">Create a post</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Share your thoughts with the community
            </p>
            <Button
              className="w-full"
              onClick={() => {
                // TODO: Implement create post modal
              }}
            >
              Create Post
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
