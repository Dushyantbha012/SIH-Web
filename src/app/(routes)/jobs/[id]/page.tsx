'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import { Sidebar } from 'lucide-react';
import JobSidebar from "@/components/jobPage/JobSidebar"
import TaskDashboard from '@/components/jobPage/TaskDashboard';
import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { SiReacthookform } from "react-icons/si";
import { MdPerson2 } from "react-icons/md";

interface JobItem {
  id: string;
  recruiterId: string;
  description: string;
  responsibilities: string;
  requirements: string;
  experience: string;
  location: string;
  jobType: string;
  mode: string;
  organization: string;
}

const responseexample = { recommendation: 'Overall Rating: 80/100\n' + '\n' + 'Strengths:\n' + '\n' + '1. Strong technical skills: Dushyant has a wide range of technical skills, including programming languages, libraries, and frameworks. His experience with TypeScript, Next.js, React.js, and MongoDB is particularly relevant for the Backend Engineer role.\n' + "2. Impressive personal projects: Dushyant's personal projects, such as CarrerHire, Discord clone, and DOC Buddy, demonstrate his ability to work on complex projects and showcase his skills.\n" + '3. Relevant coursework: His education background includes relevant coursework, such as Data Structures & Algorithms, Object Oriented Programming, and Software Engineering.\n' + '\n' + 'Weaknesses:\n' + '\n' + "1. Limited industry experience: Dushyant's internship experience at Ensight is valuable, but it is limited to a few months, which may not provide enough exposure to real-world challenges and clients.\n" + "2. No direct experience in cloud-native applications: Dushyant's experience seems to be focused more on frontend and web development, which may require additional training or exploration to develop expertise in cloud-native applications.\n" + '\n' + 'Analysis:\n' + '\n' + "Based on the job description, I assessed Dushyant's profile across the various parameters:\n" + '\n' + "* Skills Match: 20/25 points (Dushyant's technical skills align well with the job requirements, but he may need to develop expertise in cloud-native applications.)\n" + "* Experience: 15/25 points (Dushyant's internship experience is limited, but it demonstrates his ability to work on complex projects and collaborate with others.)\n" + "* Education: 8/10 points (Dushyant's education background is relevant, with a strong focus on computer science and engineering.)\n" + "* Accomplishments: 10/10 points (Dushyant's personal projects are impressive and demonstrate his skills and capabilities.)\n" + '* Geographical Fit: 5/5 points (Dushyant is open to relocation, which is essential for this internship.)\n' + '* Career Progression: 8/10 points (Dushyant has demonstrated a willingness to take on increasing responsibilities and has a strong educational background.)\n' + '* Availability: N/A (Not applicable, as the job posting does not require a specific availability timeframe.)\n' + "* Industry Knowledge: 5/5 points (Dushyant's interests in web design and development, artificial intelligence, and machine learning indicate a strong foundation in industry trends and market conditions.)\n" + "* Recommendations/References: N/A (Not applicable, as Dushyant's LinkedIn profile does not have any relevant recommendations or references.)\n" + '\n' + 'Overall Assessment:\n' + "Dushyant's profile is strong, with impressive technical skills and relevant coursework. His personal projects demonstrate his capabilities and enthusiasm for web development and AI. However, he may require additional training or exploration to develop expertise in cloud-native applications. Overall, I would recommend Dushyant for the Backend Engineer internship, pending a technical evaluation to assess his skills in cloud-native applications." }
export default function JobPage() {
  const { id } = useParams();
  const [job, setJob] = useState<JobItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState('');

  useEffect(() => {
    if (typeof id === 'string') { 
      const fetchJob = async () => {
        try {
          const response = await axios.get(`/api/jobs/${id}`);
          setJob(response.data);
        } catch (error) {
          console.error('Error fetching job:', error);
          setError('Failed to load job details.');
        } finally {
          setLoading(false);
        }
      };

      fetchJob();
    }
  }, [id]);
  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        const response = await axios.post('/api/ai/recommendation', job);
        setRecommendation(response.data.recommendation);
      } catch (error) {
        console.error('Error fetching recommendation:', error);
      }
    };

    if (job) {
      fetchRecommendation();
    }
  }, [job]);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div className='min-h-screen'>
    <div className="bg-white h-[50px]"></div>
    <div className='w-full h-full'>
    <div className="flex h-screen bg-gray-100">
          <div className='justify-start'> <div>
            <div className="bg-white w-[300px] p-4 shadow-lg h-screen">
              <ul className="space-y-4">
                <li className="text-lg font-semibold flex items-center">
                  <IoLocationSharp className="mr-2" /> Location
                </li>
                <li className="text-lg font-semibold flex items-center">
                  <SiReacthookform className="mr-2" /> Type
                </li>
                <li className="text-lg font-semibold flex items-center">
                  <MdPerson2 className="mr-2" /> JobTitle
                </li>
              </ul>
            </div>
          </div></div>
          <div className="w-4/6">
            <div className="flex-1 p-6">
              <h1 className="text-3xl font-bold mb-4">Job Details</h1>

              <div className="mb-6">
                <ul>
                  <li className="flex items-center justify-between py-2">
                    <div className="flex items-center font-semibold">
                      Company
                    </div>
                    <span className="bg-purple-200 text-purple-700 px-2 py-1 rounded">
                      Private
                    </span>
                  </li>
                  <li className="flex items-center justify-between py-2">
                    <div className="flex items-center font-semibold">
                      Location
                    </div>
                    <span className="bg-purple-200 text-purple-700 px-2 py-1 rounded">
                      {job.location}
                    </span>
                  </li>
                  <li className="flex items-center justify-between py-2">
                    <div className="flex items-center font-semibold">
                      Type
                    </div>
                    <span className="bg-purple-200 text-purple-700 px-2 py-1 rounded">
                      {job.jobType}
                    </span>
                  </li>
                </ul>
              </div>

              {/* <div className="mt-8">
                <h2 className="text-xl font-semibold">Similarity Score</h2>
                <div className="space-y-4 mt-4">
                  <div className="p-4 bg-blue-100 rounded shadow">
                    <div className="flex justify-between">
                      <h3 className="font-bold">Skills Match</h3>
                      <span className="bg-blue-200 text-blue-700 px-2 py-1 rounded">
                        20 points
                      </span>
                    </div>
                    <p className="mb-2">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Commodi, sit? Lorem, ipsum dolor sit amet consectetur
                      adipisicing elit. Itaque corrupti autem quibusdam hic
                      perferendis vero maiores ratione excepturi praesentium ipsam.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-100 rounded shadow">
                    <div className="flex justify-between">
                      <h3 className="font-bold">Experience</h3>
                      <span className="bg-blue-200 text-blue-700 px-2 py-1 rounded">
                        25 points
                      </span>
                    </div>
                    <p className="mb-2">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Commodi, sit? Lorem, ipsum dolor sit amet consectetur
                      adipisicing sdam hic
                      perferendis vero maiores ratione excepturi praesentium ipsam.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-100 rounded shadow">
                    <div className="flex justify-between">
                      <h3 className="font-bold">Education</h3>
                      <span className="bg-blue-200 text-blue-700 px-2 py-1 rounded">
                        10 points
                      </span>
                    </div>
                    <p className="mb-2">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Compti autem quibusdam hic
                      perferendis vero maiores ratione excepturi praesentium ipsam.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-100 rounded shadow">
                    <div className="flex justify-between">
                      <h3 className="font-bold">Accomplishments</h3>
                      <span className="bg-blue-200 text-blue-700 px-2 py-1 rounded">
                        10 points
                      </span>
                    </div>
                    <p className="mb-2">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      adipisicing el excepturi praesentium ipsam.
                    </p>
                  </div>
                </div>
              </div> */}
              {!recommendation && (
                <div>
                  {responseexample.recommendation}
                 </div>)}
              {!loading && (
                <div>
                  {recommendation}
                </div>
              )}
            </div>
          </div>
    </div>
    </div>
    </div>
  );
    

  
}
