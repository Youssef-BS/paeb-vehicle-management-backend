import express from "express";
import { Login , register } from "../controllers/Auth";

const router = express.Router();

router.post("/login", Login);
router.post("/add-user" , register)

export default router;