import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { PostModel } from "@/lib/models/Post";
import { getSessionUser } from "@/lib/auth";

interface PopulatedAuthor {
  _id: string;
  username: string;
  avatar?: string;
}

// GET route for fetching posts
export async function GET() {
  try {
    await connectToDatabase();

    // Fetch posts with populated author data (no sorting applied)
    const posts = await PostModel.find()
      .populate("author", "username avatar")
      .exec();

    // Transform the data to match the frontend interface
    const transformedPosts = posts.map((post) => ({
      id: post._id.toString(),
      title: post.title,
      content: post.content || "",
      imageUrl: post.imageUrl || "",
      author: {
        id: (post.author as unknown as PopulatedAuthor)._id.toString(),
        username: (post.author as unknown as PopulatedAuthor).username,
        avatar: (post.author as unknown as PopulatedAuthor).avatar || "",
      },
      subreddit: {
        id: post.subreddit, // Use the string value as both id and name
        name: post.subreddit,
      },
      upvotes: post.upvotes || 0,
      downvotes: post.downvotes || 0,
      commentCount: 0, // Ignore comment count, this is out of scope of your task!
      createdAt: post.createdAt,
    }));

    return NextResponse.json({ posts: transformedPosts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

// POST route for creating a new post
export async function POST(request: Request) {
  try {
    // Check authentication
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in to create a post" },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { title, content, imageUrl, subreddit } = body;

    // Validation
    if (!title || typeof title !== "string") {
      return NextResponse.json(
        { error: "Title is required and must be a string" },
        { status: 400 }
      );
    }

    if (title.length > 50) {
      return NextResponse.json(
        { error: "Title must be 50 characters or less" },
        { status: 400 }
      );
    }

    if (!subreddit || typeof subreddit !== "string") {
      return NextResponse.json(
        { error: "Subreddit is required and must be a string" },
        { status: 400 }
      );
    }

    // Validate content if provided
    if (content && typeof content !== "string") {
      return NextResponse.json(
        { error: "Content must be a string" },
        { status: 400 }
      );
    }

    if (content && content.length > 200) {
      return NextResponse.json(
        { error: "Content must be 200 characters or less" },
        { status: 400 }
      );
    }

    // Validate imageUrl if provided
    if (imageUrl && typeof imageUrl !== "string") {
      return NextResponse.json(
        { error: "Image URL must be a string" },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Create new post
    const newPost = new PostModel({
      title: title.trim(),
      content: content?.trim() || "",
      imageUrl: imageUrl?.trim() || "",
      author: user.id,
      subreddit: subreddit.trim(),
      upvotes: 0,
      downvotes: 0,
    });

    // Save the post
    const savedPost = await newPost.save();

    // Populate author data for response
    await savedPost.populate("author", "username avatar");

    // Transform the response to match frontend interface
    const transformedPost = {
      id: savedPost._id.toString(),
      title: savedPost.title,
      content: savedPost.content || "",
      imageUrl: savedPost.imageUrl || "",
      author: {
        id: (savedPost.author as unknown as PopulatedAuthor)._id.toString(),
        username: (savedPost.author as unknown as PopulatedAuthor).username,
        avatar: (savedPost.author as unknown as PopulatedAuthor).avatar || "",
      },
      subreddit: {
        id: savedPost.subreddit,
        name: savedPost.subreddit,
      },
      upvotes: savedPost.upvotes || 0,
      downvotes: savedPost.downvotes || 0,
      commentCount: 0,
      createdAt: savedPost.createdAt,
    };

    return NextResponse.json(
      {
        message: "Post created successfully",
        post: transformedPost,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
