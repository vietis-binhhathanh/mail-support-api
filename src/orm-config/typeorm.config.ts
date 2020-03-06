import * as config from 'config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../auth/users/user.entity';
import { Logger } from '@nestjs/common';

const dbConfig = config.get('db');
const logger = new Logger('bootstrap');

export const typeormConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_HOST || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  entities : [ User ],
  synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
}

logger.log(`port: ${typeormConfig.port}`);
logger.log(`host: ${typeormConfig.host}`);
logger.log(`user: ${typeormConfig.username}`);
logger.log(`pass: ${typeormConfig.password}`);
logger.log(`db: ${typeormConfig.database}`);
