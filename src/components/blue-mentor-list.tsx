"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectValue,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Clock, Calendar as CalendarIcon } from "lucide-react";

type Mentor = {
  id: number;
  name: string;
  expertise: string;
  yearsOfExperience: number;
  avatar: string;
};

const mentors: Mentor[] = [
  {
    id: 1,
    name: "Alice Johnson",
    expertise: "Web Development",
    yearsOfExperience: 8,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Bob Smith",
    expertise: "Data Science",
    yearsOfExperience: 5,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Carol Williams",
    expertise: "UX Design",
    yearsOfExperience: 10,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "David Brown",
    expertise: "Mobile Development",
    yearsOfExperience: 7,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 5,
    name: "Eva Martinez",
    expertise: "Machine Learning",
    yearsOfExperience: 6,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    "id": 6,
    "name": "Arjun Patel",
    "expertise": "Data Science",
    "yearsOfExperience": 5,
    "avatar": "/placeholder.svg?height=100&width=100"
  },
  {
    "id": 7,
    "name": "Sophia Zhang",
    "expertise": "AI Ethics",
    "yearsOfExperience": 4,
    "avatar": "/placeholder.svg?height=100&width=100"
  },
  {
    "id": 8,
    "name": "Liam Johnson",
    "expertise": "Natural Language Processing",
    "yearsOfExperience": 7,
    "avatar": "/placeholder.svg?height=100&width=100"
  },
  {
    "id": 9,
    "name": "Emily Williams",
    "expertise": "Computer Vision",
    "yearsOfExperience": 6,
    "avatar": "/placeholder.svg?height=100&width=100"
  },
  {
    "id": 10,
    "name": "Ravi Sharma",
    "expertise": "Deep Learning",
    "yearsOfExperience": 8,
    "avatar": "/placeholder.svg?height=100&width=100"
  },
  {
    "id": 11,
    "name": "Olivia Brown",
    "expertise": "Robotics",
    "yearsOfExperience": 5,
    "avatar": "/placeholder.svg?height=100&width=100"
  },
  {
    "id": 12,
    "name": "Ethan Clark",
    "expertise": "Reinforcement Learning",
    "yearsOfExperience": 7,
    "avatar": "/placeholder.svg?height=100&width=100"
  },
  {
    "id": 13,
    "name": "Priya Singh",
    "expertise": "Big Data Analytics",
    "yearsOfExperience": 9,
    "avatar": "/placeholder.svg?height=100&width=100"
  },
  {
    "id": 14,
    "name": "Daniel Lee",
    "expertise": "Autonomous Systems",
    "yearsOfExperience": 6,
    "avatar": "/placeholder.svg?height=100&width=100"
  },
  {
    "id": 15,
    "name": "Grace Kim",
    "expertise": "Edge Computing",
    "yearsOfExperience": 4,
    "avatar": "/placeholder.svg?height=100&width=100"
  },
  {
    "id": 16,
    "name": "Michael Garcia",
    "expertise": "Cloud AI",
    "yearsOfExperience": 5,
    "avatar": "/placeholder.svg?height=100&width=100"
  }
];

export function BlueMentorList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expertiseFilter, setExpertiseFilter] = useState("all");
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const filteredMentors = mentors.filter(
    (mentor) =>
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (expertiseFilter === "all" || mentor.expertise === expertiseFilter)
  );

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-light mb-8 text-center text-blue-800">
        Find Your Mentor
      </h1>

      <div className="flex gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
          <Input
            placeholder="Search mentors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-blue-50 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
          />
        </div>
        <Select onValueChange={setExpertiseFilter}>
          <SelectTrigger className="w-[180px] bg-blue-50 border-blue-200 focus:border-blue-400 focus:ring-blue-400">
            <SelectValue placeholder="Expertise" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Expertise</SelectItem>
            <SelectItem value="Web Development">Web Development</SelectItem>
            <SelectItem value="Data Science">Data Science</SelectItem>
            <SelectItem value="UX Design">UX Design</SelectItem>
            <SelectItem value="Mobile Development">
              Mobile Development
            </SelectItem>
            <SelectItem value="Machine Learning">Machine Learning</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-6">
        {filteredMentors.map((mentor) => (
          <div
            key={mentor.id}
            className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm transition-shadow hover:shadow-md border border-blue-100"
          >
            <Avatar className="w-16 h-16">
              <AvatarImage src={mentor.avatar} alt={mentor.name} />
              <AvatarFallback className="bg-blue-200 text-blue-800">
                {mentor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-blue-800">
                {mentor.name}
              </h2>
              <p className="text-sm text-blue-600">{mentor.expertise}</p>
              <p className="text-xs text-blue-400">
                {mentor.yearsOfExperience} years of experience
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="ml-auto bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 hover:text-blue-700"
                  onClick={() => setSelectedMentor(mentor)}
                >
                  Schedule
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-center text-blue-800">
                    Schedule with {selectedMentor?.name}
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 pt-4">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(day) => {
                      if (day) {
                        setSelectedDate(day);
                      }
                    }}
                    className="rounded-md border border-blue-200"
                  />
                  <Select>
                    <SelectTrigger className="bg-blue-50 border-blue-200 focus:border-blue-400 focus:ring-blue-400">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00">09:00 AM</SelectItem>
                      <SelectItem value="10:00">10:00 AM</SelectItem>
                      <SelectItem value="11:00">11:00 AM</SelectItem>
                      <SelectItem value="13:00">01:00 PM</SelectItem>
                      <SelectItem value="14:00">02:00 PM</SelectItem>
                      <SelectItem value="15:00">03:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Confirm Meeting
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
}
