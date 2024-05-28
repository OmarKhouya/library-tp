import mongoose from "mongoose";

const EmpruntSchema = mongoose.Schema(
  {
    empruntId: {
      type: Number,
      unique: true,
      required: true,
    },
    clientId: {
      type: Number,
      required: true,
    },
    livreId: {
      type: Number,
      required: true,
    },
    empruntDate: { type: Date, default: Date.now },
    retournDate: { type: Date },
    empruntStatus: {
      type: String,
      enum: ["Active", "Revenu", "En retard"],
      default: "Active",
    },
  },
  { timestamps: true }
);

const Emprunt = mongoose.model("Emprunt", EmpruntSchema);

export default Emprunt;
