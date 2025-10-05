import { 
  registerUser, 
  loginUser, 
  updateUser, 
  updatePassword 
} from "../services/auth.service.js";
import { successResponse, errorResponse } from "../utils/response.util.js";

export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    return successResponse(res, "Usuario registrado correctamente", user, 201);
  } catch (error) {
  
    return errorResponse(res, error.message, 400);
  }
};

export const login = async (req, res) => {
  try {
    const tokens = await loginUser(req.body);
    return successResponse(res, "Inicio de sesión exitoso", tokens);
  } catch (error) {
 
    return errorResponse(res, error.message, 401);
  }
};

export const verify = async (req, res) => {
  try {
    return successResponse(res, "Token válido", { user: req.user });
  } catch (error) {
    return errorResponse(res, "Token inválido", 403);
  }
};
/**
 * Actualizar datos del usuario (nombre/email)
 */
export const updateProfile = async (req, res) => {
  try {
    const updatedUser = await updateUser(req.user.id, req.body);
    return successResponse(res, "Usuario actualizado correctamente", updatedUser);
  } catch (error) {

    return errorResponse(res, error.message, 400);
  }
};

/**
 * Cambiar contraseña del usuario
 */
export const changePassword = async (req, res) => {
  try {
    const result = await updatePassword(req.user.id, req.body);
    return successResponse(res, result.message);
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};