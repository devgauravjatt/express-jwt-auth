import { getAllUsers, getUserById, getUserByUsername, getUserByEmail,  activateUser,
  deactivateUser,
  suspendUser,
  blockUser } from "../services/user.service.js";
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
   
    return errorResponse(res, error.message, 500);
  }
};

/**
 * Controladores de estado
 */
export const setUserActive = async (req, res) => {
  try {
    const user = await activateUser(req.params.id);
    return successResponse(res, "Usuario activado correctamente", user);
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

export const setUserInactive = async (req, res) => {
  try {
    const user = await deactivateUser(req.params.id);
    return successResponse(res, "Usuario desactivado correctamente", user);
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

export const setUserSuspended = async (req, res) => {
  try {
    const user = await suspendUser(req.params.id);
    return successResponse(res, "Usuario suspendido correctamente", user);
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

export const setUserBlocked = async (req, res) => {
  try {
    const user = await blockUser(req.params.id);
    return successResponse(res, "Usuario bloqueado correctamente", user);
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

