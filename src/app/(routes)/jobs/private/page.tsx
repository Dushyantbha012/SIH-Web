// // 'use client';
// // import { useEffect, useState } from 'react';
// // import axios from 'axios';

// // interface JobItem {
// //   id: string;
// //   recruiterId: string;
// //   description: string;
// //   responsibilities: string;
// //   requirements: string;
// //   experience: string;
// //   location: string;
// //   jobType: string;
// //   mode: string;
// //   organization: string;
// // }

// // export default function priv() {
// //   const [jobData, setJobData] = useState<JobItem[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     async function fetchJobs() {
// //       try {
// //         const response = await axios.get('/api/jobs/private');
// //         setJobData(response.data);
// //       } catch (error) {
// //         console.error('Error fetching jobs:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     }

// //     fetchJobs();
// //   }, []);

// //   if (loading) {
// //     return <div>Loading...</div>;
// //   }

// //   return (
// //     <div>
// //       {jobData.map((job) => (
// //         <div key={job.id}>
// //           <h3>{job.description}</h3>
// //           <p>{job.location}</p>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }
// "use client";

// import { useState, useMemo, JSX, SVGProps, SetStateAction } from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import {
//   Accordion,
//   AccordionItem,
//   AccordionTrigger,
//   AccordionContent,
// } from "@/components/ui/accordion";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Badge } from "@/components/ui/badge";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuCheckboxItem,
//   DropdownMenuRadioGroup,
//   DropdownMenuRadioItem,
// } from "@/components/ui/dropdown-menu";
// import {
//   Card,
//   CardHeader,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";

// type Job = {
//   id: number;
//   company: string;
//   title: string;
//   type: string;
//   location: string;
//   salary: string;
//   createdAt?: string; // Optional in case a job doesn't have a createdAt property
// };

// type Filters = {
//   location: string[];
//   jobType: string[];
//   salary: string[];
// };

// export default function Component() {
//   const [selectedFilters, setSelectedFilters] = useState<Filters>({
//     location: [],
//     jobType: [],
//     salary: [],
//   });

//   const [sortBy, setSortBy] = useState<string>("relevance");

//   const handleFilterChange = (type: keyof Filters, value: string) => {
//     setSelectedFilters((prevFilters) => ({
//       ...prevFilters,
//       [type]: prevFilters[type].includes(value)
//         ? prevFilters[type].filter((item: string) => item !== value)
//         : [...prevFilters[type], value],
//     }));
//   };

//   const handleSortChange = (value: SetStateAction<string>) => {
//     setSortBy(value);
//   };

//   const jobs: Job[] = [
//     {
//       id: 1,
//       company: "Acme Inc.",
//       title: "Senior Software Engineer - Remote",
//       type: "Full-time",
//       location: "Remote",
//       salary: "100k - 150k",
//     },
//     {
//       id: 2,
//       company: "Globex Corporation",
//       title: "Product Manager - Enterprise Solutions",
//       type: "Full-time",
//       location: "San Francisco, CA",
//       salary: "120k - 160k",
//     },
//     {
//       id: 3,
//       company: "Stark Industries",
//       title: "UX Designer - Augmented Reality",
//       type: "Contract",
//       location: "New York, NY",
//       salary: "80k - 120k",
//     },
//     {
//       id: 4,
//       company: "Umbrella Corporation",
//       title: "Data Science Intern - Bioinformatics",
//       type: "Internship",
//       location: "Remote",
//       salary: "Unpaid",
//     },
//   ];

//   const filteredJobs = useMemo(() => {
//     return jobs
//       .filter((job) => {
//         if (
//           selectedFilters.location.length > 0 &&
//           !selectedFilters.location.includes(job.location)
//         ) {
//           return false;
//         }
//         if (
//           selectedFilters.jobType.length > 0 &&
//           !selectedFilters.jobType.includes(job.type)
//         ) {
//           return false;
//         }
//         if (
//           selectedFilters.salary.length > 0 &&
//           !selectedFilters.salary.includes(job.salary)
//         ) {
//           return false;
//         }
//         return true;
//       })
//       .sort((a, b) => {
//         switch (sortBy) {
//           case "newest":
//             return (
//               new Date(b.createdAt || "").getTime() -
//               new Date(a.createdAt || "").getTime()
//             );
//           case "salary":
//             return (
//               parseFloat(b.salary.split("-")[0]) -
//               parseFloat(a.salary.split("-")[0])
//             );
//           default:
//             return 0;
//         }
//       });
//   }, [selectedFilters, sortBy, jobs]);

