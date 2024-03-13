"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserSessionIdFromCookie = exports.clearUserSessionIdInCookie = exports.setUserSessionIdInCookie = void 0;
const cookie_1 = require("cookie");
function setUserSessionIdInCookie(expressResponse, session) {
    expressResponse.cookie("userSessionId", session.id, {
        secure: true,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
    });
}
exports.setUserSessionIdInCookie = setUserSessionIdInCookie;
function clearUserSessionIdInCookie(expressResponse) {
    expressResponse.clearCookie("userSessionId");
}
exports.clearUserSessionIdInCookie = clearUserSessionIdInCookie;
function getUserSessionIdFromCookie(req) {
    const userSessionId = (0, cookie_1.parse)(req.headers.cookie || "").userSessionId;
    return userSessionId || undefined;
}
exports.getUserSessionIdFromCookie = getUserSessionIdFromCookie;
