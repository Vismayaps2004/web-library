import { assertEquals } from "@std/assert";
import { beforeEach, describe, it } from "@std/testing";
import { addBook, createBookCatalog } from "../src/memory_library.js";

describe("CREATES BOOK CATALOG : ", () => {
  it("=> should creates a table bookCatalog", () => {
    assertEquals(createBookCatalog(), []);
  });
});

describe("ADDS BOOKS : ", () => {
  let bookCatalog;
  beforeEach(() => {
    bookCatalog = createBookCatalog();
  });
  it("=> should add a book to bookCatalog: 'Diary Of Wimpy Kid'", () => {
    const bookDetails = {
      name: "Diary Of Wimpy Kid",
      price: 299,
      quantity: 10,
    };
    assertEquals(addBook(bookCatalog, bookDetails), { success: true });
  });
});
