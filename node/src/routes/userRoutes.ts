import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  searchContacts,
  updateContact,
} from "../controllers/userController.js";
import express from "express";

const router = express.Router();

router.get("/", getAllContacts);
router.get("/search", searchContacts);
router.get("/:id", getContactById);
router.post("/", createContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

export default router;
