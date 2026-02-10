export class LibraryManagement {
  constructor() {
    this.bookCatalog = [];
    this.borrowRecord = [];
    this.genre = [];
    this.bookId = 0;
    this.borrowId = 0;
    this.genreId = 0;
  }
  #doesBookExists = (bookDetails) =>
    this.bookCatalog
      .some((book) => book.title === bookDetails.title);

  #doesGenreExists = (genre) =>
    this.genre
      .some((genreDetail) => genreDetail.genre === genre);

  #recieveBookRecord = (book_id) =>
    this.bookCatalog
      .find((book) => book.book_id === book_id);

  addBook(bookDetails) {
    if (this.#doesBookExists(bookDetails)) {
      return { success: false, errorCode: 201 };
    }

    this.bookId++;

    this.bookCatalog
      .push({ book_id: this.bookId, ...bookDetails });

    return { success: true };
  }

  updateQuantity(id, value) {
    const bookDetails = this.#recieveBookRecord(id);

    if (!bookDetails) {
      return { success: false, errorCode: 401 };
    }

    bookDetails.quantity += value;
    return { success: true };
  }

  listBooksByGenre(genreId) {
    const books = this.bookCatalog
      .filter((book) => book.genre_id === genreId);
    return { success: true, data: books };
  }

  listBooks() {
    return { success: true, data: this.bookCatalog };
  }

  addGenre(genre) {
    if (this.#doesGenreExists(genre)) {
      return { success: false, errorCode: 211 };
    }

    this.genreId++;
    this.genre.push({ genre_id: this.genreId, genre });

    return { success: true };
  }

  addBorrowRecord(record) {
    const bookDetails = this.#recieveBookRecord(record.book_id);
    if (!bookDetails) {
      return { success: false, errorCode: 401 };
    }
    this.borrowId++;

    this.borrowRecord.push({ borrow_id: this.borrowId, ...record });
    return { success: true };
  }
}
