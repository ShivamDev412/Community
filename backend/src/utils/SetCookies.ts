import e, { Response } from "express";
const cookieOptions = {
  httpOnly: true,
  secure: true,
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10),
  sameSite: false,
};
const SetCookies = (response: Response, cookieName: string, cookie: string) => {
  response.cookie(cookieName, cookie, cookieOptions);
};
export const ClearCookie = (response: Response, cookieName: string) => {
  response.clearCookie(cookieName, cookieOptions);
};
export default SetCookies;
