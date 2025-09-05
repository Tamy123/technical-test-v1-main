import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";

export type VoteType = "up" | "down" | null;

// Voting section component
interface VotingSectionProps {
  userVote: VoteType;
  score: number;
  isVoting: boolean;
  onUpvote: () => void;
  onDownvote: () => void;
}

export default function VotingSection({
  userVote,
  score,
  isVoting,
  onUpvote,
  onDownvote,
}: VotingSectionProps) {
  return (
    <div className="flex flex-col items-center justify-start p-2 md:p-4 min-w-[60px]">
      <Button
        variant="ghost"
        size="sm"
        onClick={onUpvote}
        disabled={isVoting}
        className={`h-8 w-8 p-0 rounded-sm ${
          userVote === "up" ? "text-green-600" : "text-muted-foreground"
        }`}
      >
        <ChevronUp className="h-5 w-5" />
      </Button>

      <div className="py-1 px-2 text-sm font-medium text-foreground">
        {score}
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={onDownvote}
        disabled={isVoting}
        className={`h-8 w-8 p-0 rounded-sm ${
          userVote === "down" ? "text-red-600" : "text-muted-foreground"
        }`}
      >
        <ChevronDown className="h-5 w-5" />
      </Button>
    </div>
  );
}
