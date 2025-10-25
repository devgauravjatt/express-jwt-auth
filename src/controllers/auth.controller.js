import {
	registerUser,
	loginUser,
	updateUser,
	updatePassword,
} from '../services/auth.service.js'
import { successResponse, errorResponse } from '../utils/response.util.js'

export const register = async (req, res) => {
	try {
		const user = await registerUser(req.body)
		return successResponse(res, 'User registered successfully', user, 201)
	} catch (error) {
		return errorResponse(res, error.message, 400)
	}
}

export const login = async (req, res) => {
	try {
		const tokens = await loginUser(req.body)
		return successResponse(res, 'Login successful', tokens)
	} catch (error) {
		return errorResponse(res, error.message, 401)
	}
}

export const verify = async (req, res) => {
	try {
		return successResponse(res, 'Valid token', { user: req.user })
	} catch (error) {
		return errorResponse(res, 'Invalid token', 403)
	}
}

/**
 * Change user password
 */
export const changePassword = async (req, res) => {
	try {
		const result = await updatePassword(req.user.id, req.body)
		return successResponse(res, result.message)
	} catch (error) {
		return errorResponse(res, error.message, 400)
	}
}

/**
 * Update user data (name/email)
 */
export const updateProfile = async (req, res) => {
	try {
		const updatedUser = await updateUser(req.user.id, req.body)
		return successResponse(res, 'User updated successfully', updatedUser)
	} catch (error) {
		return errorResponse(res, error.message, 400)
	}
}
