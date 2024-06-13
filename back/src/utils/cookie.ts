import { Response } from "express";
import { parse } from "cookie";
import { IncomingMessage } from "node:http";
import UserSession from "../entities/user/userSession";
import UserResetSession from "../entities/user/userResetSession";

export function setUserSessionIdInCookie(
  expressResponse: Response,
  session: UserSession,
) {
  expressResponse.cookie("userSessionId", session.id, {
    secure: true,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });
}

export function clearUserSessionIdInCookie(expressResponse: Response) {
  expressResponse.clearCookie("userSessionId");
}

export function getUserSessionIdFromCookie(req: IncomingMessage) {
  const userSessionId = parse(req.headers.cookie || "").userSessionId;
  return userSessionId || undefined;
}

export function setUserResetSessionIdInCookie(
  expressResponse: Response,
  session: UserResetSession,
) {
  expressResponse.cookie("userResetSessionId", session.id, {
    secure: true,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });
}

export function clearUserResetSessionIdInCookie(expressResponse: Response) {
  expressResponse.clearCookie("userResetSessionId");
}

export function getUserResetSessionIdFromCookie(req: IncomingMessage) {
  const userResetSessionId = parse(req.headers.cookie || "").userResetSessionId;
  return userResetSessionId || undefined;
}
