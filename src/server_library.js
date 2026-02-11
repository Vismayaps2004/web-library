import {
  handleAddBorrowRecord,
  handleListBooks,
  handleListByCategory,
  handleToggleStatus,
} from "./handle_requests.js";

const PATHS = {
  "/user/listBooks": handleListBooks,
  "/user/listByCategory": handleListByCategory,
  "/user/addBorrowRecord": handleAddBorrowRecord,
  "/user/toggleStatus": handleToggleStatus,
};

export const handleRequest = async (request, library) => {
  const method = request.method;
  const pathName = new URL(request.url).pathname;

  if (method === "GET") {
    const { response, status } = PATHS[pathName](library);
    return await new Response(JSON.stringify(response), { status });
  }

  const body = await request.json();
  const { response, status } = PATHS[pathName](library, body);

  return await new Response(JSON.stringify(response), { status });
};

export const createRequestHandler = (library) => {
  return (request) => handleRequest(request, library);
};
