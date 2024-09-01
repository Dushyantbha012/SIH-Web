// checks whether the user's profile is completed or not

import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db";

export const isProfileComplete = async () => {
    const {userId}= auth();
    if(!userId){
        return false;
    }
    const profile = await db.profile.findUnique({ where: { id: userId } });

}