import { Response } from "express";
import { parse } from "cookie";
import { IncomingMessage } from "node:http";
import UserSession from "../entities/user/userSession";

export function setUserSessionIdInCookie(
  expressResponse: Response,
  session: UserSession
) {
  expressResponse.cookie("userSessionId", session.id, {
    secure: true,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });
}

export function clearUserSessionIdInCookie(
  expressResponse: Response
) {
  expressResponse.clearCookie("userSessionId");
}

export function getUserSessionIdFromCookie(req: IncomingMessage) {
  const userSessionId = parse(req.headers.cookie || "").userSessionId;
  return userSessionId || undefined;
}
