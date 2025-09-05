"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";


const formSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(50, "Title must be 50 characters or less"),
  content: z
    .string()
    .max(200, "Content must be 200 characters or less")
    .optional(),
  subreddit: z.string().min(1, "Subreddit is required"),
});

type FormData = z.infer<typeof formSchema>;

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated?: () => void;
}

export default function CreatePostModal({
  isOpen,
  onClose,
  onPostCreated,
}: CreatePostModalProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      subreddit: "",
    },
  });

  const { register, handleSubmit, formState, watch, reset } = form;
  const { errors, isSubmitting } = formState;

  const titleValue = watch("title") || "";
  const contentValue = watch("content") || "";


  const getCharCountClass = (current: number, limit: number) => {
    const percentage = (current / limit) * 100;
    if (percentage >= 100) return "text-red-600 font-medium";
    if (percentage >= 80) return "text-orange-500 font-medium";
    if (percentage >= 60) return "text-yellow-600";
    return "text-muted-foreground";
  };


  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title.trim(),
          content: data.content?.trim() || "",
          subreddit: data.subreddit.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create post");
      }

      toast.success("Post created successfully!");
      reset();
      onClose();
      onPostCreated?.();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create post"
      );
    }
  };


  const handleClose = () => {
    if (!isSubmitting) {
      reset();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create a new post</DialogTitle>
          <DialogDescription>
            Share your thoughts with the community. Fill out the form below to
            create your post.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title Field */}
          <div className="space-y-2">
            <Label htmlFor="title">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              placeholder="What's your post about?"
              {...register("title")}
              className={errors.title ? "border-red-500" : ""}
            />
            <div className="flex justify-between items-center">
              {errors.title && (
                <span className="text-sm text-red-600">
                  {errors.title.message}
                </span>
              )}
              <span
                className={`text-xs ml-auto ${getCharCountClass(
                  titleValue.length,
                  50
                )}`}
              >
                {titleValue.length}/50
              </span>
            </div>
          </div>

          {/* Content Field */}
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Tell us more about your post (optional)"
              className={`min-h-[100px] resize-none ${
                errors.content ? "border-red-500" : ""
              }`}
              {...register("content")}
            />
            <div className="flex justify-between items-center">
              {errors.content && (
                <span className="text-sm text-red-600">
                  {errors.content.message}
                </span>
              )}
              <span
                className={`text-xs ml-auto ${
                  contentValue.length >= 200
                    ? "text-red-600 font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {contentValue.length}/200
              </span>
            </div>
          </div>

          {/* Subreddit Field */}
          <div className="space-y-2">
            <Label htmlFor="subreddit">
              Subreddit <span className="text-red-500">*</span>
            </Label>
            <Input
              id="subreddit"
              placeholder="e.g., AskReddit, funny, technology"
              {...register("subreddit")}
              className={errors.subreddit ? "border-red-500" : ""}
            />
            {errors.subreddit && (
              <span className="text-sm text-red-600">
                {errors.subreddit.message}
              </span>
            )}
          </div>

          {/* Form Actions */}
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="min-w-[100px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Post"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
