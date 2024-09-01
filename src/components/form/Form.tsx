"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm, FormProvider } from "react-hook-form"; // Import FormProvider
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { UploadButton } from "@/lib/uploadThing/uploadThing";
interface FormData {
  fullName: string;
  birthdate: Date;
  path: "Software" | "Marketing" | "Bussiness";
  education: "" | undefined;
  linkedin: "";
  github: "";
  codeforces: "";
  resume: String | null;
}

export default function Form() {
  const formMethods = useForm<FormData>({
    defaultValues: {
      fullName: "",
      birthdate: new Date(),
      path: "Software",
      education: undefined,
      linkedin: "",
      github: "",
      codeforces: "",
      resume: null,
    },
  });
  const [username, setUsername] = useState("");
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full border border-black">
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <FormField
            control={formMethods.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="flex flex-nowrap items-center justify-left align-middle gap-3">
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input className="w-fit" placeholder="Full Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formMethods.control}
            name="birthdate"
            render={() => (
              <FormItem>
                <FormLabel>{`Date of Birth : `}</FormLabel>
                <FormControl>
                  <Dialog open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        {date?.toLocaleDateString() ?? "Pick a date"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Select a Date</DialogTitle>
                        <DialogDescription>
                          Pick a date from the calendar.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex items-center justify-center align-middle w-full">
                        {" "}
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formMethods.control}
            name="path"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Path : </FormLabel>
                <FormControl>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">{`${formMethods.getValues().path
                        }`}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <DropdownMenuRadioItem value="Software">
                          Software
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Marketing">
                          Marketing
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Business">
                          Business
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <hr className="pb-2 mt-2" />
          <FormField
            control={formMethods.control}
            name="education"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-nowrap items-center justify-left align-middle gap-3">
                  <FormLabel>Education</FormLabel>

                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          {formMethods.getValues().education === undefined
                            ? "Select"
                            : formMethods.getValues().education}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Education</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <DropdownMenuRadioItem value="Secondary">
                            Secondary
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="Senior Secondary">
                            Senior Secondary
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="Bachelor's">
                            Bachelor's
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="Master's">
                            Master's
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="PHD">
                            PhD
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                </div>
                <FormDescription>
                  Please enter your highest level of education
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <hr className="pb-2 mt-2" />
          {formMethods.getValues().path === "Software" ? (
            <>
              <FormField
                control={formMethods.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn</FormLabel>
                    <FormControl>
                      <Input placeholder="LinkedIn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formMethods.control}
                name="github"
                render={({ field }) => (
                  <FormItem className="pt-4">
                    <FormLabel>GitHub</FormLabel>
                    <FormControl>
                      <Input placeholder="GitHub" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formMethods.control}
                name="codeforces"
                render={({ field }) => (
                  <FormItem className="pt-4">
                    <FormLabel>Codeforces</FormLabel>
                    <FormControl>
                      <Input placeholder="Codeforces" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ) : (
            <div></div>
          )}
          <FormField
            control={formMethods.control}
            name="resume"
            render={({ field }) => (
              <FormItem className="flex flex-nowrap items-center justify-left align-middle gap-3">
                <FormLabel>Resume</FormLabel>
                {field.value === null ? (
                  <UploadButton
                    endpoint="resume"
                    onClientUploadComplete={(res) => {
                      formMethods.setValue("resume", res[0].url);
                      console.log(
                        "value is : ",
                        formMethods.getValues().resume
                      );
                      console.log("Files: ", res);
                    }}
                    onUploadError={(error: Error) => {
                      alert(`ERROR! ${error.message}`);
                    }}
                  />
                ) : (
                  <div>
                    <div className="flex flex-nowrap gap-3 items-center justify-center align-middle w-full">
                      <div>Uploaded</div>
                      <Button
                        className="bg-red-500 p-3 hover:bg-white hover:text-red-500"
                        onClick={() => {
                          formMethods.setValue("resume", null);
                        }}
                      >
                        X
                      </Button>{" "}
                    </div>
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-4 w-full">
            Submit
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
