import { handleRequest } from "./src/server_library.js";

const main = () => {
  Deno.serve(handleRequest);
};

main();
