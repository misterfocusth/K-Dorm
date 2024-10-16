export interface Response<T> {
	result: T;
}

export interface ErrorResponse<T = string> {
	error:
		| T
		| "UNAUTHENTICATED"
		| "UNKNOWN_EXCEPTION"
		| "UNCAUGHT_EXCEPTION"
		| "PAYLOAD_VALIDATION_FAILED"
		| "PERMISSION_DENIED";
	message: string;
}

export type NOT_FOUND_ERROR = "NOT_FOUND";
