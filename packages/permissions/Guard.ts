import { Context } from "../core/Context";

export function Guard(required: string | string[]) {
  return (ctx: Context) => {
    const perms = Array.isArray(required) ? required : [required];
    for (const perm of perms) {
      if (!ctx.user?.permissions?.has?.(perm))
        throw new Error("Missing required permission: " + perm);
    }
  }
}