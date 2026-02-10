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
      name: "Pinocchio",
      catrgory: "story",
      price: 399,
      quantity: 10,
    };
    assertEquals(library.addBook(bookDetails), { success: true });
  });
  it("=> shouldn't add a book to bookCatalog: book already exists", () => {
    const bookDetails = {
      name: "Pinocchio",
      catrgory: "story",
      price: 399,
      quantity: 10,
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
  it("=> should update quantity: pinocchio", () => {
    const bookDetails = {
      name: "Pinocchio",
      catrgory: "novel",
      price: 399,
      quantity: 10,
    };

    libraryRegistry.addBook(bookDetails);
    assertEquals(libraryRegistry.updateQuantity(1, 1), { success: true });
  });

  it("=> shouldn't update quantity: id not found", () => {
    const bookDetails = {
      name: "Pinocchio",
      catrgory: "novel",
      price: 399,
      quantity: 10,
    };

    libraryRegistry.addBook(bookDetails);
    assertEquals(libraryRegistry.updateQuantity(2, 1), {
      success: false,
      errorCode: 401,
    });
  });
});

describe("LIST BOOKS: ", () => {
  let library;
  beforeEach(() => {
    library = new LibraryManagement();
  });
  it("=> should list one item in bookCatalog: pinocchio", () => {
    const bookDetails = {
      name: "Pinocchio",
      category: "novel",
      price: 399,
      quantity: 10,
    };
    const books = [{
      book_id: 1,
      name: "Pinocchio",
      category: "novel",
      price: 399,
      quantity: 10,
    }];
    library.addBook(bookDetails);
    assertEquals(library.listBooks("novel"), { success: true, data: books });
  });
  it("=> should list all books: category-poem", () => {
    const novelCategory = {
      name: "Pinocchio",
      category: "novel",
      price: 399,
      quantity: 10,
    };
    const poemCategory = {
      name: "Home",
      category: "poem",
      price: 600,
      quantity: 5,
    };
    const books = [{
      book_id: 2,
      name: "Home",
      category: "poem",
      price: 600,
      quantity: 5,
    }];

    library.addBook(novelCategory);
    library.addBook(poemCategory);
    assertEquals(library.listBooks("poem"), { success: true, data: books });
  });
  it("=> should list empty: no books in library", () => {
    assertEquals(library.listBooks("novel"), { success: true, data: [] });
  });
});

describe("ADD BORROW RECORDS: ", () => {
  let library;
  beforeEach(() => {
    library = new LibraryManagement();
    const novelCategory = {
      name: "Pinocchio",
      category: "novel",
      price: 399,
      quantity: 10,
    };
    library.addBook(novelCategory);
  });

  it("=> should add new borrow_record", () => {
    const borrowRecord = library.addBorrowRecord({
      user_name: "vismaya",
      book_id: 1,
      borrow_date: "10-02-2026",
    });
    assertEquals(borrowRecord, { success: true });
  });

  it("=> shouldn't add a record: book_id is not present", () => {
    const borrowRecord = library.addBorrowRecord({
      user_name: "vismaya",
      book_id: 2,
      borrow_date: "10-02-2026",
    });
    assertEquals(borrowRecord, { success: false, errorCode: 401 });
  });
});
