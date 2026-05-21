import mongoose from "mongoose";

const atlasWhitelistHint =
  "MongoDB Atlas rejected the connection. Add your current public IP address in Atlas > Network Access, or temporarily allow 0.0.0.0/0 for testing only.";

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error(
      "MONGO_URI is missing. Add MONGO_URI in Vercel Project Settings > Environment Variables, or create backend/.env from .env.example for local development."
    );
  }

  if (!/^mongodb(\+srv)?:\/\//.test(mongoUri)) {
    throw new Error(
      'MONGO_URI is invalid. It must start with "mongodb://" or "mongodb+srv://". Check your Vercel environment variable or backend/.env for extra text or typos.'
    );
  }

  try {
    const connection = await mongoose.connect(mongoUri, {
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
