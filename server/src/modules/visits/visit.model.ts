import mongoose from "mongoose";

const ModelSchema = new mongoose.Schema(
  {
    portfolioId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Portfolio",
    },
    visitDate: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    visitData: {
      type: Object,
      required: true,
      default: {},
    },
    visitType: {
      type: String,
      required: true,
      default: "url",
      enum: ["url", "email", "qr", "other"],
    },
  },
  {
    timestamps: true,
  }
);

ModelSchema.methods.getVisitNumber = async function (
  portfolioId: string
): Promise<number> {
  const visitNumber = await Visit.countDocuments({ portfolioId });
  return visitNumber;
};

ModelSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

ModelSchema.set("toJSON", {
  virtuals: true,
});

const Visit = mongoose.models.Visit || mongoose.model("Visit", ModelSchema);

module.exports = Visit;

export default Visit;
