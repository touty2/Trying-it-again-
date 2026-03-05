export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

/** In standalone mode, getLoginUrl() returns the in-app login page path. */
export const getLoginUrl = (_returnPath?: string): string => "/login";
