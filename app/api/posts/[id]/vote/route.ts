import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { PostModel } from "@/lib/models/Post";
import { getSessionUser } from "@/lib/auth";
import mongoose from "mongoose";

// POST /api/posts/[id]/vote
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in to vote" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { voteType } = body; // 'up', 'down', or null to remove vote

    if (voteType && !["up", "down"].includes(voteType)) {
      return NextResponse.json(
        { error: "Invalid vote type. Must be 'up' or 'down'" },
        { status: 400 }
      );
    }

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    // Connect to database
    await connectToDatabase();

    // Find the post
    const post = await PostModel.findById(id);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Initialize votes array if it doesn't exist
    if (!post.votes) {
      post.votes = [];
    }

    // Find existing vote by this user
    const existingVoteIndex = post.votes.findIndex(
      (vote) => vote.userId.toString() === user.id
    );

    // Remove existing vote if found
    if (existingVoteIndex !== -1) {
      post.votes.splice(existingVoteIndex, 1);
    }

    // Add new vote if voteType is provided
    if (voteType) {
      post.votes.push({
        userId: new mongoose.Types.ObjectId(user.id),
        voteType: voteType,
        createdAt: new Date(),
      });
    }

    // Recalculate upvotes and downvotes
    const upvotes = post.votes.filter((vote) => vote.voteType === "up").length;
    const downvotes = post.votes.filter(
      (vote) => vote.voteType === "down"
    ).length;

    post.upvotes = upvotes;
    post.downvotes = downvotes;

    // Save the post
    await post.save();

    // Return updated vote counts and user's current vote
    const userVote = voteType || null;

    return NextResponse.json({
      success: true,
      upvotes,
      downvotes,
      userVote,
      score: upvotes - downvotes,
    });
  } catch (error) {
    console.error("Error handling vote:", error);
    return NextResponse.json(
      { error: "Failed to process vote" },
      { status: 500 }
    );
  }
}

// GET /api/posts/[id]/vote - Get user's current vote for a post
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await params in Next.js 15
    const { id } = await params;

    // Check authentication
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ userVote: null });
    }

    // Validate post ID
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    // Connect to database
    await connectToDatabase();

    // Find the post
    const post = await PostModel.findById(id);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Find user's vote
    const userVote = post.votes?.find(
      (vote) => vote.userId.toString() === user.id
    );

    return NextResponse.json({
      userVote: userVote ? userVote.voteType : null,
      upvotes: post.upvotes || 0,
      downvotes: post.downvotes || 0,
      score: (post.upvotes || 0) - (post.downvotes || 0),
    });
  } catch (error) {
    console.error("Error fetching vote:", error);
    return NextResponse.json(
      { error: "Failed to fetch vote" },
      { status: 500 }
    );
  }
}
