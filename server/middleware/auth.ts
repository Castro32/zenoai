import { runAuthGuard, getSession } from "@agent-native/core/server";
import { defineEventHandler, getRequestURL, sendRedirect } from "h3";
import { SIGN_IN_ENTRY_PATH } from "@agent-native/core/shared";

export default defineEventHandler(async (event) => {
  const path = getRequestURL(event).pathname;

  if (path === SIGN_IN_ENTRY_PATH || path === "/login" || path === "/signup") {
    const session = await getSession(event);
    if (session) {
      return sendRedirect(event, "/dashboard", 302);
    }
  }

  return runAuthGuard(event);
});
