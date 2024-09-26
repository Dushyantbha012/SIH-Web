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
        skills: ""
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
      skills: skills
    };
    console.log(profileData);
    
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.SKILLS) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.NAME) {
      return undefined;
    }
    return "Back";
  }, [step]);

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
        <Heading
          title="Enter your email"
          subtitle="Your email address"
        />
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
        <Heading
          title="Enter your skills"
          subtitle="Your expertise"
        />
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
