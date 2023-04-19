import { createSchema } from "./client";
import seedDB from "./seed";

const main = async () => {
  console.log(await createSchema());
  seedDB();
};
main();
