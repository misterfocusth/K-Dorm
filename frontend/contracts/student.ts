import {
	ErrorResponse,
	NOT_FOUND_ERROR,
	Response,
} from "@/interface/api-response";
import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const studentContract = c.router({
	get: {
		method: "GET",
		path: "/student/:id",
		pathParams: z.object({
			id: z.string(),
		}),
		responses: {
			200: c.type<Response<GetStudentInfoResponse>>(),
			404: c.type<ErrorResponse<NOT_FOUND_ERROR>>(),
		},
	},
	getAll: {
		method: "GET",
		path: "/student",
		responses: {
			200: c.type<Response<GetAllStudentsResponse>>(),
			404: c.type<ErrorResponse<NOT_FOUND_ERROR>>(),
		},
	},
	create: {
		method: "POST",
		path: "/student",
		body: z.object({
			students: z.array(
				z.object({
					email: z.string(),
					firstName: z.string(),
					lastName: z.string(),
					studentId: z.string(),
				})
			),
		}),
		responses: {
			201: c.type<Response<CreateResponse>>(),
			400: c.type<ErrorResponse>(),
		},
	},
	edit: {
		method: "PATCH",
		path: "/student/:id",
		pathParams: z.object({
			id: z.string(),
		}),
		body: z
			.object({
				email: z.string(),
				firstName: z.string(),
				lastName: z.string(),
				studentId: z.string(),
			})
			.partial(),
		responses: {
			200: c.type<Response<GetStudentInfoResponse>>(),
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

export interface GetStudentInfoResponse {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	uid?: string;
	isDisabled: boolean;
	student: {
		id: string;
		studentId: string;
		isOnBoarded: boolean;
	};
}

export interface GetAllStudentsResponse {
	students: GetStudentInfoResponse[];
}

interface CreateResponse {
	email: string;
	firstName: string;
	lastName: string;
	uid?: string;
	isDisabled: boolean;
	student: {
		studentId: string;
		isOnBoarded: boolean;
	};
}
