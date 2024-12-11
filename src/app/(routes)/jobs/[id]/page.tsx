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

const responseexample = { recommendation: "Finding Recommendations" }
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
        setRecommendation(response.data.res.recommendation);
        console.log(response.data.res.recommendation);
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
