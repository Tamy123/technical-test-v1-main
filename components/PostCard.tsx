"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import VotingSection, { VoteType } from "./VotingSection";
import PostContent from "./PostContent";

interface PostCardProps {
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

export default function PostCard({
  id,
  title,
  content,
  imageUrl,
  author,
  subreddit,
  upvotes: initialUpvotes,
  downvotes: initialDownvotes,
  commentCount,
  createdAt,
}: PostCardProps) {
  const [isSaved] = useState(false);
  const [userVote, setUserVote] = useState<VoteType>(null);
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [isVoting, setIsVoting] = useState(false);

  const score = upvotes - downvotes;

  // Fetch user's vote status when component mounts
  useEffect(() => {
    let cancelled = false;

    const fetchUserVote = async () => {
      try {
        const response = await fetch(`/api/posts/${id}/vote`);

        if (!response.ok) {
          if (response.status === 401) {
            // User not authenticated - this is normal
            if (!cancelled) setUserVote(null);
            return;
          }
          throw new Error(`Failed to fetch vote: ${response.status}`);
        }

        const data = await response.json();
        if (!cancelled) {
          setUserVote(data.userVote);
          setUpvotes(data.upvotes);
          setDownvotes(data.downvotes);
        }
      } catch (error) {
        console.error("Error fetching user vote:", error);
        if (!cancelled) setUserVote(null);
      }
    };

    fetchUserVote();
    return () => {
      cancelled = true;
    };
  }, [id]);

  // Handle vote button clicks
  const handleVote = async (voteType: "up" | "down") => {
    if (isVoting) return;

    setIsVoting(true);

    // Calculate new vote (toggle if same, switch if different)
    const newVote: VoteType = userVote === voteType ? null : voteType;

    // Store previous state for rollback
    const previousState = {
      vote: userVote,
      upvotes,
      downvotes,
    };

    // Update UI
    updateVoteState(newVote);

    try {
      const response = await fetch(`/api/posts/${id}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voteType: newVote }),
      });

      if (!response.ok) {
        throw new Error("Failed to vote");
      }

      const data = await response.json();

      // Sync with server response
      setUpvotes(data.upvotes);
      setDownvotes(data.downvotes);
      setUserVote(data.userVote);
    } catch (error) {
      console.error("Error voting:", error);

      // Rollback update
      setUserVote(previousState.vote);
      setUpvotes(previousState.upvotes);
      setDownvotes(previousState.downvotes);
    } finally {
      setIsVoting(false);
    }
  };

  // Update local vote state
  const updateVoteState = (newVote: VoteType) => {
    setUserVote(newVote);

    let newUpvotes = upvotes;
    let newDownvotes = downvotes;

    // Remove previous vote
    if (userVote === "up") newUpvotes--;
    if (userVote === "down") newDownvotes--;

    // Add new vote
    if (newVote === "up") newUpvotes++;
    if (newVote === "down") newDownvotes++;

    setUpvotes(newUpvotes);
    setDownvotes(newDownvotes);
  };

  return (
    <Card className="mb-4 hover:border-primary/20">
      <div className="flex flex-row">
        <VotingSection
          userVote={userVote}
          score={score}
          isVoting={isVoting}
          onUpvote={() => handleVote("up")}
          onDownvote={() => handleVote("down")}
        />

        <PostContent
          title={title}
          content={content}
          imageUrl={imageUrl}
          author={author}
          subreddit={subreddit}
          commentCount={commentCount}
          createdAt={createdAt}
          isSaved={isSaved}
        />
      </div>
    </Card>
  );
}
