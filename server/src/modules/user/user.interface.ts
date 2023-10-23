import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  name: string;
  username: string;
  password: string;
  about: string;
  avatar: string;
  getData: () => object;
  signJwt: () => object;
  checkPassword: (password: string) => boolean;
}
