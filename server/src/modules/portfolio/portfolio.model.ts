import mongoose from "mongoose";

const ModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    about: String,
    image: String,
    socialMedia: [],
    work: [],
    showProducts: {
      type: Boolean,
      default: false,
    },
    products: [],
    showRecentWork: {
      type: Boolean,
      default: false,
    },
    recentWork: [],
    showTools: {
      type: Boolean,
      default: false,
    },
    tools: [],
    contactEmail: String,
    contactEmailPassword: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    primaryColor: {
      type: String,
      default: "#000000",
    },
    secondaryColor: {
      type: String,
      default: "#ffffff",
    },
  },
  {
    timestamps: true,
  }
);

ModelSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

ModelSchema.set("toJSON", {
  virtuals: true,
});

const Portfolio =
  mongoose.models.Portfolio || mongoose.model("Portfolio", ModelSchema);

module.exports = Portfolio;

export default Portfolio;
