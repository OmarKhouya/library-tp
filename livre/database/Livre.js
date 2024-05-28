import mongoose from "mongoose";

const LivreSchema = mongoose.Schema(
  {
    livreId: {
      type: String,
      required: true,
      unique: true,
    },
    titre: String,
    auteur: String,
    genre: String,
    dateRealisation: Date,
  },
  { timestamps: true }
);

const Livre = mongoose.model("Livre", LivreSchema);

export default Livre;
