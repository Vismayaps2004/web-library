import { assertEquals } from "@std/assert";
import { beforeEach, describe, it } from "@std/testing";
import { LibraryRegistry } from "../src/memory_library.js";

describe("ADDS BOOKS : ", () => {
  let libraryRegistry;
  beforeEach(() => {
    libraryRegistry = new LibraryRegistry();
  });
  it("=> should add a new book to bookCatalog: 'Pinocchio'", () => {
    const bookDetails = {
      id: 1,
      name: "Pinocchio",
      catrgory: "story",
      price: 399,
      quantity: 10,
    };
    assertEquals(libraryRegistry.addBook(bookDetails), { success: true });
  });
  it("=> shouldn't add a book to bookCatalog: book already exists", () => {
    const bookDetails = {
      id: 1,
      name: "Pinocchio",
      catrgory: "story",
      price: 399,
      quantity: 10,
    };
    libraryRegistry.addBook(bookDetails);
    assertEquals(libraryRegistry.addBook(bookDetails), {
      success: false,
      errorCode: 201,
    });
  });
});

describe("UPDATE QUANTITY", () => {
  let libraryRegistry;
  beforeEach(() => {
    libraryRegistry = new LibraryRegistry();
  });
  it("=> should update quantity: pinocchio", () => {
    const bookDetails = {
      id: 1,
      name: "Pinocchio",
      catrgory: "story",
      price: 399,
      quantity: 10,
    };

    libraryRegistry.addBook(bookDetails);
    assertEquals(libraryRegistry.updateQuantity(1, 1), { success: true });
  });
});
