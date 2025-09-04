import {
  prop,
  getModelForClass,
  type Ref,
  ReturnModelType,
} from "@typegoose/typegoose";
import { User } from "./User";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import mongoose from "mongoose";

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
}

export const PostModel =
  (mongoose.models.Post as ReturnModelType<typeof Post> | undefined) ??
  getModelForClass(Post);
