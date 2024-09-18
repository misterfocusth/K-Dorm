import { initContract } from "@ts-rest/core";

// Contracts
import { taskContract } from "./task";

const c = initContract();

export const contract = c.router({
  task: taskContract,
});
