import express from "express";
import { createAccount, signin } from "../controllers/auth";

const router = express.Router();

router.post("/signup", createAccount);
router.post("/signin", signin);
export default router;
