import { currentUser, auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
export const initialProfile = async () => {
  const user = await currentUser();
  if (!user) {
    return auth().redirectToSignIn();
  } else {
    const dbUser = await db.user.findUnique({
      where: {
        userId: user.id,
      },
    });
    if (dbUser) {
      return dbUser;
    }

    const newUser = await db.user.create({
      data: {
        userId: user.id,
        name: `${user.firstName} ${user.lastName}`,
      },
    });
    return newUser;
  }
};
