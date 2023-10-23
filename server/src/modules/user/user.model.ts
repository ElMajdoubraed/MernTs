import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "./user.interface";

const ModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 20,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      maxlength: 20,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: String,
  },
  {
    timestamps: true,
  }
);

ModelSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 8);
  }
  next();
});

ModelSchema.methods.getData = function () {
  return {
    id: this._id,
    name: this.name,
    username: this.username,
    about: this.about,
    avatar: this.avatar,
  };
};

ModelSchema.methods.signJwt = function () {
  let data = this.getData();
  data.token = jwt.sign(data, process.env.JWT_SECRET as string);
  return data;
};

ModelSchema.methods.checkPassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};

ModelSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

ModelSchema.set("toJSON", {
  virtuals: true,
});

const User = mongoose.models.User || mongoose.model<IUser>("User", ModelSchema);

module.exports = User;

export default User;
