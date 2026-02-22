export class LibraryManagement {
  constructor(db) {
    this.libraryDb = db;
  }
  #createBookCatalog() {
    const genreRecordQuery = `CREATE TABLE IF NOT EXISTS genreRecord (
    genre_id integer PRIMARY KEY AUTOINCREMENT,
    genre text NOT NULL
    );`;

    this.libraryDb.exec(genreRecordQuery);

    const bookCatalogQuery = `
    CREATE TABLE IF NOT EXISTS bookCatalog (
    book_id integer PRIMARY KEY AUTOINCREMENT,
    title text NOT NULL,
    author text NOT NULL,
    quantity integer CHECK (quantity >= 0),
    published_year integer NOT NULL,
    genre_id integer NOT NULL,
    FOREIGN KEY(genre_id) REFERENCES genre(genre_id)
    );`;
    this.libraryDb.exec(bookCatalogQuery);

    const customersQuery = `CREATE TABLE IF NOT EXISTS customers (
    customer_id integer PRIMARY KEY AUTOINCREMENT,
    customer_name text NOT NULL,
    role text NOT NULL
    );`;

    this.libraryDb.exec(customersQuery);

    const borrowRecordQuery = `CREATE TABLE IF NOT EXISTS borrowRecord (
      borrow_id integer PRIMARY KEY AUTOINCREMENT,
      customer_id integer NOT NULL,
      book_id integer NOT NULL,
      borrow_date date NOT NULL,
      return_status boolean NOT NULL DEFAULT 0,
      lent_date date CHECK (lent_date>=borrow_date)
      );`;
    this.libraryDb.exec(borrowRecordQuery);
  }
  initialiseDb() {
    this.#createBookCatalog();
  }
}
