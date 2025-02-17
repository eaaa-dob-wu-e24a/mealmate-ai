import mongoose from "mongoose";

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, NODE_ENV } =
  process.env;

// Use localhost when running locally, DB_HOST when running in container
// const host = NODE_ENV === "development" ? "localhost" : DB_HOST;
const MONGODB_URL = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;

if (!MONGODB_URL) {
  const errorMessage =
    NODE_ENV === "production"
      ? "Please define the MONGODB_URL environment variable — pointing to your full connection string, including database name."
      : "Please define the MONGODB_URL environment variable inside an .env file — pointing to your full connection string, including database name.";
  throw new Error(errorMessage);
}

// Call this function from entry.server.jsx. We reuse an existing Mongoose db
// connection to avoid creating multiple connections in dev mode when Remix
// "purges the require cache" when reloading on file changes.
export default function connectDb() {
  if (NODE_ENV === "development") {
    // In development mode, we want to overwrite any existing models to ensure
    // we pick up any changes made in schemas.
    mongoose.set("overwriteModels", true);
  }

  // Reuse the existing Mongoose connection if we have one...
  // https://mongoosejs.com/docs/api/connection.html#connection_Connection-readyState
  const readyState = mongoose.connection.readyState;
  if (readyState > 0) {
    console.log(
      "Mongoose: Re-using existing connection (readyState: %d)",
      readyState
    );
    return;
  }

  // If no connection exists yet, set up event logging...
  // https://mongoosejs.com/docs/connections.html#connection-events
  mongoose.connection.on("error", (error) => {
    console.error("Mongoose: error %s", error);
  });

  for (const event of ["connected", "reconnected", "disconnected", "close"]) {
    mongoose.connection.on(event, () => console.log("Mongoose: %s", event));
  }

  // ...and create a new connection:
  mongoose.connect(MONGODB_URL!).catch((error) => {
    console.error(error);
  });
}
