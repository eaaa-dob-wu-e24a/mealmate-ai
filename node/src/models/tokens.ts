import mongoose, { InferSchemaType, model } from "mongoose";

const tokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

type TokenType = InferSchemaType<typeof tokenSchema>;
const Token = model<TokenType>("Token", tokenSchema);

export default Token;
