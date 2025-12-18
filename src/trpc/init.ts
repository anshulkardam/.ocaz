import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { initTRPC } from "@trpc/server";
import { cache } from "react";
import superjson from "superjson";

export const createTRPCContext = cache(async () => {
  const session = await auth();

  return {
    session,
    db: prisma,
  };
});

const t = initTRPC.context<typeof createTRPCContext>().create({ transformer: superjson });

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
