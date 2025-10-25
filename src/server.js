import app from './app.js'
import { sequelize } from './config/db.js'
import './models/index.js' // To synchronize models

const PORT = process.env.PORT || 4000

const startServer = async () => {
	try {
		await sequelize.authenticate()
		console.log('✅ Database connection established successfully.')

		await sequelize.sync({ alter: false }) // Do not change structure
		console.log('🗃️ Models synchronized with database.')

		app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`))
	} catch (error) {
		console.error('❌ Error starting server:', error.message)
	}
}

startServer()
