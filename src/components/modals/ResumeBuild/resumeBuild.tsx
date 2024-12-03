"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import React, { useState, useMemo } from "react";
import { FaFileCode } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { IoMdBusiness } from "react-icons/io";
import { IoSchool } from "react-icons/io5";
import { FaSchoolFlag } from "react-icons/fa6";
import useResumeBuild from "@/hooks/useResumeBuild";
import Heading from "../ModalInputs/Heading";
import Input from "./Input";
import Modal from "../modal";
import ReactMarkdown from "react-markdown";
import { is } from "date-fns/locale";
import axios from "axios";
const markdownContent = `
**Arnav Bansal**
**AI Engineer & Data Science Enthusiast**

**Contact Information:**

* Email: bansalarnav221@gmail.com
* Phone: 7814091304

**Summary:**
Highly motivated and skilled AI Engineer with a strong passion for empowering youths and young adults through entrepreneurship. Proficient in NLP, NLG, and conversational AI technology. Profound experience in developing scalable and modular codebases, with a keen interest in entrepreneurship and social impact. Excited to join Edventures as an AI Engineer and contribute to the mission of creating a world where no idea is inhibited.

**Education:**

* Pursuing Bachelor of Technology in Computer Science and Engineering, PEC Chandigarh (2023-2027)

**Certifications:**

* Data Structures & Algorithms Certification, Udemy
* Data Science and Machine Learning Certification, IIT Guwahati Summer Analytics'24

**Skills:**

* Programming languages: C++, Python, JavaScript
* Data Science and Machine Learning: NLTK, scikit-learn, TensorFlow
* NLP and Conversational AI: Retrieval-Augmented Generation (RAG), Transformers, Large Language Models (LLMs)
* Web Development: HTML, ReactJS, Appwrite
* Data Structures and Algorithms

**Projects:**

* Developed an international website for ICDMT (International Conference on Design and Management Technologies) using ReactJS
* Summer Analytics Capstone Project: Developed an e-commerce application with a fully functional AI chatbot that keeps track of orders and provides details

**Achievements:**

* Team placed in Top 20 in Bharatiya Antariksh Hackathon, organized by ISRO

**Extra Curricular Activities:**

* Implementation Body member, PEC ACM (2023-Present)

**Why I'm a great fit for this role:**
As a passionate and skilled AI Engineer, I'm committed to investing significant time and effort in this role to grow and contribute to Edventures' mission. I'm motivated by the importance of speed and momentum in successfully bootstrapping a startup and demonstrate the drive to actively contribute to rapid progress. I'm interested in entrepreneurship and social impact, aligning with Edventures' mission to empower youths and young adults through technology. I'm eager to learn and grow my skills in NLP, NLG, and conversational AI technology, and I'm comfortable working in a remote environment.

I believe my skills, experience, and passion for entrepreneurship and social impact make me an ideal candidate for this role. I'm excited about the opportunity to join Edventures and contribute to creating a world where no idea is inhibited.
`;
const pathItems = [
  {
    label: "Software",
    icon: FaFileCode,
  },
  {
    label: "Marketing",
    icon: FaMoneyBillTrendUp,
  },
  {
    label: "Business",
    icon: IoMdBusiness,
  },
];

const educationItems = [
  {
    label: "Secondary",
    icon: FaSchoolFlag,
  },
  {
    label: "Senior Secondary",
    icon: FaSchoolFlag,
  },
  {
    label: "Bachelors",
    icon: IoSchool,
  },
  {
    label: "Masters",
    icon: IoSchool,
  },
  {
    label: "PhD",
    icon: IoSchool,
  },
];

interface FormData {
  fullName: string;
  email: string;
  contact: string;
  education: string;
  experience: string;
  skills: string;
}

enum STEPS {
  NAME = 0,
  EMAIL = 1,
  CONTACT = 2,
  EDUCATION = 3,
  EXPERIENCE = 4,
  SKILLS = 5,
}

const ResumeBuildModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      fullName: "",
      email: "",
      contact: "",
      education: "",
      experience: "",
      skills: "",
    },
  });

  const resumeBuild = useResumeBuild();
  const [step, setStep] = useState(STEPS.NAME);
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [education, setEducation] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  const [skills, setSkills] = useState<string>("");
  const [isMarkdownView, setIsMarkdownView] = useState(false);
  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.SKILLS) {
      return onNext();
    }

    setIsLoading(true);
    const profileData = {
      fullName: fullName,
      email: email,
      contact: contact,
      education: education,
      experience: experience,
      skills: skills,
    };
    setIsMarkdownView(true);
    const res = await axios.post("/api/ai/resume_build", {
      fullName,
      email,
      contact,
      education,
      experience,
      skills,
    });
    setIsLoading(false);
  };

  const actionLabel = useMemo(() => {
    if (isMarkdownView) {
      return "Close";
    }
    if (step === STEPS.SKILLS) {
      return "Create";
    }
    return "Next";
  }, [step, isMarkdownView]);

  const handleModalAction = () => {
    if (isMarkdownView) {
      resumeBuild.onClose(); // Close modal when in markdown view
    } else {
      handleSubmit(onSubmit)(); // Handle form submission
    }
  };
  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.NAME || isMarkdownView) {
      return undefined;
    }
    return "Back";
  }, [step, isMarkdownView]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Enter your name" subtitle="Enter your name" />
      <Input
        id="fullName"
        label="Your Full Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  if (step === STEPS.CONTACT) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Enter your contact details"
          subtitle="Enter your contact details"
        />
        <Input
          id="contact"
          label="Contact"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.EDUCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Enter your education"
          subtitle="The education you pursued"
        />
        <Input
          id="education"
          label="Education"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }
  if (step === STEPS.EMAIL) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Enter your email" subtitle="Your email address" />
        <Input
          id="email"
          label="Email"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }
  if (step === STEPS.EXPERIENCE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Enter your experience"
          subtitle="Your career exprience"
        />
        <Input
          id="experience"
          label="Experience"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }
  if (step === STEPS.SKILLS) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Enter your skills" subtitle="Your expertise" />
        <Input
          id="skills"
          label="Skills"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (isMarkdownView) {
    bodyContent = (
      <div className="max-h-[500px] overflow-auto p-4 bg-gray-100 rounded-md">
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </div>
    );
  }

  return (
    <Modal
      isOpen={resumeBuild.isOpen}
      onClose={resumeBuild.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.NAME ? undefined : onBack}
      title="Welcome! Create your resume"
      body={bodyContent}
    />
  );
};

export default ResumeBuildModal;
