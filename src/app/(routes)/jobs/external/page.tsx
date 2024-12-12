"use client"

import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"

export default function DashboardPage() {
  const [urls, setUrls] = useState<string[]>([])
  const [jobType, setJobType] = useState<"internship" | "private" | "government">("internship")
  const [role, setRole] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [years, setYears] = useState<string>("")

  const fetchScrapedJobs = async () => {
    try {
      const response = await axios.post('/api/ai/scrapejob', {
        jobType,
        role,
        location,
        years
      })
      if (response.status !== 200) {
        throw new Error('Failed to fetch scraped jobs')
      }
      setUrls(response.data)
    } catch (error) {
      console.error('Error fetching scraped jobs:', error)
      toast.error('Failed to fetch scraped jobs')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    fetchScrapedJobs()
  }

  return (
    <div className="container mx-auto px-4 py-24 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Scraped Job URLs</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-700">Job Type</label>
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value as "internship" | "private" | "government")}
            className="mt-1 block w-full"
          >
            <option value="internship">Internship</option>
            <option value="private">Private</option>
            <option value="government">Government</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Role</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 block w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 block w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Years of Experience</label>
          <input
            type="text"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="mt-1 block w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Fetch Jobs
        </button>
      </form>
      <ul>
        {urls.map((url, index) => (
          <li key={index}>
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              {url}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}