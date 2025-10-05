import { getAllUsers, getUserById, getUserByUsername, getUserByEmail } from "../services/user.service.js";
import { successResponse, errorResponse } from "../utils/response.util.js";

export const findAll = async (req, res) => {
  try {
    const users = await getAllUsers();
    return successResponse(res, "Lista de usuarios obtenida correctamente", users);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};
//BUSCAR POR ID
export const findById = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return errorResponse(res, "Usuario no encontrado", 404);
    return successResponse(res, "Usuario encontrado", user);
  } catch (error) {
    console.log(error)
    return errorResponse(res, error.message, 500);
  }
};
// Buscar por username
export const findByUsername = async (req, res) => {
  try {
    const user = await getUserByUsername(req.params.username);
    if (!user) return errorResponse(res, "Usuario no encontrado", 404);
    return successResponse(res, "Usuario encontrado", user);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// Buscar por email
export const findByEmail = async (req, res) => {
  try {
    const user = await getUserByEmail(req.params.email);
    if (!user) return errorResponse(res, "Usuario no encontrado", 404);
    return successResponse(res, "Usuario encontrado", user);
  } catch (error) {
    console.log(error);
    return errorResponse(res, error.message, 500);
  }
};