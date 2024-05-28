import express from "express";
import mongoose from "mongoose";
import Client from "../database/Client.js";
import cors from "cors";

const app = express();

const PORT = 1111;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

mongoose
  .connect("mongodb://localhost:27017/library-tp")
  .then(() => {
    console.log("connected with database");
  })
  .catch(() => {
    console.log("error connecting with database");
  });

app.use(express.json());

app.get("/clients", async (req, res) => {
  try {
    const clients = await Client.find();

    res.status(200).send(clients);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

app.get("/clients/:clientId", async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const client = await Client.find({ clientId }).catch((err) => {
      throw new Error(err.message);
    });

    res.status(200).send(client);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

app.post("/clients", async (req, res) => {
  try {
    const client = req.body.client;
    const newClient = new Client(client);
    await newClient.save().catch((err) => {
      throw new Error(err.message);
    });
    res.status(200).send({ message: "client created successfully" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

app.put("/clients/:clientId", async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const client = req.body.client;
    const updatedClient = await Client.findOneAndUpdate({ clientId }, client, {
      new: true,
      runValidators: true,
    }).catch((err) => {
      throw new Error(err.message);
    });

    if (!updatedClient) throw new Error("Client not found");
    res.status(200).send({ message: "client updated successfully" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

app.delete("/clients/:clientId", async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const deletedClient = await Client.findOneAndDelete({ clientId }).catch(
      (err) => {
        throw new Error(err.message);
      }
    );
    if (!deletedClient) throw new Error("Client not found");
    res.status(200).send({ message: "client deleted successfully" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

app.listen(PORT, function () {
  console.log(`Server listening on ${PORT}`);
});
