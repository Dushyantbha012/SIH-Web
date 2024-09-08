import { db } from "@/lib/db";
async function getJob(jobId:string) {
  try {
    const job = await db.joblisting.findUnique({
      where: {
        id: jobId, 
      },
    });
    if (!job) {
        return ("Job not found");
    }
    console.log(job);
    return job;
  } catch (error) {
    console.error("Error fetching job:", error);
    throw new Error("Failed to fetch job listing");
  }
}

export default getJob;
