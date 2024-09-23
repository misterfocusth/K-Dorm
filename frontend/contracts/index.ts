import { initContract } from "@ts-rest/core";

// Contracts
import { taskContract } from "./task";
import { identificationKeyContract } from "./identification";

const c = initContract();

export const contract = c.router({
  task: taskContract,
  identificationKey: identificationKeyContract,
});
