import { StatusCodes } from 'http-status-codes';
import { type APIResponse } from './api.util';

export class ResponseError extends Error {

    statusCode: StatusCodes;

    constructor(message: string, statusCode: StatusCodes) {
        super(message);
        this.statusCode = statusCode;
    }

    static toResponseBody(error: ResponseError): APIResponse {
        return {
            statusCode: error.statusCode,
            success: false,
            message: error.message
        };
    }

}

/**
 * Common API errors
 */
export const Errors = {
    /**
     * Internal server error / Unexpected error
     */
    SERVER: new ResponseError(
        'Unexpected server error',
        StatusCodes.INTERNAL_SERVER_ERROR),

    /**
     * User doesn't have JWT or authentication token
     */
    NO_SESSION: new ResponseError(
        "You don't have an account session",
        StatusCodes.UNAUTHORIZED),

    /**
     * User doesn't have the permission
     */
    NO_PERMISSION: new ResponseError(
        "You don't have the permission to access this content",
        StatusCodes.FORBIDDEN),

    /**
     * Cannot find the user it's trying to find
     */
    USER_NOT_FOUND: new ResponseError(
        'Cannot find user',
        StatusCodes.NOT_FOUND),
};