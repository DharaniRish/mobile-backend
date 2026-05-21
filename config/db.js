import mongoose from "mongoose";

const atlasWhitelistHint =
  "MongoDB Atlas rejected the connection. Add your current public IP address in Atlas > Network Access, or temporarily allow 0.0.0.0/0 for testing only.";

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error(
      "MONGO_URI is missing. Create backend/.env from .env.example and add your MongoDB connection string."
    );
  }

  if (!/^mongodb(\+srv)?:\/\//.test(process.env.MONGO_URI)) {
    throw new Error(
      'MONGO_URI is invalid. It must start with "mongodb://" or "mongodb+srv://". Check backend/.env for extra text or typos.'
    );
  }

  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    if (error?.message?.includes("Could not connect to any servers in your MongoDB Atlas cluster")) {
      throw new Error(atlasWhitelistHint);
    }

    throw error;
  }
};

export default connectDB;
