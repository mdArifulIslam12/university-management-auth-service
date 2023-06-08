import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { logger, errorlogger } from './shared/logger';

process.on('uncaughtException', error => {
  errorlogger.error(error.message);
  process.exit(1);
});

let server: Server;

async function bootstrap(): Promise<void> {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('Database is connceted Successfully');
    server = app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`);
    });
  } catch (err: any) {
    errorlogger.error('Database is not connceted', err);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorlogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
bootstrap();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is a received');
  if (server) {
    server.close();
  }
});
