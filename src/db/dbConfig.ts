import mongoose from "mongoose";

const mongoURL = process.env.mongo_url;

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("Connected to MongoDB");
        });
        connection.on("error", (err) => {
            console.error("MongoDB connection error:", err);
            process.exit();
        });
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
}
