import cors from "cors";
import express from "express";
import { middleware } from "./middleware.js";
import connectDB from "./database.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import recipeRoutes from "routes/recipeRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use(middleware);

const PORT = process.env.PORT || 8000;

connectDB();

const apiRouter = express.Router();
app.use("/api", apiRouter);

apiRouter.use("/user", userRoutes);
apiRouter.use("/chat", chatRoutes);
apiRouter.use("/auth", authRoutes);
apiRouter.use("/recipes", recipeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
