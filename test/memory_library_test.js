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
  let library;
  beforeEach(() => {
    library = new LibraryManagement();
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

    library.addBook(bookDetails);
    assertEquals(library.updateQuantity(1, 1), { success: true });
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

    library.addBook(bookDetails);
    assertEquals(library.updateQuantity(2, 1), {
      success: false,
      errorCode: 401,
    });
  });
});

describe("LIST BY CATEGORY: ", () => {
  let library;
  beforeEach(() => {
    library = new LibraryManagement();
  });
  it("=> should list all records by category: 'novel'", () => {
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
    library.addBook(novelCategory);
    library.addBook(fictionCategory);
    const data = [
      ["1", [{
        book_id: 1,
        title: "Pinocchio",
        genre_id: 1,
        publish_year: 1883,
        author: "Carlo Collodi",
        quantity: 10,
        price: 399,
      }]],
      ["2", [{
        book_id: 2,
        title: "The Complete Sherlock Holmes,",
        genre_id: 2,
        publish_year: "2014-05-28",
        author: "Arthur Conan Doyle",
        price: 600,
        quantity: 5,
      }]],
    ];

    assertEquals(library.listByCategory("genre_id"), {
      success: true,
      data,
    });
  });
  it("=> should list empty: no records in books", () => {
    assertEquals(library.listByCategory("genre_id"), {
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

describe("ADD USER: ", () => {
  let library;
  beforeEach(() => {
    library = new LibraryManagement();
  });

  it("=> should add a new user: ", () => {
    assertEquals(library.addUser("vismaya"), { success: true });
  });

  it("=> shouldn't add user: user already exists", () => {
    library.addUser("vismaya");
    assertEquals(library.addUser("vismaya"), {
      success: false,
      errorCode: 212,
    });
  });
});

describe("TOGGLE STATUS: ", () => {
  let library;
  beforeEach(() => {
    library = new LibraryManagement();
    const novelCategory = {
      title: "Pinocchio",
      genre: "novel",
      publish_year: 1883,
      author: "Carlo Collodi",
      quantity: 10,
      price: 399,
    };
    library.addBook(novelCategory);
    library.addBorrowRecord(
      { user_id: 1, book_id: 1, borrow_date: "10-02-2026", status: 0 },
    );
  });

  it("=> should toggle status: 0 -> 1", () => {
    assertEquals(library.toggleStatus(1), { success: true });
  });

  it("=> should toggle status: 1 -> 0", () => {
    assertEquals(library.toggleStatus(1), { success: true });
  });

  it("=> shouldn't toggle status: borrowId is not present", () => {
    assertEquals(library.toggleStatus(2), { success: false, errorCode: 401 });
  });
});

describe("UPDATE LENT DATE: ", () => {
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
  });

  it("=> should update lent date: ", () => {
    const date = new Date();
    const borrowRecord = {
      borrow_id: 1,
      user_id: 1,
      book_id: 2,
      borrow_date: "10-02-2026",
    };
    library.updateLentDate(borrowRecord, date);
  });
});

describe("LIST BOOKS BY USER: ", () => {
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
  it("=> should list all records: ", () => {
    library.addBorrowRecord({
      user_id: 1,
      book_id: 1,
      borrow_date: "10-02-2026",
    });
    const borrowRecords = [{
      borrow_id: 1,
      user_id: 1,
      book_id: 1,
      borrow_date: "10-02-2026",
    }];
    assertEquals(library.listBooksByUser(1), {
      success: true,
      data: borrowRecords,
    });
  });

  it("should list empty: no records in borrowRecords", () => {
    assertEquals(library.listBooksByUser(2), { success: true, data: [] });
  });
});

describe.ignore("TESTING", () => {
  beforeEach(() => {
    console.log("inside beforeEach");
  });
  it("1st it", () => {});
  it("2nd it", () => {});
  it("3rd it", () => {});
  it("4th it", () => {});
});
