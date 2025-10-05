import { Router } from "express";
import { register, login, verify ,updateProfile,changePassword} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify", authMiddleware, verify);
// 🔹 Perfil de usuario
router.put("/actualizar", authMiddleware, updateProfile);       // Actualizar nombre/email
router.put("/password", authMiddleware, changePassword);     // Cambiar contraseña

export default router;
