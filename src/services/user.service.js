import { User, Role } from "../models/index.js";
import { USER_STATUSES } from "../constants/userStatus.js";
export const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ["password", "refreshToken"] }, // excluye campos sensibles
    include: [
      { model: Role, as: "role", attributes: ["name"] } // alias correcto
    ],
  });

  return users;
};

// Obtener usuario por ID
export const getUserById = async (id) => {
  return await User.findByPk(id, {
    attributes: { exclude: ["password", "refreshToken"] },
    include: [{ model: Role, as: "role", attributes: ["name"] }],
  });
};

// Obtener usuario por username
export const getUserByUsername = async (username) => {
  return await User.findOne({
    where: { username },
    attributes: { exclude: ["password", "refreshToken"] },
    include: [{ model: Role, as: "role", attributes: ["name"] }],
  });
};

// Obtener usuario por email
export const getUserByEmail = async (email) => {
  return await User.findOne({
    where: { email },
    attributes: { exclude: ["password", "refreshToken"] },
    include: [{ model: Role, as: "role", attributes: ["name"] }],
  });
};


/**
 * Cambiar estado de usuario
 */
export const changeUserStatus = async (userId, status) => {
  if (!USER_STATUSES.includes(status)) throw new Error("Estado de usuario no válido.");

  const user = await User.findByPk(userId);
  if (!user) throw new Error("Usuario no encontrado.");

  user.status = status;
  await user.save();

  return await User.findByPk(userId, {
    attributes: { exclude: ["password", "refreshToken"] },
    include: [{ model: Role, as: "role", attributes: ["id", "name"] }],
  });
};


/**
 * Métodos específicos
 */
export const activateUser = async (userId) => changeUserStatus(userId, "ACTIVE");
export const deactivateUser = async (userId) => changeUserStatus(userId, "INACTIVE");
export const suspendUser = async (userId) => changeUserStatus(userId, "SUSPENDED");
export const blockUser = async (userId) => changeUserStatus(userId, "BLOCKED");