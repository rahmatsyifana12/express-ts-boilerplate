import type { UserPayload } from './auth';

declare module 'express' {

    // extends the `Request` interface from express to have custom properties.
    export interface Request {

        /**
         * User's authentication payload
         *
         * The value will remain `undefined` if the controller
         * doesn't use the authenticate middleware.
         *
         * With this we can easily grab the user's payload without
         * extra functions such as `getPayloadFromHeader`.
         */
        userPayload?: UserPayload;

    }

}