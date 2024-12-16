import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'authorsService',
  connector: 'rest',
  baseURL: 'http://authors-service:3000',
  crud: false,
  operations: [
    {
      template: {
        method: 'GET',
        url: 'http://authors-service:3000/authors/{id}', //authors-service for docker else localhost:3002
      },
      functions: {
        getAuthorById: ['id'],
      },
    },
  ],
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class AuthorsServiceDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'authorsService';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.authorsService', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
