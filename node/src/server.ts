import cors from "cors";
import express from "express";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./database.js";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;

connectDB();

const apiRouter = express.Router();
app.use("/api", apiRouter);

apiRouter.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
