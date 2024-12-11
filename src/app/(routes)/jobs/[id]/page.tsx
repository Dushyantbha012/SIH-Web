'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import { Sidebar } from 'lucide-react';
import JobSidebar from "@/components/jobPage/JobSidebar"
import TaskDashboard from '@/components/jobPage/TaskDashboard';

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

export default function JobPage() {
  // const { id } = useParams();
  // const [job, setJob] = useState<JobItem | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   if (typeof id === 'string') { // Ensure id is a string
  //     const fetchJob = async () => {
  //       try {
  //         const response = await axios.get(`/api/jobs/${id}`);
  //         setJob(response.data);
  //       } catch (error) {
  //         console.error('Error fetching job:', error);
  //         setError('Failed to load job details.');
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchJob();
  //   }
  // }, [id]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>{error}</div>;
  // }

  // if (!job) {
  //   return <div>Job not found</div>;
  // }

  return (
    <div className='min-h-screen'>
    <div className="bg-white h-[50px]"></div>
    <div className='w-full h-full'>
    <div className="flex h-screen bg-gray-100">
      <div className='justify-start'> <JobSidebar /></div>
      <TaskDashboard />
    </div>
    </div>
    </div>
  );
    {/* // <div>
    //   <h1>Job Details</h1>
    //   <h2>{job.description}</h2>
    //   <p><strong>Location:</strong> {job.location}</p>
    //   <p><strong>Responsibilities:</strong> {job.responsibilities}</p>
    //   <p><strong>Requirements:</strong> {job.requirements}</p>
    //   <p><strong>Experience:</strong> {job.experience}</p>
    //   <p><strong>Job Type:</strong> {job.jobType}</p>
    //   <p><strong>Mode:</strong> {job.mode}</p>
    //   <p><strong>Organization:</strong> {job.organization}</p>
    // </div> */}

  
}
