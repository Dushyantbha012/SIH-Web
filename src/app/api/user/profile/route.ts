import { currentProfile } from "@/lib/profile/currentProfile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface CreateUserRequest {
  name: string;
  birthdate: string;
  education: string;
  path: string[];
}

export async function POST(req: Request, res: NextResponse) {
  try {
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorised", { status: 401 });

    const { name, birthdate, education, path }: CreateUserRequest =
      await req.json();

    if (!name || !birthdate || !education || !path) {
      return new NextResponse("missing fields", { status: 400 });
    }

    // Convert birthdate to Date object
    const birthdateDate = new Date(birthdate);

    const user = await db.user.update({
      where: {
        id: profile.userId,
      },
      data: {
        name,
        birthdate: birthdateDate,
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

    return NextResponse.json(user);
  } catch (error) {
    console.log("USER_PROFILE \n", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
