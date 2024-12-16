import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'authorsdb',
  connector: 'postgresql',
  url: '',
  host: 'database-2.cf22ioy80xd7.ap-south-1.rds.amazonaws.com',
  port: 5432,
  user: 'postgres',
  password: 't9DM2q!n|L$DYK1OcFU(CyeiX-+m',
  database: 'authordb',
  ssl: {
    rejectUnauthorized: false, // Use cautiously in production
  },
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class AuthorsdbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'authorsdb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.authorsdb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
