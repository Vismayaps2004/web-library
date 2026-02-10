import { handleListBooks } from "./handle_requests.js";
import { LibraryManagement } from "./memory_library.js";

const library = new LibraryManagement();

export const handleRequest = async (request) => {
  const method = request.method;
  const pathName = new URL(request.url).pathname;

  if (pathName === "/user/listBooks") {
    const response = handleListBooks(library);
    return await new Response(JSON.stringify(response));
  }

  // if (pathName === "user/listBookByCategory" && method === "POST") {
  //   const body = await request.json();
  //   handleListBooksByCategory(library, body.category);
  // }
};
