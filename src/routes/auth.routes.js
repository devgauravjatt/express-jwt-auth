import { Router } from "express";
import { register, login, verify } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify", authMiddleware, verify);

export default router;
