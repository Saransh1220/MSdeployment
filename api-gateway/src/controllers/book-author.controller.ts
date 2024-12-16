// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import { get,param } from '@loopback/rest';
import { BookService,Book } from '../services';
import { AuthorService,Author } from '../services';


export class BookAuthorController {
  constructor(
    @inject('services.BookService') private bookService: BookService,
    @inject('services.AuthorService') private authorService: AuthorService,
  ) {}


  @get('/books-with-authors')
  async getAllBooksWithAuthors() {
    const books = await this.bookService.getAllBooks();

    const booksWithAuthors = await Promise.all(
      books.map(async book => {
        const author = await this.authorService.getAuthorById(book.author_id);
        return {...book, author};
      }),
    );

    return booksWithAuthors;
  }

  @get('/books-with-authors/{id}')
  async getBookWithAuthor(@param.path.number('id') id: number) {
    const book = await this.bookService.getBookById(id);
    const author = await this.authorService.getAuthorById(book.author_id);

    return {...book, author};
  }

}