import {
  prop,
  getModelForClass,
  type Ref,
  ReturnModelType,
} from "@typegoose/typegoose";
import { User } from "./User";
import { Post } from "./Post";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import mongoose from "mongoose";
export class Comment extends TimeStamps {
  @prop({ required: true })
  public content!: string;

  @prop({ ref: () => User, required: true })
  public author!: Ref<User>;

  @prop({ ref: () => Post, required: true })
  public post!: Ref<Post>;

  @prop({ ref: () => Comment })
  public parentComment?: Ref<Comment>;

  @prop({ ref: () => Comment })
  public replies?: Ref<Comment>[];
}

export const CommentModel =
  (mongoose.models.Comment as ReturnModelType<typeof Comment> | undefined) ??
  getModelForClass(Comment);
