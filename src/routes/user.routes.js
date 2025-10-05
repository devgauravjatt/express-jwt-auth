import { Router } from "express";
import {
    findAll, findById, findByUsername, findByEmail,
    setUserActive, setUserInactive, setUserSuspended, setUserBlocked
} from "../controllers/user.controller.js";
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

// 🔹 Estados de usuario (solo ADMIN)
router.put("/:id/activate", authMiddleware, roleMiddleware(["ADMIN"]), setUserActive);
router.put("/:id/deactivate", authMiddleware, roleMiddleware(["ADMIN"]), setUserInactive);
router.put("/:id/suspend", authMiddleware, roleMiddleware(["ADMIN"]), setUserSuspended);
router.put("/:id/block", authMiddleware, roleMiddleware(["ADMIN"]), setUserBlocked);
export default router;
