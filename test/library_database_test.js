import { beforeEach, describe, it } from "@std/testing";
import { DatabaseSync } from "node:sqlite";
import { assertEquals } from "@std/assert";
import { LibraryManagement } from "../src/library_database.js";

const isTableExists = (db, tbName) => {
  const tableQuery = db.prepare(
    `SELECT name FROM sqlite_master
      WHERE type = 'table' AND name = ?;`,
  );
  return tableQuery.all(`${tbName}`).length === 1;
};

describe("INITIALISE LIBRARY DB ", () => {
  let library;
  let db;
  beforeEach(() => {
    db = new DatabaseSync(":memory:");
    library = new LibraryManagement(db);
  });

  it("=> should create tables: bookCatalog, genreRecord", () => {
    assertEquals(isTableExists(db, "bookCatalog"), false);
    assertEquals(isTableExists(db, "genreRecord"), false);
    assertEquals(isTableExists(db, "customers"), false);
    assertEquals(isTableExists(db, "borrowRecord"), false);
    library.initialiseDb(db);
    assertEquals(isTableExists(db, "bookCatalog"), true);
    assertEquals(isTableExists(db, "genreRecord"), true);
    assertEquals(isTableExists(db, "customers"), true);
    assertEquals(isTableExists(db, "borrowRecord"), true);
  });
});
