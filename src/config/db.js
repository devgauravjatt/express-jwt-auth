import { Sequelize } from 'sequelize'
import { env } from './env.js'

export const sequelize = new Sequelize(env.db.name, env.db.user, env.db.password, {
	host: env.db.host,
	dialect: 'mysql',
	logging: false,
})

export const connectDB = async () => {
	try {
		await sequelize.authenticate()
		console.log('✅ MySQL connection established successfully.')
	} catch (error) {
		console.error('❌ Error connecting to database:', error.message)
	}
}
