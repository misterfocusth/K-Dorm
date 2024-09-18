import { initContract } from "@ts-rest/core";
import { taskContract } from "./task";

// Contracts

const c = initContract();

export const contract = c.router({
  task: taskContract,
});
