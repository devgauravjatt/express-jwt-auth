import { Router } from "express";
import { findAll, findById,findByUsername,findByEmail} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = Router();

// Listar todos los usuarios (solo ADMIN)
router.get("/", authMiddleware, roleMiddleware(["ADMIN"]), findAll);

// Obtener usuario por ID
router.get("/:id", authMiddleware, findById);

// Obtener usuario por username
router.get("/username/:username", authMiddleware, findByUsername);

// Obtener usuario por email
router.get("/email/:email", authMiddleware, findByEmail);

export default router;
