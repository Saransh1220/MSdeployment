import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {BooksServiceDataSource} from '../datasources';

export interface Book {
  id: number;
  title: string;
  author_id: number;
}


export interface BookService {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  getBookById(id: number): Promise<Book>;
  getAllBooks(): Promise<Book[]>;
}

export class BookServiceProvider implements Provider<BookService> {
  constructor(
    // booksService must match the name property in the datasource json file
    @inject('datasources.booksService')
    protected dataSource: BooksServiceDataSource = new BooksServiceDataSource(),
  ) {}

  value(): Promise<BookService> {
    return getService(this.dataSource);
  }
}
