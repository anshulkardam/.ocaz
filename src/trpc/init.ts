import prisma from "@/lib/prisma";
import { Role } from "@/utils/types";
import { auth } from "@clerk/nextjs/server";
import { initTRPC, TRPCError } from "@trpc/server";
import { headers } from "next/headers";
import superjson from "superjson";
import { authorizeUser } from "./utils";

export const createTRPCContext = async () => {
  let session = null;

  try {
    // This will throw during build / static prerender
    headers();
    session = await auth();
  } catch {
    // build-time or non-request environment
    session = null;
  }
  return {
    session,
    db: prisma,
  };
};

type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const publicProcedure = t.procedure;

export const protectedProcedure = (...roles: Role[]) =>
  t.procedure.use(
    t.middleware(async ({ ctx, next }) => {
      if (!ctx.session?.userId) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "You are not authorized" });
      }

      // Only enforce role check if roles were passed
      if (roles.length > 0) {
        await authorizeUser(ctx.session.userId, roles);
      }

      return next({
        ctx: {
          ...ctx,
          userId: ctx.session.userId,
        },
      });
    })
  );
