'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpCodes = void 0;
exports.HttpCodes = {
    // Informational
    CONTINUE: 100,
    SWITCHING_PROTOCOLS: 101,
    PROCESSING: 102,
    // Success
    OK: 200,
    CREATED: 201,
    CONTENT_NOT_FOUND: 204,
    ALREADY_EXIST: 0,
    // Redirection
    MOVED_PERMANENTLY: 301,
    NOT_MODIFIED: 304,
    TEMPORARY_REDIRECT: 307,
    // Client Errors
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    NOT_ALLOWED: 405,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    VERIFY: 2,
    TOKEN: 4,
    // Server Errors
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
    // Response Messages
    API_SUCCESS: 'true',
    API_FAILURE: 'false'
};
//# sourceMappingURL=responseCodes.js.map