import { describe, it } from "@std/testing";
import { assertEquals } from "@std/assert/equals";
import { handleRequest } from "../src/server_library.js";
import { LibraryManagement } from "../src/memory_library.js";

describe("HANDLE LIST ALL RECORDS", () => {
  it("=> should give all records", async () => {
    const library = new LibraryManagement();
    const request = new Request("http://localhost/user/listBooks");
    const response = await handleRequest(request, library);
    const data = await response.json();

    assertEquals(data.success, true);
    assertEquals(data.data, []);
  });
});

describe("HANDLE LIST ALL RECORDS BY CATEGORY", () => {
  it("=> should give all records", async () => {
    const library = new LibraryManagement();
    const requestURL = new Request("http://localhost/user/listByCategory", {
      method: "POST",
      body: JSON.stringify({ category: "novel" }),
    });
    const response = await handleRequest(requestURL, library);
    const data = await response.json();

    assertEquals(data.success, true);
    assertEquals(data.data, []);
  });
});

describe("HANDLE ADD BORROW RECORD: ", () => {
  it("should add a record: ", async () => {
    const library = new LibraryManagement();
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

    const requestURL = new Request("http://localhost/user/addBorrowRecord", {
      method: "POST",
      body: JSON.stringify(borrowRecord),
    });
    const response = await handleRequest(requestURL, library);
    const data = await response.json();

    assertEquals(data.success, true);
  });
});
