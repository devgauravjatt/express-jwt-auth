import { User, Role } from "../models/index.js";

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