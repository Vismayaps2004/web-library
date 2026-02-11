import { beforeEach, describe, it } from "@std/testing";
import { assertEquals } from "@std/assert/equals";
import { handleRequest } from "../src/server_library.js";
import { LibraryManagement } from "../src/memory_library.js";

describe("HANDLE LIST ALL RECORDS", () => {
  let library;
  beforeEach(() => {
    library = new LibraryManagement();
  });
  it("=> should show empty records: no books in bookCatalog", async () => {
    const request = new Request("http://localhost/user/listBooks");
    const response = await handleRequest(request, library);
    const data = await response.json();

    assertEquals(data.success, true);
    assertEquals(data.data, []);
  });

  it("=> should lists all records: ", async () => {
    const novelCategory = {
      title: "Pinocchio",
      genre_id: 1,
      publish_year: 1883,
      author: "Carlo Collodi",
      quantity: 10,
      price: 399,
    };
    library.addBook(novelCategory);
    const request = new Request("http://localhost/user/listBooks");
    const response = await handleRequest(request, library);
    const data = await response.json();
    const books = [{
      book_id: 1,
      title: "Pinocchio",
      genre_id: 1,
      publish_year: 1883,
      author: "Carlo Collodi",
      quantity: 10,
      price: 399,
    }];
    assertEquals(data.success, true);
    assertEquals(data.data, books);
  });
});

describe("HANDLE LIST ALL RECORDS BY CATEGORY", () => {
  let library;
  beforeEach(() => {
    library = new LibraryManagement();
  });
  it("=> should give empty array: no books", async () => {
    const request = new Request("http://localhost/user/listByCategory", {
      method: "POST",
      body: JSON.stringify({ category: "genre_id" }),
    });
    const response = await handleRequest(request, library);
    const data = await response.json();

    assertEquals(data.success, true);
    assertEquals(data.data, []);
  });

  it("=> should give all records: ", async () => {
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
    const bookDetails = [
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

    const request = new Request("http://localhost/user/listByCategory", {
      method: "POST",
      body: JSON.stringify({ category: "genre_id" }),
    });
    const response = await handleRequest(request, library);
    const data = await response.json();
    assertEquals(data.success, true);
    assertEquals(data.data, bookDetails);
  });
});

describe("HANDLE ADD BORROW RECORD: ", () => {
  let library;
  beforeEach(() => {
    library = new LibraryManagement();
  });
  it("should add a record: ", async () => {
    const novelCategory = {
      title: "Pinocchio",
      genre: "story",
      publish_year: 1883,
      author: "Carlo Collodi",
      quantity: 10,
      price: 399,
    };
    library.addBook(novelCategory);
    const borrowRecord = {
      user_id: 1,
      book_id: 1,
      borrow_date: "10-02-2026",
      status: 0,
    };

    const request = new Request("http://localhost/user/addBorrowRecord", {
      method: "POST",
      body: JSON.stringify(borrowRecord),
    });
    const response = await handleRequest(request, library);
    const data = await response.json();

    assertEquals(data.success, true);
  });
  it("shouldn't add a record: book doesn't exists", async () => {
    const borrowRecord = {
      user_id: 1,
      book_id: 1,
      borrow_date: "10-02-2026",
      status: 0,
    };

    const request = new Request("http://localhost/user/addBorrowRecord", {
      method: "POST",
      body: JSON.stringify(borrowRecord),
    });
    const response = await handleRequest(request, library);
    const data = await response.json();

    assertEquals(data.success, false);
    assertEquals(data.errorCode, 401);
  });
});

describe("TOGGLE STATUS: ", () => {
  let library;
  beforeEach(() => {
    library = new LibraryManagement();
  });

  it("=> should toggle status: 0 -> 1", async () => {
    const novelCategory = {
      title: "Pinocchio",
      genre: "story",
      publish_year: 1883,
      author: "Carlo Collodi",
      quantity: 10,
      price: 399,
    };
    library.addBook(novelCategory);
    const borrowRecord = {
      user_id: 1,
      book_id: 1,
      borrow_date: "10-02-2026",
      status: 0,
    };
    library.addBorrowRecord(borrowRecord);

    const request = new Request("http://localhost/user/toggleStatus", {
      method: "POST",
      body: 1,
    });
    const response = await handleRequest(request, library);
    const data = await response.json();
    assertEquals(data.success, true);
  });

  it("=> should toggle status: 1 -> 0", async () => {
    const novelCategory = {
      title: "Pinocchio",
      genre: "story",
      publish_year: 1883,
      author: "Carlo Collodi",
      quantity: 10,
      price: 399,
    };
    library.addBook(novelCategory);
    const borrowRecord = {
      user_id: 1,
      book_id: 1,
      borrow_date: "10-02-2026",
      status: 0,
    };
    library.addBorrowRecord(borrowRecord);

    const request = new Request("http://localhost/user/toggleStatus", {
      method: "POST",
      body: 1,
    });
    const response = await handleRequest(request, library);
    const data = await response.json();
    assertEquals(data.success, true);
  });

  it("=> shouldn't toggle : no book taken", async () => {
    const request = new Request("http://localhost/user/toggleStatus", {
      method: "POST",
      body: 1,
    });
    const response = await handleRequest(request, library);
    const data = await response.json();
    assertEquals(data.success, false);
  });
});
