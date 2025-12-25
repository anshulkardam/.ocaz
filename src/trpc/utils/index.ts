import prisma from "@/lib/prisma";
import { Role } from "@/utils/types";
import { TRPCError } from "@trpc/server";

export const getUserRoles = async (id: string): Promise<Role[]> => {
  const [admin, manager] = await Promise.all([
    prisma.admin.findUnique({ where: { id } }),
    prisma.manager.findUnique({ where: { id } }),
  ]);
  const roles: Role[] = [];

  if (admin) roles.push("admin");
  if (manager) roles.push("manager");

  return roles;
};

export const authorizeUser = async (uid: string, roles: Role[]): Promise<void> => {
  
  if (!roles || roles.length < 0) {
    return; // No specific roles required, access is granted
  }

  const userRoles = await getUserRoles(uid);

  if (!userRoles.some((role) => roles.includes(role))) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "User does not have the required role(s).",
    });
  }
};
