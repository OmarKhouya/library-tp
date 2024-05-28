import mongoose from "mongoose";

const ClientSchema = mongoose.Schema(
    {
        clientId: {
            type: Number,
            required: true,
            unique: true,
        },
        nom: String,
        prenom: String,
        email: String,
        telephone: String,
        adresse: String,
    },
    { timestamps: true }
);


const Client = mongoose.model("Client", ClientSchema);

export default Client;