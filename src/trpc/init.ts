import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { initTRPC, TRPCError } from "@trpc/server";
import { headers } from "next/headers";
import { cache } from "react";
import superjson from "superjson";

export const createTRPCContext = cache(async () => {
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
});

const t = initTRPC.context<typeof createTRPCContext>().create({ transformer: superjson });

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(
  t.middleware(({ ctx, next }) => {
    if (!ctx.session?.userId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return next({
      ctx: {
        ...ctx,
        userId: ctx.session.userId,
      },
    });
  })
);
