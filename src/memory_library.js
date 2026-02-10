export class LibraryManagement {
  constructor() {
    this.bookCatalog = [];
    this.bookId = 0;
  }
  #doesBookExists = (bookDetails) =>
    this.bookCatalog
      .some((book) => book.name === bookDetails.name);

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
    const bookDetails = this.bookCatalog
      .find((book) => book.book_id === id);

    if (!bookDetails) {
      return { success: false, errorCode: 401 };
    }

    bookDetails.quantity += value;
    return { success: true };
  }

  listBooks(category) {
    const books = this.bookCatalog
      .filter((book) => book.category === category);
    return { success: true, data: books };
  }
}
