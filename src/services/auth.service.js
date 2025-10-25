import bcrypt from 'bcryptjs'
import { User, Role } from '../models/index.js'
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.util.js'

/**
 * Register a new user
 */
export const registerUser = async ({ name, email, password, roleName = 'USER' }) => {
	const existingUser = await User.findOne({ where: { email } })
	if (existingUser) throw new Error('Email is already registered.')

	const hashedPassword = await bcrypt.hash(password, 10)

	const role = await Role.findOne({ where: { name: roleName } })
	if (!role) throw new Error('Specified role does not exist.')

	const user = await User.create({
		username: name,
		email,
		password: hashedPassword,
		roleId: role.id,
	})

	const accessToken = generateAccessToken(user)
	const refreshToken = generateRefreshToken(user)

	user.refreshToken = refreshToken
	await user.save()

	return { user, accessToken, refreshToken }
}

/**
 * Login
 */
export const loginUser = async ({ email, password }) => {
	const user = await User.findOne({
		where: { email },
		include: [
			{
				model: Role,
				as: 'role',
				attributes: ['id', 'name'],
			},
		],
	})

	if (!user) throw new Error('User not found.')

	const isMatch = await bcrypt.compare(password, user.password)
	if (!isMatch) throw new Error('Incorrect password.')

	const accessToken = generateAccessToken(user)
	const refreshToken = generateRefreshToken(user)

	user.refreshToken = refreshToken
	await user.save()

	// 🔹 Returns only the access token
	return { user, accessToken }
}

/**
 * Refresh tokens using refreshToken
 */
export const refreshAccessToken = async (refreshToken) => {
	if (!refreshToken) throw new Error('Refresh token missing.')

	const user = await User.findOne({ where: { refreshToken }, include: Role })
	if (!user) throw new Error('Invalid token.')

	const newAccessToken = generateAccessToken(user)
	const newRefreshToken = generateRefreshToken(user)

	user.refreshToken = newRefreshToken
	await user.save()

	return { accessToken: newAccessToken, refreshToken: newRefreshToken }
}

/**
 * Logout
 */
export const logoutUser = async (userId) => {
	const user = await User.findByPk(userId)
	if (!user) throw new Error('User not found.')

	user.refreshToken = null
	await user.save()

	return { message: 'Session closed successfully.' }
}

/**
 * Update user password
 */
export const updatePassword = async (userId, { oldPassword, newPassword }) => {
	const user = await User.findByPk(userId)
	if (!user) throw new Error('User not found.')

	const isMatch = await bcrypt.compare(oldPassword, user.password)
	if (!isMatch) throw new Error('Current password is incorrect.')

	const hashedPassword = await bcrypt.hash(newPassword, 10)
	user.password = hashedPassword

	await user.save()

	return { message: 'Password updated successfully.' }
}

/**
 * Update user data (name and/or email)
 */
export const updateUser = async (userId, { name, email }) => {
	const user = await User.findByPk(userId)
	if (!user) throw new Error('User not found.')

	if (name) user.username = name

	if (email && email !== user.email) {
		// Verify that the email is not being used by another user
		const existingUser = await User.findOne({ where: { email } })
		if (existingUser && existingUser.id !== userId) {
			throw new Error('Email is already registered by another user.')
		}
		user.email = email
	}

	await user.save()

	return await User.findByPk(userId, {
		attributes: { exclude: ['password', 'refreshToken'] },
		include: [{ model: Role, as: 'role', attributes: ['id', 'name'] }],
	})
}