//   return (
//     <div className="flex flex-col min-h-screen bg-muted">
//       <main className="flex-1 grid grid-cols-[240px_1fr] gap-8 p-6 md:p-10">
//         <div className="space-y-6">
//           <div className="grid gap-2">
//             <h2 className="text-lg font-semibold">Filters</h2>
//             <Accordion type="single" collapsible>
//               <AccordionItem value="location">
//                 <AccordionTrigger className="text-base">
//                   Location
//                 </AccordionTrigger>
//                 <AccordionContent>
//                   <div className="grid gap-2">
//                     {["Remote", "San Francisco", "New York", "London"].map(
//                       (location) => (
//                         <Label
//                           key={location}
//                           className="flex items-center gap-2 font-normal"
//                         >
//                           <Checkbox
//                             checked={selectedFilters.location.includes(
//                               location
//                             )}
//                             onCheckedChange={() =>
//                               handleFilterChange("location", location)
//                             }
//                           />
//                           {location}
//                         </Label>
//                       )
//                     )}
//                   </div>
//                 </AccordionContent>
//               </AccordionItem>
//               <AccordionItem value="job-type">
//                 <AccordionTrigger className="text-base">
//                   Job Type
//                 </AccordionTrigger>
//                 <AccordionContent>
//                   <div className="grid gap-2">
//                     {["Full-time", "Part-time", "Contract", "Internship"].map(
//                       (jobType) => (
//                         <Label
//                           key={jobType}
//                           className="flex items-center gap-2 font-normal"
//                         >
//                           <Checkbox
//                             checked={selectedFilters.jobType.includes(jobType)}
//                             onCheckedChange={() =>
//                               handleFilterChange("jobType", jobType)
//                             }
//                           />
//                           {jobType}
//                         </Label>
//                       )
//                     )}
//                   </div>
//                 </AccordionContent>
//               </AccordionItem>
//               <AccordionItem value="salary">
//                 <AccordionTrigger className="text-base">
//                   Salary
//                 </AccordionTrigger>
//                 <AccordionContent>
//                   <div className="grid gap-2">
//                     {["50k - 100k", "100k - 150k", "150k+"].map(
//                       (salaryRange) => (
//                         <Label
//                           key={salaryRange}
//                           className="flex items-center gap-2 font-normal"
//                         >
//                           <Checkbox
//                             checked={selectedFilters.salary.includes(
//                               salaryRange
//                             )}
//                             onCheckedChange={() =>
//                               handleFilterChange("salary", salaryRange)
//                             }
//                           />
//                           {salaryRange}
//                         </Label>
//                       )
//                     )}
//                   </div>
//                 </AccordionContent>
//               </AccordionItem>
//             </Accordion>
//           </div>
//           <div className="grid gap-2">
//             <h2 className="text-lg font-semibold">Recommended for you</h2>
//             <div className="grid gap-2">
//               {[
//                 "Software Engineer",
//                 "Product Manager",
//                 "UX Designer",
//                 "Data Analyst",
//               ].map((role) => (
//                 <Link
//                   key={role}
//                   href="#"
//                   className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
//                   prefetch={false}
//                 >
//                   <BriefcaseIcon className="w-5 h-5" />
//                   <span>{role}</span>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className="grid gap-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <h1 className="text-2xl font-bold">Browse Jobs</h1>
//               <Badge variant="outline" className="text-sm">
//                 {filteredJobs.length} jobs
//               </Badge>
//             </div>
//             <div className="flex items-center gap-2">
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="outline" size="sm" className="h-8 gap-1">
//                     <FilterIcon className="w-4 h-4" />
//                     <span>Filter</span>
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                   <DropdownMenuLabel>Filter by</DropdownMenuLabel>
//                   <DropdownMenuSeparator />
//                   {["Full-time", "Part-time", "Contract", "Internship"].map(
//                     (jobType) => (
//                       <DropdownMenuCheckboxItem
//                         key={jobType}
//                         checked={selectedFilters.jobType.includes(jobType)}
//                         onCheckedChange={() =>
//                           handleFilterChange("jobType", jobType)
//                         }
//                       >
//                         {jobType}
//                       </DropdownMenuCheckboxItem>
//                     )
//                   )}
//                 </DropdownMenuContent>
//               </DropdownMenu>
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="outline" size="sm" className="h-8 gap-1">
//                     <ListOrderedIcon className="w-4 h-4" />
//                     <span>Sort</span>
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                   <DropdownMenuLabel>Sort by</DropdownMenuLabel>
//                   <DropdownMenuSeparator />
//                   <DropdownMenuRadioGroup
//                     value={sortBy}
//                     onValueChange={handleSortChange}
//                   >
//                     <DropdownMenuRadioItem value="relevance">
//                       Relevance
//                     </DropdownMenuRadioItem>
//                     <DropdownMenuRadioItem value="newest">
//                       Newest
//                     </DropdownMenuRadioItem>
//                     <DropdownMenuRadioItem value="salary">
//                       Salary
//                     </DropdownMenuRadioItem>
//                   </DropdownMenuRadioGroup>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//           </div>
//           <div className="grid gap-4">
//             {filteredJobs.map((job) => (
//               <Card key={job.id}>
//                 <CardHeader className="flex justify-between">
//                   <div>
//                     <h3 className="text-lg font-semibold">{job.title}</h3>
//                     <p className="text-muted-foreground">{job.company}</p>
//                   </div>
//                   <Button variant="ghost" size="icon" className="rounded-full">
//                     <HeartIcon className="w-5 h-5 text-muted-foreground" />
//                   </Button>
//                 </CardHeader>
//                 <CardContent className="grid grid-cols-2 gap-4">
//                   <div className="flex items-center gap-2">
//                     <LocateIcon className="w-4 h-4" />
//                     <p>{job.location}</p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <DollarSignIcon className="w-4 h-4" />
//                     <p>{job.salary}</p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <BriefcaseIcon className="w-4 h-4" />
//                     <p>{job.type}</p>
//                   </div>
//                 </CardContent>
//                 <CardFooter>
//                   <Button variant="default" size="sm">
//                     Apply now
//                   </Button>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// function BriefcaseIcon(
//   props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
// ) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
//       <rect width="20" height="14" x="2" y="6" rx="2" />
//     </svg>
//   );
// }

