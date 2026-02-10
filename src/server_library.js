import {
  handleAddBorrowRecord,
  handleListBooks,
  handleListByCategory,
} from "./handle_requests.js";
import { LibraryManagement } from "./memory_library.js";

export const handleRequest = async (request, library) => {
  const method = request.method;
  const pathName = new URL(request.url).pathname;

  if (pathName === "/user/listBooks") {
    const response = handleListBooks(library);
    return await new Response(JSON.stringify(response));
  }

  if (pathName === "/user/listByCategory" && method === "POST") {
    const body = await request.json();
    const response = handleListByCategory(library, body);

    return await new Response(JSON.stringify(response));
  }

  if (pathName === "/user/addBorrowRecord" && method === "POST") {
    const body = await request.json();
    const response = handleAddBorrowRecord(library, body);

    return await new Response(JSON.stringify(response));
  }
};

export const createRequestHandler = (request) => {
  const library = new LibraryManagement();
  return (request) => handleRequest(request, library);
};
