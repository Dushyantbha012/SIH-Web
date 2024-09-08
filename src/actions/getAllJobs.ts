import { db } from "@/lib/db";
export default async function getAllJobs() {
  try {
    const jobListings = await db.joblisting.findMany();
    console.log(jobListings);
    return jobListings;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw new Error("Failed to fetch job listings");
  }
}
