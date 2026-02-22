import { LibraryManagement } from "./src/memory_library.js";
import { createRequestHandler } from "./src/server_library.js";


const main = () => {
  const library = new LibraryManagement();
  Deno.serve(createRequestHandler(library));
};

main();
