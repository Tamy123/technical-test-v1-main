import {
  prop,
  getModelForClass,
  type Ref,
  ReturnModelType,
} from "@typegoose/typegoose";
import { User } from "./User";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import mongoose from "mongoose";

// Vote subdocument schema
export class Vote {
  @prop({ ref: () => User, required: true })
  public userId!: Ref<User>;

  @prop({ required: true, enum: ["up", "down"], type: String })
  public voteType!: "up" | "down";

  @prop({ default: () => new Date(), type: Date })
  public createdAt!: Date;
}

export class Post extends TimeStamps {
  @prop({ required: true, type: String })
  public title!: string;

  @prop({ default: "", type: String })
  public content?: string;

  @prop({ default: "", type: String })
  public imageUrl?: string;

  @prop({ default: 0, type: Number })
  public upvotes?: number;

  @prop({ default: 0, type: Number })
  public downvotes?: number;

  @prop({ ref: () => User, required: true })
  public author!: Ref<User>;

  @prop({ required: true, type: String })
  public subreddit!: string;

  // Array to track individual votes
  @prop({ type: () => [Vote], default: [] })
  public votes?: Vote[];
}

export const PostModel =
  (mongoose.models.Post as ReturnModelType<typeof Post> | undefined) ??
  getModelForClass(Post);
