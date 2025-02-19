import mongoose from "mongoose";

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT, USE_ATLAS } =
  process.env;

const connectDB = async () => {
  try {
    const mongoURI =
      USE_ATLAS === "true"
        ? `mongodb+srv://${DB_USER}:${DB_PASSWORD}${DB_HOST}/${DB_NAME}`
        : `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;

    await mongoose.connect(mongoURI);
    if (process.env.NODE_ENV !== "development") {
      mongoose.set("overwriteModels", true);
    }
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
