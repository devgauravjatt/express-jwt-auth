import { registerUser, loginUser } from "../services/auth.service.js";
import { successResponse, errorResponse } from "../utils/response.util.js";

export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    return successResponse(res, "Usuario registrado correctamente", user, 201);
  } catch (error) {
    console.log(error)
    return errorResponse(res, error.message, 400);
  }
};

export const login = async (req, res) => {
  try {
    const tokens = await loginUser(req.body);
    return successResponse(res, "Inicio de sesión exitoso", tokens);
  } catch (error) {
    console.log(error)
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
