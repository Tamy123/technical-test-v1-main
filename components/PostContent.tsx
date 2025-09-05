import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MessageSquare, Share, Bookmark } from "lucide-react";
import HydrationSafeDate from "./HydrationSafeDate";

// Post content component
interface PostContentProps {
  title: string;
  content: string;
  imageUrl?: string;
  author: { id: string; username: string; avatar?: string };
  subreddit: { id: string; name: string };
  commentCount: number;
  createdAt: Date;
  isSaved: boolean;
}

export default function PostContent({
  title,
  content,
  imageUrl,
  author,
  subreddit,
  commentCount,
  createdAt,
  isSaved,
}: PostContentProps) {
  return (
    <div className="flex flex-col flex-1">
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
          href={`/r/${subreddit.name}/comments/TODO`}
          className="hover:underline"
        >
          <h3 className="text-lg font-semibold leading-tight hover:text-primary">
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
          <Link href={`/r/${subreddit.name}/comments/TODO`}>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <MessageSquare className="h-4 w-4 mr-1.5" />
              {commentCount} Comments
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <Share className="h-4 w-4 mr-1.5" />
            Share
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`h-8 ${
              isSaved
                ? "text-yellow-600"
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
  );
}
