import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  resume: f({
    pdf: { maxFileSize: "4MB", maxFileCount: 1, minFileCount: 1 },
  })
    .middleware(async ({ req, res }) => {
      const user = await currentUser();

      // Throw if user isn't signed in
      if (!user)
        throw new UploadThingError(
          "You must be logged in to upload a profile picture"
        );

      // Return userId to be used in onUploadComplete
      return { userId: user.id };
    })
    .onUploadComplete((data) => console.log("file", data)),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
