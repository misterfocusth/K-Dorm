import { ErrorResponse, Response } from "@/interface/api-response";
import { recruitmentWaveSchema } from "@/schemas/recruitmentWave";
import { initContract, isErrorResponse } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const recruitmentWaveContract = c.router({
	getById: {
		method: "GET",
		path: "/recruitment_wave/<str:id>",
		pathParams: z.object({
			id: z.string(),
		}),
		responses: {
			200: c.type<Response<z.infer<typeof recruitmentWaveSchema>>>(),
			400: c.type<ErrorResponse>(),
		},
	},
	getAll: {
		method: "GET",
		path: "/recruitment_wave",
		responses: {
			200: c.type<Response<GetAllResponse>>(),
			400: c.type<ErrorResponse>(),
		},
	},
	create: {
		method: "POST",
		path: "/recruitment_wave",
		responses: {
			201: c.type<Response<z.infer<typeof recruitmentWaveSchema>>>(),
			400: c.type<ErrorResponse>(),
		},
		body: z.object({
			name: z.string(),
			year: z.number().int(),
			announcementText: z.string().nullish(),
		}),
	},
	edit: {
		method: "PATCH",
		path: "/recruitment_wave/:id",
		pathParams: z.object({
			id: z.string(),
		}),
		responses: {
			200: c.type<Response<EditRecruitmentWaveResponse>>(),
			400: c.type<ErrorResponse>(),
		},
		body: z.object({
			name: z.string().optional(),
			year: z.coerce.number().int().optional(),
			announcementText: z.string().nullish(),
		}),
	},
});

const getAllResponseSchema = z.object({
	waves: z.array(recruitmentWaveSchema),
});

type GetAllResponse = z.infer<typeof getAllResponseSchema>;

const editRecruitmentWaveSchema = recruitmentWaveSchema
	.omit({
		id: true,
	})
	.partial();

type EditRecruitmentWaveResponse = z.infer<typeof editRecruitmentWaveSchema>;
