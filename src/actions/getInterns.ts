import { db } from "@/lib/db";

export default async function getInterns() {
    try {
        const govJobListings = await db.joblisting.findMany({
          where: {
            jobType: 'Internship', 
          },
        });
        return govJobListings;
      } catch (error) {
        console.error("Error fetching government jobs:", error);
        throw new Error("Failed to fetch government job listings");
      }
}
