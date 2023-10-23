import mongoose from "mongoose";

const ModelSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    contactEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    contactSubject: String,
    messages: [
      {
        name: String,
        subject: String,
        message: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now(),
          required: true,
        },
      },
    ],
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

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", ModelSchema);

module.exports = Contact;

export default Contact;
