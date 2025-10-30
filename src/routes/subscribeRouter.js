import express from "express";
import { subscribeByEmail } from "../controllers/subscribeController.js";

const router = express.Router();

router.post("/", subscribeByEmail);
export default router;
