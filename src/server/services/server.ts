import express from "express"
import cookieParser from "cookie-parser"
import compression from "compression"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
import helmet from "helmet"

async function createServer() {
  /**
   * Load environment variables from .env file, where API keys and passwords are configured.
   */
  if (!['staging', 'production'].includes(process.env.NODE_ENV as string)) {
    dotenv.config({ path: '.env' })
  }

  /**
   * Create Express server.
   */
  const app = express()

  // Use helmet for some out of the box security
  // Only use when deployed on server however as it interferes with our Apollo Studio testing interface
  if(['production', 'staging'].includes(process.env.NODE_ENV as string)) app.use(helmet())
  if(['production', 'staging'].includes(process.env.NODE_ENV as string)) app.use(helmet.contentSecurityPolicy({
    directives: {
      "script-src": [
        "'self'",
      ]
    }
  }))

  /**
   * Express configuration.
   */
  app.use(compression())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(cors({
    origin: '*',
    methods: 'POST,GET,PUT,OPTIONS,PATCH,DELETE',
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization,X-API-KEY'
  }))
  app.use(cookieParser())
  app.use(express.static(path.join(__dirname, '../../../public'), { redirect: false }))

  // Needed while using Heroku as it acts as a proxy
  // Otherwise req.secure and req.protocol not picked up appropriately
  app.enable('trust proxy')

  // // Add some redirect logic to ensure that https is always used in production, staging, development environment
  app.use((req, res, next) => {
    // if NODE_ENV is 'localhost' don't redirect to https, only do so for our deployed server environments
    if (!['development', 'staging', 'production'].includes(process.env.NODE_ENV as string)) return next()

    if (!req.secure) {
      return res.redirect(301, `https://${req.headers.host}${req.originalUrl}`)
    }

    next()
  })

  // Bootstrap middleware routes
  // routes(app)

  return app
}

/**
 * Start Express server connecting to Mongo database
 * Start Apollo Server for connecting our graphql endpoint
 */
const PORT = process.env.PORT || 3000
export async function startServer(application: express.Application) {
  // For jest as supertest will handle listening on a specific port
  if(process.env.NODE_ENV !== "test") {
    application.listen(PORT, async () => {
      console.log(`Listening on port ${PORT} in ${process.env.NODE_ENV} mode`)
    })    
  }
}

export default createServer