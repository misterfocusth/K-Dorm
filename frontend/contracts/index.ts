import { initContract } from "@ts-rest/core";

// Contracts
import { taskContract } from "./task";
import { identificationKeyContract } from "./identification";
import { authenticationContract } from "./authentication";
import { maintenanceTicketContract } from "./maintenance";
import { staffAccountContract } from "./account";
import { buildingContract } from "./building";
import { roomContract } from "./room";
import { activityCategoryContract } from "./activity_category";
import { activityContract } from "./activity";

const c = initContract();

export const contract = c.router({
  task: taskContract,
  identificationKey: identificationKeyContract,
  authentication: authenticationContract,
  maintenance: maintenanceTicketContract,
  account: staffAccountContract,
  building: buildingContract,
  room: roomContract,
  activityCategory: activityCategoryContract,
  activity: activityContract,
});
