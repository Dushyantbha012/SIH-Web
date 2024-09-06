'use client';
import Modal from "../modal";
import Heading from "../ModalInputs/Heading";
import Input from "./Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import React, { useState, useMemo } from "react";
import useCreateProfile from "@/hooks/useCreateProfile";
import Calendar from "../ModalInputs/calendar";
import { FaFileCode } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { IoMdBusiness } from "react-icons/io";
import { IoSchool } from "react-icons/io5";
import { FaSchoolFlag } from "react-icons/fa6";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryInput from "../ModalInputs/categoryInput";
const pathItems = [
    {
        label: 'Software',
        icon: FaFileCode
    },
    {
        label: 'Marketing',
        icon: FaMoneyBillTrendUp
    },
    {
        label: 'Business',
        icon: IoMdBusiness
    }
];

const educationItems = [
    {
        label: 'Secondary',
        icon: FaSchoolFlag
    },
    {
        label: 'Senior Secondary',
        icon: FaSchoolFlag
    },
    {
        label: 'Bachelors',
        icon: IoSchool
    },
    {
        label: 'Masters',
        icon: IoSchool
    },
    {
        label: 'PhD',
        icon: IoSchool
    },
];

interface FormData {
    fullName: string;
    birthdate: Date;
    path: [];
    education: string;
    linkedin: string;
    github: string;
    codeforces: string;
    resume: File | null;
}

enum STEPS {
    NAME = 0,
    DOB = 1,
    PATH = 2,
    EDUCATION = 3,
    SOCIALS = 4,
    RESUME = 5
}

const ProfileModal = () => {
    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
        reset
    } = useForm<FormData>({
        defaultValues: {
            fullName: "",
            birthdate: new Date(),
            path: [],
            education: "",
            linkedin: "",
            github: "",
            codeforces: "",
            resume: null,
        },
    });

    const createProfile = useCreateProfile();
    const [step, setStep] = useState(STEPS.NAME);
    const [isLoading, setIsLoading] = useState(false);
    const [date, setDate] = useState<Date>(new Date());
    const [path, setPath] = useState<string[]>([]);
    const [education, setEducation] = useState<string>("");
    const [resume, setResume] = useState<File | null>(null);
    const addToPath = (newString: string) => {
        if (path.includes(newString)) {
            // If the string exists, remove it using filter
            setPath((prevPath) => prevPath.filter((item) => item !== newString));
          } else {
            // If it doesn't exist, add the string
            setPath((prevPath) => [...prevPath, newString]);
          }
      };
    const onBack = () => {
        setStep((value) => value - 1);
    };

    const onNext = () => {
        setStep((value) => value + 1);
    };

    const onSubmit: SubmitHandler<FieldValues> =async (data) => {
        if (step !== STEPS.RESUME) {
            return onNext();
        }

        setIsLoading(true);
        const profileData = {
            fullName: data.fullName,
            birthdate: date,
            path: path,
            education: education,
            linkedin: data.linkedin,
            github: data.github,
            codeforces: data.codeforces,
            resume: resume,
        };
        console.log(profileData);
        try {
            const response = await axios.post("/api/user/profile", {
              data: {
                name: data.fullName,
                birthdate: date,
                education: education,
                path: path,
              },
            }).then(()=>{
                toast.success("Profile Created !!");
                createProfile.onClose();
            }).catch(()=>{
                toast.error("Something went wrong!!")
            }).finally(()=>{
                setIsLoading(false);
            });
          } catch (error) {
            console.error("Error submitting data:", error);
          }
    };

    const actionLabel = useMemo(() => {
        if (step === STEPS.RESUME) {
            return 'Create';
        }
        return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.NAME) {
            return undefined;
        }
        return 'Back';
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Enter your name"
                subtitle="Enter your name"
            />
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

    if (step === STEPS.DOB) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Enter your Date of Birth"
                    subtitle="Enter your date of birth"
                />
                <Calendar
                    value={date}
                    onChange={(value) => setDate(value)}
                />
                <p>Selected Date: {date.toDateString()}</p>
            </div>
        );
    }

    if (step === STEPS.PATH) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Select your career path"
                    subtitle="The job you want to pursue"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                    {pathItems.map((item) => (
                        <div key={item.label} className="col-span-1">
                            <CategoryInput
                                onClick={() => addToPath(item.label)}
                                selected={path.includes(item.label)}
                                label={item.label}
                                icon={item.icon}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (step === STEPS.EDUCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Select your highest education level"
                    subtitle="Choose the highest degree or certification"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                    {educationItems.map((item) => (
                        <div key={item.label} className="col-span-1">
                            <CategoryInput
                                onClick={() => setEducation(item.label)}
                                selected={education === item.label}
                                label={item.label}
                                icon={item.icon}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (step === STEPS.SOCIALS) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="LinkedIn Profile"
                    subtitle="Enter the URL of your LinkedIn profile"
                />
                <Input
                    id="linkedin"
                    label="LinkedIn"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <Heading
                    title="GitHub Profile"
                    subtitle="Enter the URL of your GitHub profile"
                />
                <Input
                    id="github"
                    label="GitHub"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <Heading
                    title="Codeforces Profile"
                    subtitle="Enter the URL of your Codeforces profile"
                />
                <Input
                    id="codeforces"
                    label="Codeforces"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        );
    }

    if (step === STEPS.RESUME) {
        bodyContent = (
            <div className="file_upload p-5 border-4 border-dotted border-gray-300 rounded-lg">
                <svg
                    className="text-indigo-500 w-16 h-16 mx-auto mb-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                </svg>
                <div className="input_field flex flex-col items-center">
                    <label>
                        <input
                            className="text-sm cursor-pointer w-36 hidden"
                            type="file"
                            onChange={(e) => setResume(e.target.files ? e.target.files[0] : null)}
                        />
                        <div className="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-2 px-4 hover:bg-indigo-500">
                            Select File
                        </div>
                    </label>
                </div>
            </div>
        );
    }

    return (
        <Modal
            isOpen={createProfile.isOpen}
            onClose={createProfile.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.NAME ? undefined : onBack}
            title="Welcome! Create your profile"
            body={bodyContent}
        />
    );
};

export default ProfileModal;
