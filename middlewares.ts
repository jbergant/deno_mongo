import { Context } from "https://deno.land/x/oak/mod.ts";

export async function handleErrors(
  context: Context,
  next: () => Promise<void>,
) {
  try {
    await next();
  } catch (err) {
    context.response.status = err.status;
    const { message = "unkown error", status = 500, stack = null } = err;
    context.response.body = { message, status, stack };
    context.response.type = "json";
  }
}
