import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import { errorMiddleware } from './middlewares/error.middleware.js'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import path from 'path'

const app = express()

// Global middlewares
app.use(
	cors({
		origin: 'http://localhost:5173', // frontend domain
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true, // if handling cookies in the future
	})
)

app.use(express.json())
app.use(morgan('dev'))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

// Swagger Docs
const __dirname = path.resolve()
const swaggerDocument = YAML.load(path.join(__dirname, 'src/docs/api-docs.yaml'))
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Global error middleware
app.use(errorMiddleware)

export default app
