import express from "express";
import mongoose from "mongoose";
import Livre from "./database/Livre";
import cors from "cors";

const app = express();

mongoose
  .connect("mongodb://localhost:27017/library-tp")
  .then(() => {
    console.log("connected with database");
  })
  .catch(() => {
    console.log("error connecting with database");
  });


const PORT = 1113;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.get("/livres/:livreId", async (req, res) => {
  try {
    let livreId = parseInt(req.params.livreId);
    let livre = await Livre.findOne({ livreId }).catch((err) => {
      throw new Error(err.message);
    });

    return res.status(200).send(livre);
  } catch (err) {
    return res.status(404).send({ error: err.message });
  }
});

app.post("/livres", async (req, res) => {
  try {
    const livre = req.body.livre;
    if (!livre) throw new Error("livre data isn't complete");
    const newLivre = new Livre(livre);
    await newLivre.save().catch((err) => {
      throw new Error(err.message);
    });
    console.log(newLivre);

    return res.status(200).send({ message: "livre created successfully" });
  } catch (err) {
    return res.status(404).send({ error: err.message });
  }
});

app.put("/livres/:livreId", async (req, res) => {
  try {
    const livreId = parseInt(req.params.livreId);
    const livre = req.body;

    if (!livre) {
      throw new Error("Livre data is necessary");
    }

    await Livre.findOne({ livreId }).catch((err) => {
      throw new Error(err.message);
    });

    await Livre.updateOne({ livreId }, { $set: livre }).catch((err) => {
      throw new Error(err.message);
    });

    return res.status(200).send({ message: "Livre updated successfully" });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

app.delete("/livres/:livreId", async (req, res) => {
  try {
    const livreId = parseInt(req.params.livreId);

    await Livre.findOne({ livreId }).catch((err) => {
      throw new Error(err.message);
    });

    await Livre.deleteOne({ livreId }).catch((err) => {
      throw new Error(err.message);
    });

    return res.status(200).send({ message: "Livre deleted successfully" });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

app.listen(PORT, function () {
  console.log(`Server listening on ${PORT}`);
});