// function DollarSignIcon(
//   props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
// ) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <line x1="12" x2="12" y1="2" y2="22" />
//       <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
//     </svg>
//   );
// }

// function FilterIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
//     </svg>
//   );
// }

// function HeartIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
//     </svg>
//   );
// }

// function ListOrderedIcon(
//   props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
// ) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <line x1="10" x2="21" y1="6" y2="6" />
//       <line x1="10" x2="21" y1="12" y2="12" />
//       <line x1="10" x2="21" y1="18" y2="18" />
//       <path d="M4 6h1v4" />
//       <path d="M4 10h2" />
//       <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
//     </svg>
//   );
// }

// function LocateIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <line x1="2" x2="5" y1="12" y2="12" />
//       <line x1="19" x2="22" y1="12" y2="12" />
//       <line x1="12" x2="12" y1="2" y2="5" />
//       <line x1="12" x2="12" y1="19" y2="22" />
//       <circle cx="12" cy="12" r="7" />
//     </svg>
//   );
// }
"use client"

import { useState, useMemo, JSX, SVGProps, SetStateAction } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type Job = {
  id: number
  company: string
  title: string
  type: string
  location: string
  salary: string
  createdAt?: string
  entity_match_score: number
  final_comprehensive_score: number
  keyword_match_score: number
  semantic_similarity: number
}

type Filters = {
  location: string[]
  jobType: string[]
  salary: string[]
}

