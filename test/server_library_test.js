import { describe, it } from "@std/testing";
import { assertEquals } from "@std/assert/equals";
import { handleRequest } from "../src/server_library.js";

describe("HANDLE LIST ALL RECORDS", () => {
  it("=> should give all records", async () => {
    const request = new Request("http://localhost/user/listBooks");
    const response = await handleRequest(request);
    const data = await response.json();

    assertEquals(data.success, true);
    assertEquals(data.data, []);
  });
});

describe("HANDLE LIST ALL RECORDS BY CATEGORY", () => {
  it("=> should give all records", async () => {
    const requestURL = new Request("http://localhost/user/listByCategory", {
      method: "POST",
      body: "novel",
    });
    const response = await handleRequest(requestURL);
    const data = await response.json();

    assertEquals(data.success, true);
    assertEquals(data.data, []);
  });
});
