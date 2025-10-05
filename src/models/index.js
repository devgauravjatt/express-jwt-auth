import { sequelize } from "../config/db.js";
import { User } from "./user.model.js";
import { Role } from "./role.model.js";

// ❌ No definas relaciones aquí
// ✅ Solo exporta los modelos
export { sequelize, User, Role };
