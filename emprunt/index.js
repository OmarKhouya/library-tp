import express from "express";
import mongoose from "mongoose";
import Emprunt from "../database/Emprunt.js";
import cors from "cors";

const app = express();

const PORT = 1112;

mongoose
  .connect("mongodb://localhost:27017/library-tp")
  .then(() => {
    console.log("connected with database");
  })
  .catch(() => {
    console.log("error connecting with database");
  });

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.get("/emprunts", async (req, res) => {
  try {
    let emprunts = await Emprunt.find();

    return res.status(200).send(emprunts);
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

app.get("/emprunts/client/:clientId", async (req, res) => {
  try {
    const clientId = req.params.clientId;

    let emprunts = await Emprunt.find({ clientId }).catch((err) => {
      throw new Error(err.message);
    });

    return res.status(200).send(emprunts);
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

app.post("/emprunts", async (req, res) => {
  try {
    const emprunt = req.body.emprunt;
    let newEmprunt = await new Emprunt(emprunt);
    await newEmprunt.save().catch((err) => {
      throw new Error(err.message);
    });

    return res.status(200).send({ message: "emprunt created successfully" });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

app.put("/emprunts/:empruntId", async (req, res) => {
  try {
    const empruntId = parseInt(req.params.empruntId);
    const emprunt = req.body;
    const updatedEmprunt = await Emprunt.findOneAndUpdate(
      { empruntId },
      emprunt,
      { new: true, runValidators: true }
    ).catch((err) => {
      throw new Error(err.message);
    });

    if (!updatedEmprunt) throw new Error("coudn't find and update emprunt");

    return res.status(200).send({ message: "emprunt updated successfully" });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

app.delete("/emprunts/:empruntId", async (req, res) => {
  try {
    const empruntId = req.params.empruntId;
    const deletedEmprunt = await Emprunt.findOneAndDelete({ empruntId }).catch(
      (err) => {
        throw new Error(err.message);
      }
    );

    if (!deletedEmprunt) throw new Error("emprunt not found");
    return res.status(200).send({ message: "Emprunt deleted successfully" });
  } catch (err) {
    throw new Error(err.message);
  }
});

app.listen(PORT, function () {
  console.log(`Server listening on ${PORT}`);
});
