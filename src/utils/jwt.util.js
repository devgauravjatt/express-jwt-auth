import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/**
 * Generar token de acceso (corto)
 */
export const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.Role?.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

/**
 * Generar token de actualización (refresh)
 */
export const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
  );
};

/**
 * Verificar token
 */
export const verifyTokenJWT = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
};
