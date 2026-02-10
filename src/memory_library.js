export class LibraryManagement {
  constructor() {
    this.bookCatalog = [];
    this.borrowRecords = [];
    this.genre = [
      { genre_id: 1, genre: "novel" },
      { genre_id: 2, genre: "story" },
      { genre_id: 3, genre: "poem" },
    ];
    this.user = [];
    this.bookId = 0;
    this.borrowId = 0;
    this.userId = 0;
  }
  #doesBookExists = (bookDetails) =>
    this.bookCatalog
      .some((book) => book.title === bookDetails.title);

  #doesUserExists = (userName) =>
    this.user
      .some((userDetail) => userDetail.user_name === userName);

  #recieveBookRecord = (bookId) =>
    this.bookCatalog
      .find((book) => book.book_id === bookId);

  #recieveBorrowRecord = (borrowId) =>
    this.borrowRecords
      .find((borrowDetail) => borrowDetail.book_id === borrowId);

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

  addUser(userName) {
    if (this.#doesUserExists(userName)) {
      return { success: false, errorCode: 212 };
    }

    this.userId++;
    this.user.push({ user_id: this.userId, user_name: userName });
    return { success: true };
  }

  addBorrowRecord(record) {
    const bookDetails = this.#recieveBookRecord(record.book_id);
    if (!bookDetails) {
      return { success: false, errorCode: 401 };
    }
    this.borrowId++;

    this.borrowRecords.push({ borrow_id: this.borrowId, ...record });
    return { success: true };
  }

  toggleStatus(borrowId) {
    const borrowRecord = this.#recieveBorrowRecord(borrowId);
    if (!borrowRecord) {
      return { success: false, errorCode: 401 };
    }

    borrowRecord.status = 1 - borrowRecord.status;
    return { success: true };
  }
}
