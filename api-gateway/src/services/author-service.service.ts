import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {AuthorsServiceDataSource} from '../datasources';

export interface Author {
  id: number;
  name: string;

}


export interface AuthorService {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  getAuthorById(id: number): Promise<Author>;
}

export class AuthorServiceProvider implements Provider<AuthorService> {
  constructor(
    // authorsService must match the name property in the datasource json file
    @inject('datasources.authorsService')
    protected dataSource: AuthorsServiceDataSource = new AuthorsServiceDataSource(),
  ) {}

  value(): Promise<AuthorService> {
    return getService(this.dataSource);
  }
}
