import { createRequestHandler } from "./src/server_library.js";

const main = () => {
  Deno.serve(createRequestHandler);
};

main();
