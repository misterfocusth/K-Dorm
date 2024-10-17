import { z } from "zod";

export const recruitmentWaveSchema = z.object({
	id: z.coerce.string(),
	name: z.string(),
	year: z.number().int(),
	announcementText: z.string().optional(),
});
