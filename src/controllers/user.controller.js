import {
	getAllUsers,
	getUserById,
	getUserByUsername,
	getUserByEmail,
	activateUser,
	deactivateUser,
	suspendUser,
	blockUser,
} from '../services/user.service.js'
import { successResponse, errorResponse } from '../utils/response.util.js'

export const findAll = async (req, res) => {
	try {
		const users = await getAllUsers()
		return successResponse(res, 'User list obtained successfully', users)
	} catch (error) {
		return errorResponse(res, error.message, 500)
	}
}
// SEARCH BY ID
export const findById = async (req, res) => {
	try {
		const user = await getUserById(req.params.id)
		if (!user) return errorResponse(res, 'User not found', 404)
		return successResponse(res, 'User found', user)
	} catch (error) {
		return errorResponse(res, error.message, 500)
	}
}
// Search by username
export const findByUsername = async (req, res) => {
	try {
		const user = await getUserByUsername(req.params.username)
		if (!user) return errorResponse(res, 'User not found', 404)
		return successResponse(res, 'User found', user)
	} catch (error) {
		return errorResponse(res, error.message, 500)
	}
}

// Search by email
export const findByEmail = async (req, res) => {
	try {
		const user = await getUserByEmail(req.params.email)
		if (!user) return errorResponse(res, 'User not found', 404)
		return successResponse(res, 'User found', user)
	} catch (error) {
		return errorResponse(res, error.message, 500)
	}
}

/**
 * Status controllers
 */
export const setUserActive = async (req, res) => {
	try {
		const user = await activateUser(req.params.id)
		return successResponse(res, 'User activated successfully', user)
	} catch (error) {
		return errorResponse(res, error.message, 400)
	}
}

export const setUserInactive = async (req, res) => {
	try {
		const user = await deactivateUser(req.params.id)
		return successResponse(res, 'User deactivated successfully', user)
	} catch (error) {
		return errorResponse(res, error.message, 400)
	}
}

export const setUserSuspended = async (req, res) => {
	try {
		const user = await suspendUser(req.params.id)
		return successResponse(res, 'User suspended successfully', user)
	} catch (error) {
		return errorResponse(res, error.message, 400)
	}
}

export const setUserBlocked = async (req, res) => {
	try {
		const user = await blockUser(req.params.id)
		return successResponse(res, 'User blocked successfully', user)
	} catch (error) {
		return errorResponse(res, error.message, 400)
	}
}
