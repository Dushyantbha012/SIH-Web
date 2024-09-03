import { currentProfile } from "@/lib/profile/currentProfile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { initialProfile } from "@/lib/profile/initialProfile";

interface CreateUserRequest {
  name: string;
  birthdate: Date;
  education: string;
  path: string[];
}

export async function POST(req: Request, res: NextResponse) {
  try {
    //@ts-ignore
    const profile = await initialProfile();
    console.log("first");
    if (!profile) return new NextResponse("Unauthorised", { status: 401 });
    console.log("second");
    const reqData = await req.json();

    const { name, birthdate, education, path }: CreateUserRequest =
      await reqData.data;
    console.log("name: ", name);
    if (!name || !birthdate || !education || !path) {
      return new NextResponse("missing fields", { status: 404 });
    }
    console.log("third");
    let user = await db.user.update({
      where: {
        id: profile.id,
      },
      data: {
        name,
        birthdate,
        education,
        path,
      },
    });

    path.forEach(async (p) => {
      const tempProfile = await db.profile.create({
        data: {
          profileName: p,
          userId: user.id,
        },
      });
    });

    const defaultDate = new Date("1900-01-01T00:00:00.000Z");
    if (
      user.name === "Anonymous" ||
      user.birthdate === defaultDate ||
      user.education === "Not specified" ||
      user.path.length == 0
    ) {
      user = await db.user.update({
        where: {
          id: profile.id,
        },
        data: { complete: false },
      });
    } else {
      const dbProfiles = await db.profile.findMany({
        where: {
          userId: user.id,
        },
      });
      const len = dbProfiles.length;
      for (let i = 0; i < len; i++) {
        if (!path.includes(dbProfiles[i].profileName)) {
          await db.profile.delete({
            where: {
              id: dbProfiles[i].id,
            },
          });
        }
      }
      user = await db.user.update({
        where: {
          id: profile.id,
        },
        data: { complete: true },
      });
    }
    console.log("updated");

    return NextResponse.json(user);
  } catch (error) {
    console.log("USER_PROFILE \n", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
