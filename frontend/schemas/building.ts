import { z } from "zod";
import { baseSchema } from "./base-schema";

export const buildingSchema = baseSchema.extend({
	name: z.string(),
});
