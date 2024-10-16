import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";

export const currentUserData = async () => {
  const { userId } = auth();
  if (!userId) {
    return null;
  }

  const userData = await db.userData.findMany({ where: { userId } });

  return userData;
};