export default function Component() {
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    location: [],
    jobType: [],
    salary: [],
  })

  const [sortBy, setSortBy] = useState<string>("relevance")
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  const handleFilterChange = (type: keyof Filters, value: string) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [type]: prevFilters[type].includes(value)
        ? prevFilters[type].filter((item: string) => item !== value)
        : [...prevFilters[type], value],
    }))
  }

  const handleSortChange = (value: SetStateAction<string>) => {
    setSortBy(value)
  }

  const jobs: Job[] = [
    {
      id: 1,
      company: "Acme Inc.",
      title: "Senior Software Engineer - Remote",
      type: "Full-time",
      location: "Remote",
      salary: "100k - 150k",
      entity_match_score: 0.8,
      final_comprehensive_score: 0.85,
      keyword_match_score: 0.9,
      semantic_similarity: 0.75,
    },
    {
      id: 2,
      company: "Globex Corporation",
      title: "Product Manager - Enterprise Solutions",
      type: "Full-time",
      location: "San Francisco, CA",
      salary: "120k - 160k",
      entity_match_score: 0.7,
      final_comprehensive_score: 0.82,
      keyword_match_score: 0.85,
      semantic_similarity: 0.8,
    },
    {
      id: 3,
      company: "Stark Industries",
      title: "UX Designer - Augmented Reality",
      type: "Contract",
      location: "New York, NY",
      salary: "80k - 120k",
      entity_match_score: 0.6,
      final_comprehensive_score: 0.75,
      keyword_match_score: 0.8,
      semantic_similarity: 0.7,
    },
    {
      id: 4,
      company: "Umbrella Corporation",
      title: "Data Science Intern - Bioinformatics",
      type: "Internship",
      location: "Remote",
      salary: "Unpaid",
      entity_match_score: 0.5,
      final_comprehensive_score: 0.65,
      keyword_match_score: 0.7,
      semantic_similarity: 0.6,
    },
  ]

  const filteredJobs = useMemo(() => {
    return jobs
      .filter((job) => {
        if (
          selectedFilters.location.length > 0 &&
          !selectedFilters.location.includes(job.location)
        ) {
          return false
        }
        if (
          selectedFilters.jobType.length > 0 &&
          !selectedFilters.jobType.includes(job.type)
        ) {
          return false
        }
        if (
          selectedFilters.salary.length > 0 &&
          !selectedFilters.salary.includes(job.salary)
        ) {
          return false
        }
        return true
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "newest":
            return (
              new Date(b.createdAt || "").getTime() -
              new Date(a.createdAt || "").getTime()
            )
          case "salary":
            return (
              parseFloat(b.salary.split("-")[0]) -
              parseFloat(a.salary.split("-")[0])
            )
          default:
            return 0
        }
      })
  }, [selectedFilters, sortBy, jobs])

  return (
    <div className="flex flex-col min-h-screen bg-muted">
      <main className="flex-1 grid grid-cols-[240px_1fr] gap-8 p-6 md:p-10">
        <div className="space-y-6">
          <div className="grid gap-2">
            <h2 className="text-lg font-semibold">Filters</h2>
            <Accordion type="single" collapsible>
              <AccordionItem value="location">
                <AccordionTrigger className="text-base">
                  Location
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2">
                    {["Remote", "San Francisco", "New York", "London"].map(
                      (location) => (
                        <Label
                          key={location}
                          className="flex items-center gap-2 font-normal"
                        >
                          <Checkbox
                            checked={selectedFilters.location.includes(
                              location
                            )}
                            onCheckedChange={() =>
                              handleFilterChange("location", location)
                            }
                          />
                          {location}
                        </Label>
                      )
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="job-type">
                <AccordionTrigger className="text-base">
                  Job Type
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2">
                    {["Full-time", "Part-time", "Contract", "Internship"].map(
                      (jobType) => (
                        <Label
                          key={jobType}
                          className="flex items-center gap-2 font-normal"
                        >
                          <Checkbox
                            checked={selectedFilters.jobType.includes(jobType)}
                            onCheckedChange={() =>
                              handleFilterChange("jobType", jobType)
                            }
                          />
                          {jobType}
                        </Label>
                      )
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="salary">
                <AccordionTrigger className="text-base">
                  Salary
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2">
                    {["50k - 100k", "100k - 150k", "150k+"].map(
                      (salaryRange) => (
                        <Label
                          key={salaryRange}
                          className="flex items-center gap-2 font-normal"
                        >
                          <Checkbox
                            checked={selectedFilters.salary.includes(
                              salaryRange
                            )}
                            onCheckedChange={() =>
                              handleFilterChange("salary", salaryRange)
                            }
                          />
                          {salaryRange}
                        </Label>
                      )
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="grid gap-2">
            <h2 className="text-lg font-semibold">Recommended for you</h2>
            <div className="grid gap-2">
              {[
                "Software Engineer",
                "Product Manager",
                "UX Designer",
                "Data Analyst",
              ].map((role) => (
                <Link
                  key={role}
                  href="#"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <BriefcaseIcon className="w-5 h-5" />
                  <span>{role}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">Browse Jobs</h1>
              <Badge variant="outline" className="text-sm">
                {filteredJobs.length} jobs
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <FilterIcon className="w-4 h-4" />
                    <span>Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {["Full-time", "Part-time", "Contract", "Internship"].map(
                    (jobType) => (
                      <DropdownMenuCheckboxItem
                        key={jobType}
                        checked={selectedFilters.jobType.includes(jobType)}
                        onCheckedChange={() =>
                          handleFilterChange("jobType", jobType)
                        }
                      >
                        {jobType}
                      </DropdownMenuCheckboxItem>
                    )
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <ListOrderedIcon className="w-4 h-4" />
                    <span>Sort</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={sortBy}
                    onValueChange={handleSortChange}
                  >
                    <DropdownMenuRadioItem value="relevance">
                      Relevance
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="newest">
                      Newest
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="salary">
                      Salary
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="grid gap-4">
            {filteredJobs.map((job) => (
              <Card key={job.id}>
                <CardHeader className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <p className="text-muted-foreground">{job.company}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <HeartIcon className="w-5 h-5 text-muted-foreground" />
                  </Button>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <LocateIcon className="w-4 h-4" />
                    <p>{job.location}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSignIcon className="w-4 h-4" />
                    <p>{job.salary}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <BriefcaseIcon className="w-4 h-4" />
                    <p>{job.type}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="default" size="sm">
                    Apply now
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedJob(job)}
                      >
                        Show More
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>{job.title}</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Company</Label>
                          <div className="col-span-3">{job.company}</div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Location</Label>
                          <div className="col-span-3">{job.location}</div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Type</Label>
                          <div className="col-span-3">{job.type}</div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Salary</Label>
                          <div className="col-span-3">{job.salary}</div>
                        </div>
                        <Separator />
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Entity Match</Label>
                          <div className="col-span-3">
                            {job.entity_match_score.toFixed(2)}
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Keyword Match</Label>
                          <div className="col-span-3">
                            {job.keyword_match_score.toFixed(2)}
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">
                            Semantic Similarity
                          </Label>
                          <div className="col-span-3">
                            {job.semantic_similarity.toFixed(2)}
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">
                            Comprehensive Score
                          </Label>
                          <div className="col-span-3">
                            {job.final_comprehensive_score.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

function BriefcaseIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}

function DollarSignIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}

function FilterIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}

function HeartIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}

function ListOrderedIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="10" x2="21" y1="6" y2="6" />
      <line x1="10" x2="21" y1="12" y2="12" />
      <line x1="10" x2="21" y1="18" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>
  )
}

function LocateIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="2" x2="5" y1="12" y2="12" />
      <line x1="19" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="5" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <circle cx="12" cy="12" r="7" />
    </svg>
  )
}

function HeatIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 12c0-1 .1-1.9.4-2.7.3-.8.7-1.5 1.2-2.1.5-.6 1.1-1.1 1.7-1.5.6-.4 1.3-.6 1.9-.8l.8-.2c-1.3 1.4-2 3.1-2 5.3 0 1 .2 1.9.6 2.8.4.9 1 1.6 1.8 2.2.8.6 1.6.9 2.6.9.5 0 1 0 1.5-.1-.5.8-1.1 1.5-1.9 2-1 .7-2.1 1-3.4 1-1.3 0-2.4-.3-3.4-1-.9-.7-1.7-1.6-2.2-2.8-.5-1.2-.8-2.5-.8-4 0-1 .1-1.9.4-2.7.3-.8.7-1.5 1.2-2.1.5-.6 1.1-1.1 1.7-1.5.6-.4 1.3-.6 1.9-.8l.8-.2C12.7 4.5 12 6.3 12 8.5c0 1 .2 1.9.6 2.8.4.9 1 1.6 1.8 2.2.8.6 1.6.9 2.6.9.5 0 1 0 1.5-.1-.5.8-1.1 1.5-1.9 2-1 .7-2.1 1-3.4 1-1.3 0-2.4-.3-3.4-1-.9-.7-1.7-1.6-2.2-2.8-.5-1.2-.8-2.5-.8-4z" />
    </svg>
  )
}