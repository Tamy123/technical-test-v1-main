"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { MessageSquare, Share, Bookmark } from "lucide-react";

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
  commentCount,
  createdAt,
}: PostCardProps) {
  const [isSaved] = useState(false);

  return (
    <Card className="mb-4 hover:border-primary/20 transition-colors duration-200">
      <div className="flex flex-row md:flex-row">
        {/* Post content */}
        <div className="flex flex-row md:flex-col md:flex-1 w-full">
          <CardHeader className="pb-2">
            <div className="flex items-center text-xs text-muted-foreground mb-1.5">
              <Link
                href={`/r/${subreddit.name}`}
                className="font-medium hover:underline text-primary"
              >
                r/{subreddit.name}
              </Link>
              <span className="mx-1">•</span>
              <span>Posted by</span>
              <Link
                href={`/u/${author.username}`}
                className="ml-1 hover:underline font-medium"
              >
                u/{author.username}
              </Link>
              <span className="mx-1">•</span>
              <HydrationSafeDate date={createdAt} />
            </div>
            <Link
              href={`/r/${subreddit.name}/comments/${id}`}
              className="hover:underline"
            >
              <h3 className="text-lg font-semibold leading-tight hover:text-primary transition-colors">
                {title}
              </h3>
            </Link>
          </CardHeader>
          <CardContent className="py-2">
            {content && <p className="text-sm line-clamp-4 mb-3">{content}</p>}
            {imageUrl && (
              <div className="relative mt-2 overflow-hidden rounded-md w-24 h-24 md:max-h-96 md:w-full md:h-auto">
                <Image
                  src={imageUrl}
                  alt={title}
                  width={800}
                  height={600}
                  className="object-cover w-full h-full md:object-contain"
                />
              </div>
            )}
          </CardContent>
          <CardFooter className="pt-0 pb-2">
            <div className="flex items-center space-x-2 text-xs">
              <Link href={`/r/${subreddit.name}/comments/${id}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <MessageSquare className="h-4 w-4 mr-1.5" />
                  {commentCount} Comments
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <Share className="h-4 w-4 mr-1.5" />
                Share
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 transition-colors ${
                  isSaved
                    ? "text-yellow-600 hover:text-yellow-700"
                    : "text-muted-foreground hover:text-foreground"
                } hover:bg-muted`}
              >
                <Bookmark
                  className={`h-4 w-4 mr-1.5 ${isSaved ? "fill-current" : ""}`}
                />
                {isSaved ? "Saved" : "Save"}
              </Button>
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}

const HydrationSafeDate = ({ date }: { date: Date }) => {
  const [formatted, setFormatted] = useState<string>("");

  useEffect(() => {
    setFormatted(date.toLocaleString()); // runs only on client
  }, [date]);

  return <span title={formatted}>{formatted}</span>;
};
