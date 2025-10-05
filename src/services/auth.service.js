import bcrypt from "bcryptjs";
import { User, Role } from "../models/index.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.util.js";

/**
 * Registrar un nuevo usuario
 */
export const registerUser = async ({ name, email, password, roleName = "USER" }) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) throw new Error("El correo ya está registrado.");

  const hashedPassword = await bcrypt.hash(password, 10);

  const role = await Role.findOne({ where: { name: roleName } });
  if (!role) throw new Error("El rol especificado no existe.");

  const user = await User.create({
    username:name,
    email,
    password: hashedPassword,
    roleId: role.id,
  });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  return { user, accessToken, refreshToken };
};

/**
 * Iniciar sesión
 */
export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({
    where: { email },
    include: [
      {
        model: Role,
        as: "role",
        attributes: ["id", "name"],
      },
    ],
  });

  if (!user) throw new Error("Usuario no encontrado.");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Contraseña incorrecta.");

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  // 🔹 Retorna solo el token de acceso
  return { accessToken };
};


/**
 * Renovar tokens usando refreshToken
 */
export const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) throw new Error("Token de actualización faltante.");

  const user = await User.findOne({ where: { refreshToken }, include: Role });
  if (!user) throw new Error("Token no válido.");

  const newAccessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);

  user.refreshToken = newRefreshToken;
  await user.save();

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

/**
 * Cerrar sesión
 */
export const logoutUser = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error("Usuario no encontrado.");

  user.refreshToken = null;
  await user.save();

  return { message: "Sesión cerrada correctamente." };
};
