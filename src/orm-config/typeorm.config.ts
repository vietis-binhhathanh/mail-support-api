import * as config from 'config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Logger } from '@nestjs/common';
import {User} from '../entitties/user.entity';
import {Task} from '../entitties/task.entity';
import {Project} from '../entitties/project.entity';
import {Mail} from '../entitties/mail.entity';

const dbConfig = config.get('db');
const logger = new Logger('bootstrap');

export const typeormConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_HOST || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  entities : [ User, Task, Project, Mail ],
  synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
}

