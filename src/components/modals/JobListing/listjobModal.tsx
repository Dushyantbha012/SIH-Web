'use client';
import Modal from "../modal";
import Heading from "../ModalInputs/Heading";
import Input from "./Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import React, { useState, useMemo } from "react";
import Calendar from "../ModalInputs/calendar";
import CategoryInput from "../ModalInputs/categoryInput"
import toast from "react-hot-toast";
import useCreateJob from "@/hooks/useCreateJob";
import { PiStudentBold } from "react-icons/pi";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdOutlineComputer } from "react-icons/md";
import { FaSitemap } from "react-icons/fa";
import { GrCloudComputer } from "react-icons/gr";
const jobTypes = [
    {
        label:"Internship",
        icon: PiStudentBold
    },
    {
        label:"Full Time",
        icon: IoPersonAddSharp
    }
]
const modedata=[
    {
        label:"Remote",
        icon: MdOutlineComputer
    },
    {
        label:"On-Site",
        icon: FaSitemap
    },
    {
        label:"Hybrid",
        icon: GrCloudComputer
    },
]
interface listingProps {
    description: string;
    responsibilites: string;
    requirements: string;
    experience: string;
    location: string;
    jobType: string;
    mode: string;
}

enum STEPS {
    DESCRIPTION = 0,
    RESPONSIBILITIES = 1,
    REQUIREMENTS = 2,
    EXPERIENCE = 3,
    LOCATION = 4,
    JOBTYPE = 5,
    MODE = 6
}

const ListJobModal = () => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<listingProps>({
        defaultValues: {
            description: "",
            responsibilites: "",
            requirements: "",
            experience: "",
            location: "",
            jobType: "",
            mode: "",
        },
    });

    const createJob = useCreateJob();
    const [isLoading,setIsLoading]=useState(false);
    const [step, setStep] = useState(STEPS.DESCRIPTION);
    const [description, setDescription] = useState("");
    const [responsibilites, setResponsibilites] = useState("");
    const [requirements, setRequirements] = useState("");
    const [experience, setExperience] = useState("");
    const [location, setLocation] = useState("");
    const [jobType, setJobType] = useState("");
    const [mode, setMode] = useState("");
    const onBack = () => {
        setStep((value) => value - 1);
    };

    const onNext = () => {
        setStep((value) => value + 1);
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.MODE) {
            return onNext();
        }
        const jobData = {
            description: description,
            responsibilites: responsibilites,
            requirements: requirements,
            experience: experience,
            location: location,
            jobType: jobType,
            mode: mode,
        };
        console.log(jobData);
        toast.success("Form submitted");
    };

    const actionLabel = useMemo(() => {
        if (step === STEPS.MODE) {
            return 'Create';
        }
        return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.DESCRIPTION) {
            return undefined;
        }
        return 'Back';
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Enter Description of job"
                subtitle="Description of job"
            />
            <Input
                id="description"
                label="Description"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    );

    if (step === STEPS.RESPONSIBILITIES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
            <Heading
                title="Enter Responsibilites"
                subtitle="Responsibilites expected"
            />
            <Input
                id="responsibilites"
                label="Responsibilities"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
        );
    }

    if (step === STEPS.REQUIREMENTS) {
        bodyContent = (
            <div className="flex flex-col gap-8">
            <Heading
                title="Enter Requirements"
                subtitle="Job Requirements"
            />
            <Input
                id="requirements"
                label="Requirements"
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
                title="Enter Experiences"
                subtitle="Job Experience"
            />
            <Input
                id="experience"
                label="experiences"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
        );
    }

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
            <Heading
                title="Enter Location"
                subtitle="Location of job"
            />
            <Input
                id="location"
                label="Location"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
        );
    }

    if (step === STEPS.JOBTYPE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
            <Heading
                title="Enter Jobtype"
                subtitle="Jobtype required"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                    {jobTypes.map((item) => (
                        <div key={item.label} className="col-span-1">
                            <CategoryInput
                                onClick={() => setJobType(item.label)}
                                selected={jobType === item.label}
                                label={item.label}
                                icon={item.icon}
                            />
                        </div>
                    ))}
                </div>
        </div>
        );
    }
    if (step === STEPS.MODE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
            <Heading
                title="Enter Jobtype"
                subtitle="Jobtype required"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                    {modedata.map((item) => (
                        <div key={item.label} className="col-span-1">
                            <CategoryInput
                                onClick={() => setMode(item.label)}
                                selected={mode === item.label}
                                label={item.label}
                                icon={item.icon}
                            />
                        </div>
                    ))}
                </div>
        </div>
        );
    }

    return (
        <Modal
            isOpen={createJob.isOpen}
            onClose={createJob.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.DESCRIPTION ? undefined : onBack}
            title="Enter details of new job posting"
            body={bodyContent}
        />
    );
};

export default ListJobModal;
