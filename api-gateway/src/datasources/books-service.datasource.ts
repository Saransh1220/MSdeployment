import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'booksService',
  connector: 'rest',
  baseURL: 'http://books-service:3000',
  crud: false,
  operations: [
    {
      template: {
        method: 'GET',
        url: 'http://books-service:3000/books',
      },
      functions: {
        getAllBooks: [],
      },
    },
    {
      template: {
        method: 'GET',
        url: 'http://books-service:3000/books/{id}', //books-service for docker, else localhost:3001
      },
      functions: {
        getBookById: ['id'],
      },
    },
  ],
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class BooksServiceDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'booksService';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.booksService', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
