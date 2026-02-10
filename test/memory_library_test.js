import { assertEquals } from "@std/assert";
import { beforeEach, describe, it } from "@std/testing";
import { LibraryManagement } from "../src/memory_library.js";

describe("ADDS BOOKS : ", () => {
  let library;
  beforeEach(() => {
    library = new LibraryManagement();
  });
  it("=> should add a new book to bookCatalog: 'Pinocchio'", () => {
    const bookDetails = {
      title: "Pinocchio",
      genre: "story",
      publish_year: 1883,
      author: "Carlo Collodi",
      quantity: 10,
      price: 399,
    };
    assertEquals(library.addBook(bookDetails), { success: true });
  });
  it("=> shouldn't add a book to bookCatalog: book already exists", () => {
    const bookDetails = {
      title: "Pinocchio",
      genre: "story",
      publish_year: 1883,
      author: "Carlo Collodi",
      quantity: 10,
      price: 399,
    };
    library.addBook(bookDetails);
    assertEquals(library.addBook(bookDetails), {
      success: false,
      errorCode: 201,
    });
  });
});

describe("UPDATE QUANTITY", () => {
  let libraryRegistry;
  beforeEach(() => {
    libraryRegistry = new LibraryManagement();
  });
  it("=> should update quantity: 'Pinocchio'", () => {
    const bookDetails = {
      title: "Pinocchio",
      genre_id: 1,
      publish_year: 1883,
      author: "Carlo Collodi",
      quantity: 10,
      price: 399,
    };

    libraryRegistry.addBook(bookDetails);
    assertEquals(libraryRegistry.updateQuantity(1, 1), { success: true });
  });

  it("=> shouldn't update quantity: id not found", () => {
    const bookDetails = {
      title: "Pinocchio",
      genre_id: 1,
      publish_year: 1883,
      author: "Carlo Collodi",
      quantity: 10,
      price: 399,
    };

    libraryRegistry.addBook(bookDetails);
    assertEquals(libraryRegistry.updateQuantity(2, 1), {
      success: false,
      errorCode: 401,
    });
  });
});

describe("LIST BOOKS BY GENRE: ", () => {
  let library;
  beforeEach(() => {
    library = new LibraryManagement();
  });
  it("=> should list one item in bookCatalog: 'Pinocchio'", () => {
    const bookDetails = {
      title: "Pinocchio",
      genre_id: 1,
      publish_year: 1883,
      author: "Carlo Collodi",
      quantity: 10,
      price: 399,
    };
    const books = [{
      book_id: 1,
      title: "Pinocchio",
      genre_id: 1,
      publish_year: 1883,
      author: "Carlo Collodi",
      quantity: 10,
      price: 399,
    }];
    library.addBook(bookDetails);
    assertEquals(library.listBooksByGenre(1), {
      success: true,
      data: books,
    });
  });
  it("=> should list all books: genre-Fiction", () => {
    const novelCategory = {
      title: "Pinocchio",
      genre_id: 1,
      publish_year: 1883,
      author: "Carlo Collodi",
      quantity: 10,
      price: 399,
    };
    const fictionCategory = {
      title: "The Complete Sherlock Holmes,",
      genre_id: 2,
      publish_year: "2014-05-28",
      author: "Arthur Conan Doyle",
      price: 600,
      quantity: 5,
    };
    const books = [{
      book_id: 2,
      title: "The Complete Sherlock Holmes,",
      genre_id: 2,
      publish_year: "2014-05-28",
      author: "Arthur Conan Doyle",
      price: 600,
      quantity: 5,
    }];

    library.addBook(novelCategory);
    library.addBook(fictionCategory);
    assertEquals(library.listBooksByGenre(2), {
      success: true,
      data: books,
    });
  });
  it("=> should list empty: no books in library", () => {
    assertEquals(library.listBooksByGenre(1), {
      success: true,
      data: [],
    });
  });
});

describe("LIST BOOKS: ", () => {
  let library;
  beforeEach(() => {
    library = new LibraryManagement();
  });
  it("=> should list all items in book catalog: ", () => {
    const novelCategory = {
      title: "Pinocchio",
      genre_id: 1,
      publish_year: 1883,
      author: "Carlo Collodi",
      quantity: 10,
      price: 399,
    };
    const books = [{
      book_id: 1,
      title: "Pinocchio",
      genre_id: 1,
      publish_year: 1883,
      author: "Carlo Collodi",
      quantity: 10,
      price: 399,
    }];

    library.addBook(novelCategory);
    assertEquals(library.listBooks(), { success: true, data: books });
  });

  it("should list empty: no books in bookCatalog", () => {
    assertEquals(library.listBooks(), { success: true, data: [] });
  });
});

describe("ADD BORROW RECORDS: ", () => {
  let library;
  beforeEach(() => {
    library = new LibraryManagement();
    const novelCategory = {
      title: "Pinocchio",
      genre_id: 1,
      publish_year: 1883,
      author: "Carlo Collodi",
      quantity: 10,
      price: 399,
    };
    library.addBook(novelCategory);
  });

  it("=> should add new borrow_record", () => {
    const borrowRecord = library.addBorrowRecord({
      user_id: 1,
      book_id: 1,
      borrow_date: "10-02-2026",
      status: 0,
    });
    assertEquals(borrowRecord, { success: true });
  });

  it("=> shouldn't add a record: book_id is not present", () => {
    const borrowRecord = library.addBorrowRecord({
      user_id: 1,
      book_id: 2,
      borrow_date: "10-02-2026",
      status: 0,
    });
    assertEquals(borrowRecord, { success: false, errorCode: 401 });
  });
});

describe.ignore("UPDATE LENT DATE: ", () => {
  let library;
  beforeEach(() => {
    library = new LibraryManagement();
    const novelCategory = {
      title: "Pinocchio",
      genre_id: 1,
      publish_year: 1883,
      author: "Carlo Collodi",
      quantity: 10,
      price: 399,
    };
    library.addBook(novelCategory);
    library.addBorrowRecord({
      user_id: 1,
      book_id: 2,
      borrow_date: "10-02-2026",
    });

    it("=> should update lent_date:");
  });
});
