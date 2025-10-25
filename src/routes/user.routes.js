import { Router } from 'express'
import {
	findAll,
	findById,
	findByUsername,
	findByEmail,
	setUserActive,
	setUserInactive,
	setUserSuspended,
	setUserBlocked,
} from '../controllers/user.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { roleMiddleware } from '../middlewares/role.middleware.js'

const router = Router()

// List all users (ADMIN only)
router.get('/', authMiddleware, roleMiddleware(['ADMIN']), findAll)

// Get user by ID
router.get('/:id', authMiddleware, findById)

// Get user by username
router.get('/username/:username', authMiddleware, findByUsername)

// Get user by email
router.get('/email/:email', authMiddleware, findByEmail)

// 🔹 User statuses (ADMIN only)
router.put('/:id/activate', authMiddleware, roleMiddleware(['ADMIN']), setUserActive)
router.put('/:id/deactivate', authMiddleware, roleMiddleware(['ADMIN']), setUserInactive)
router.put('/:id/suspend', authMiddleware, roleMiddleware(['ADMIN']), setUserSuspended)
router.put('/:id/block', authMiddleware, roleMiddleware(['ADMIN']), setUserBlocked)
export default router
