import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'
import { Role } from './role.model.js'

export const User = sequelize.define(
	'User',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		username: {
			// Changed from "name" to "username"
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(150),
			allowNull: false,
			unique: true,
			validate: { isEmail: true },
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		refreshToken: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		status: {
			type: DataTypes.ENUM('ACTIVE', 'INACTIVE', 'BLOCKED', 'SUSPENDED'),
			allowNull: false,
			defaultValue: 'ACTIVE', // default when creating a user
		},
	},
	{
		tableName: 'users',
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	}
)

// 🔗 Define relationships ONLY ONCE
Role.hasMany(User, { foreignKey: 'role_id', as: 'users' })
User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' })
