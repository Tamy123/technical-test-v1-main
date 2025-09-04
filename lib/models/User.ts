import {
  prop,
  getModelForClass,
  pre,
  index,
  ReturnModelType,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import mongoose from "mongoose";

@pre<User>("save", function () {
  if (!this.avatar) {
    this.avatar = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${this._id}`;
  }
})
@index({ username: 1 }, { unique: true })
export class User extends TimeStamps {
  @prop({ required: true, unique: true, type: String })
  public username!: string;

  @prop({ required: true, type: String })
  public passwordHash!: string;

  @prop({ required: true, unique: true, type: String })
  public email!: string;

  @prop({ default: "", type: String })
  public avatar?: string;

  @prop({ default: 0, type: Number })
  public karma?: number;

  @prop({ type: () => [String], default: [] })
  public following?: string[];
}

export const UserModel =
  (mongoose.models.User as ReturnModelType<typeof User> | undefined) ??
  getModelForClass(User);
