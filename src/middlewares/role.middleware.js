export const roleMiddleware = (roles = []) => {
	return (req, res, next) => {
		if (!req.user || !roles.includes(req.user.role?.name)) {
			return res.status(403).json({
				success: false,
				message: 'Access denied. You do not have sufficient permissions.',
			})
		}
		next()
	}
}
