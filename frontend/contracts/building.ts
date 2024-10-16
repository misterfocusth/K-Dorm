import { ErrorResponse, Response } from "@/interface/api-response";
import { buildingSchema } from "@/schemas/building";
import { roomSchema } from "@/schemas/room";
import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const buildingContract = c.router({
	getAll: {
		method: "GET",
		path: "/staff/buildings",
		responses: {
			200: c.type<Response<GetAllBuildingsSchema>>(),
			400: c.type<ErrorResponse<GetAllBuildingsErrorCode>>(),
		},
	},
	get: {
		method: "GET",
		path: "/staff/buildings/:id",
		pathParams: z.object({
			id: z.string(),
		}),
		responses: {
			200: c.type<Response<GetBuildingSchema>>(),
			400: c.type<ErrorResponse<GetBuildingErrorCode>>(),
		},
	},
	create: {
		method: "POST",
		path: "/staff/buildings",
		body: z.object({
			name: z.string(),
		}),
		responses: {
			201: c.type<Response<GetBuildingSchema>>(),
			400: c.type<ErrorResponse>(),
		},
	},
	edit: {
		method: "PATCH",
		path: "/staff/buildings/:id",
		body: z.object({
			name: z.string(),
		}),
		responses: {
			200: c.type<Response<GetBuildingSchema>>(),
			400: c.type<ErrorResponse>(),
		},
	},
	delete: {
		method: "DELETE",
		path: "/staff/buildings/:id",
		pathParams: z.object({
			id: z.string(),
		}),
		responses: {
			200: c.type<Response<GetBuildingSchema>>(),
			400: c.type<ErrorResponse>(),
		},
	},
});

const getAllBuildingsSchema = buildingSchema.array();
type GetAllBuildingsSchema = z.infer<typeof getAllBuildingsSchema>;

type GetAllBuildingsErrorCode = "";

const getBuildingSchema = buildingSchema.extend({
	rooms: roomSchema.array(),
});
type GetBuildingSchema = z.infer<typeof getBuildingSchema>;

type GetBuildingErrorCode = "NOT_FOUND";
