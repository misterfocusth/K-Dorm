import {
	ErrorResponse,
	NOT_FOUND_ERROR,
	Response,
} from "@/interface/api-response";
import { buildingSchema } from "@/schemas/building";
import { roomSchema } from "@/schemas/room";
import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const roomContract = c.router({
	get: {
		method: "GET",
		path: "/room/:id",
		pathParams: z.object({
			id: z.string(),
		}),
		responses: {
			200: c.type<Response<GetRoomResponse>>(),
			404: c.type<ErrorResponse<NOT_FOUND_ERROR>>(),
		},
	},
	create: {
		method: "POST",
		path: "/staff/room",
		body: z.object({
			rooms: roomSchema
				.pick({ name: true, floor: true })
				.extend({
					building_id: z.string(),
				})
				.array(),
		}),
		responses: {
			201: c.type<Response<CreateRoomResponse>>(),
			400: c.type<ErrorResponse>(),
		},
	},
	edit: {
		method: "PATCH",
		path: "/room/:id",
		pathParams: z.object({
			id: z.string(),
		}),
		body: roomSchema.omit({ id: true }).partial(),
		responses: {
			200: c.type<Response<GetRoomResponse>>(),
			400: c.type<ErrorResponse>(),
		},
	},
	delete: {
		method: "DELETE",
		path: "/room/:id",
		pathParams: z.object({
			id: z.string(),
		}),
		responses: {
			200: c.type<Response<null>>(),
			400: c.type<ErrorResponse>(),
		},
	},
});

const getRoomResponse = roomSchema.extend({
	building: buildingSchema,
});
type GetRoomResponse = z.infer<typeof getRoomResponse>;

const createRoomsResponse = z.object({ rooms: roomSchema.array() });
type CreateRoomResponse = z.infer<typeof createRoomsResponse>;
