import { User, Role } from '../models/index.js'
import { USER_STATUSES } from '../constants/userStatus.js'
export const getAllUsers = async () => {
	const users = await User.findAll({
		attributes: { exclude: ['password', 'refreshToken'] }, // excludes sensitive fields
		include: [
			{ model: Role, as: 'role', attributes: ['name'] }, // correct alias
		],
	})

	return users
}

// Get user by ID
export const getUserById = async (id) => {
	return await User.findByPk(id, {
		attributes: { exclude: ['password', 'refreshToken'] },
		include: [{ model: Role, as: 'role', attributes: ['name'] }],
	})
}

// Get user by username
export const getUserByUsername = async (username) => {
	return await User.findOne({
		where: { username },
		attributes: { exclude: ['password', 'refreshToken'] },
		include: [{ model: Role, as: 'role', attributes: ['name'] }],
	})
}

// Get user by email
export const getUserByEmail = async (email) => {
	return await User.findOne({
		where: { email },
		attributes: { exclude: ['password', 'refreshToken'] },
		include: [{ model: Role, as: 'role', attributes: ['name'] }],
	})
}

/**
 * Change user status
 */
export const changeUserStatus = async (userId, status) => {
	if (!USER_STATUSES.includes(status)) throw new Error('Invalid user status.')

	const user = await User.findByPk(userId)
	if (!user) throw new Error('User not found.')

	user.status = status
	await user.save()

	return await User.findByPk(userId, {
		attributes: { exclude: ['password', 'refreshToken'] },
		include: [{ model: Role, as: 'role', attributes: ['id', 'name'] }],
	})
}

/**
 * Specific methods
 */
export const activateUser = async (userId) => changeUserStatus(userId, 'ACTIVE')
export const deactivateUser = async (userId) => changeUserStatus(userId, 'INACTIVE')
export const suspendUser = async (userId) => changeUserStatus(userId, 'SUSPENDED')
export const blockUser = async (userId) => changeUserStatus(userId, 'BLOCKED')
