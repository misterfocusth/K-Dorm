import { z } from "zod";
import { baseSchema } from "./base-schema";

export const roomSchema = baseSchema.extend({
	id: z.string(),
	name: z.string(),
	floor: z.string(),
	building: z.string(),
});
