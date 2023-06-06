import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { logger, errorlogger } from './shared/logger'
import { Server } from 'http'

async function bootstrap(): Promise<void> {
  let server: Server
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Database is connceted Successfully')
    server = app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`)
    })
  } catch (err: any) {
    errorlogger.error('Database is not connceted', err)
  }
  process.on('unhandledRejection', err => {
    if (server) {
      server.close(() => {
        errorlogger.error(err)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}
bootstrap()
