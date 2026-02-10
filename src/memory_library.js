export class LibraryRegistry {
  constructor() {
    this.bookCatalog = [];
    this.bookId = 0;
  }
  #doesBookExists = (bookDetails) =>
    this.bookCatalog.some((book) => book.name === bookDetails.name);

  addBook(bookDetails) {
    if (this.#doesBookExists(bookDetails)) {
      return { success: false, errorCode: 201 };
    }

    this.bookCatalog.push(bookDetails);
    return { success: true };
  }

  updateQuantity(id, value) {
    const bookDetails = this.bookCatalog
      .find((bookDetail) => bookDetail.id === id);

    if (!bookDetails) {
      return { success: false, errorCode: 301 };
    }

    bookDetails.quantity += value;
    return { success: true };
  }
}
