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
      .find((borrowDetail) => borrowDetail.borrow_id === borrowId);

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

  listBooks() {
    return { success: true, data: this.bookCatalog };
  }

  listBooksByCategory(category) {
    if (this.bookCatalog.length == 0) {
      return { success: true, data: [] };
    }
    const data = this.bookCatalog
      .reduce((list, book) => {
        const localCategory = book[category];
        if (list[localCategory]) {
          list[localCategory].push(book);
          return list;
        }

        list[localCategory] = [];
        list[localCategory].push(book);
        return list;
      }, {});
    return { success: true, data: Object.entries(data) };
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
    const date = new Date();
    this.updateLentDate(borrowRecord, date);
    return { success: true };
  }

  updateLentDate(borrowRecord, date) {
    borrowRecord.lent_date = date;
    return { success: true };
  }

  listBooksByUser(userId) {
    const data = this.borrowRecords
      .filter((borrowRecord) => borrowRecord.user_id === userId);
    return { success: true, data };
  }
}
