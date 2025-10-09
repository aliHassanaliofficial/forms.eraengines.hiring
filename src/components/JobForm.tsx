import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import PersonalInfoStep from './form-steps/PersonalInfoStep';
import ContactInfoStep from './form-steps/ContactInfoStep';
import ExperienceStep from './form-steps/ExperienceStep';
import EducationStep from './form-steps/EducationStep';
import SkillsStep from './form-steps/SkillsStep';
import DocumentsStep from './form-steps/DocumentsStep';
import ReviewStep from './form-steps/ReviewStep';
import { getStepValidation } from '@/utils/formValidation';
import companyData from '@/ReferCompany.ts';

export interface JobFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: Date | undefined;
  gender: string;
  nationality: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  linkedin: string;
  portfolio: string;
  experiences: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    graduationYear: string;
    gpa: string;
  }>;
  technicalSkills: string[];
  softSkills: string[];
  languages: Array<{
    language: string;
    proficiency: string;
  }>;
  resume: File | null;
  coverLetter: File | null;
  desiredPosition: string;
  expectedSalary: string;
  availabilityDate: Date | undefined;
  workType: string;
}

const JobForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<JobFormData>({
    firstName: '',
    lastName: '',
    dateOfBirth: undefined,
    gender: '',
    nationality: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    linkedin: '',
    portfolio: '',
    experiences: [],
    education: [],
    technicalSkills: [],
    softSkills: [],
    languages: [],
    resume: null,
    coverLetter: null,
    desiredPosition: '',
    expectedSalary: '',
    availabilityDate: undefined,
    workType: ''
  });

  const steps = [
    { title: 'Personal Info', component: PersonalInfoStep },
    { title: 'Contact Details', component: ContactInfoStep },
    { title: 'Experience', component: ExperienceStep },
    { title: 'Education', component: EducationStep },
    { title: 'Skills', component: SkillsStep },
    { title: 'Documents', component: DocumentsStep },
    { title: 'Review', component: ReviewStep }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;
  const isCurrentStepValid = getStepValidation(currentStep, formData);

  const handleNext = () => {
    if (currentStep < steps.length - 1 && isCurrentStepValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const sanitizeFileName = (fileName: string) => {
    return fileName
      .toLowerCase()                  // make everything lowercase
      .replace(/\s+/g, "_")           // replace spaces with underscores
      .replace(/[()[\]{}]/g, "")      // remove brackets/parentheses
      .replace(/[^a-z0-9._-]/g, "")   // allow only safe chars
      .replace(/_+/g, "_")            // collapse multiple underscores
      .replace(/^_+|_+$/g, "");       // trim underscores from start/end
  };

  const uploadFile = async (file: File, bucket: string, folder: string) => {
    const safeFileName = sanitizeFileName(file.name);
    const filePath = `${folder}/${Date.now()}_${safeFileName}`;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("File upload error:", error);
      toast.error(`Failed to upload file: ${file.name}`);
      return null;
    }

    return data.path;
  };

  const handleSubmit = async () => {
    if (!isCurrentStepValid) {
      toast.error("Please fill in all required fields before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      let resumePath = null;
      let coverLetterPath = null;

      if (formData.resume) {
        resumePath = await uploadFile(formData.resume, "job-documents", "resumes");
      }
      if (formData.coverLetter) {
        coverLetterPath = await uploadFile(formData.coverLetter, "job-documents", "cover_letters");
      }

      const { data, error } = await supabase
        .from('job_applications')
        .insert({
          first_name: formData.firstName,
          last_name: formData.lastName,
          date_of_birth: formData.dateOfBirth?.toISOString().split('T')[0] || null,
          gender: formData.gender || null,
          nationality: formData.nationality || null,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip_code: formData.zipCode,
          linkedin: formData.linkedin,
          portfolio: formData.portfolio || null,
          experiences: formData.experiences,
          education: formData.education,
          technical_skills: formData.technicalSkills,
          soft_skills: formData.softSkills,
          languages: formData.languages,
          desired_position: formData.desiredPosition || null,
          expected_salary: formData.expectedSalary || null,
          availability_date: formData.availabilityDate?.toISOString().split('T')[0] || null,
          work_type: formData.workType || null,
          resume_filename: resumePath,
          cover_letter_filename: coverLetterPath
        })
        .select();

      const isValidLinkedinUrl = /^https?:\/\/(www\.)?linkedin\.com\/.*$/.test(formData.linkedin);
      if (formData.linkedin && !isValidLinkedinUrl) {
        toast.error("Please enter a valid URL for your LinkedIn profile.");
        setIsSubmitting(false);
        return;
      }

      if (error) {
        console.error('Supabase error:', error);
        toast.error(`Failed to submit application: ${error.message}`);
        return;
      }

      toast.success("Application submitted successfully!");
      setIsSubmitted(true);

    } catch (error) {
      console.error('Submission error:', error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }

  };

  const updateFormData = (updates: Partial<JobFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col justify-center items-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
            <p className="text-gray-600 mb-4">
              Thank you for your application. We'll review it and get back to you soon.
            </p>
            <Button onClick={() => window.location.reload()} className="w-full">
              Submit Another Application
            </Button>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="absolute bottom-0 w-full py-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center px-4 text-sm text-gray-600">
            <span>
              &copy; {new Date().getFullYear()} {companyData.companyName}. All rights reserved.
            </span>
            <span>
              Powered by{" "}
              <a
                href="https://eraengines.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Era Engines
              </a>
            </span>
          </div>
        </footer>
      </div>
    );
  }

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f9f6ff] via-[#eaf3ff] to-[#fef6f0]">

      <div className="max-w-4xl mx-auto flex-1 w-full py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <img className='mx-auto mb-4 w-28' src="./logo.png" alt="Logo" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Job Application</h1>
          <p className="text-gray-600">Complete all steps to submit your application</p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                    {index + 1}
                  </div>
                  <span className="text-xs mt-1 hidden sm:block">{step.title}</span>
                </div>
              ))}
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
          </CardContent>
        </Card>

        {/* Form Step */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{steps[currentStep].title}</CardTitle>
            <CardDescription>
              Please fill in all required information for this section.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CurrentStepComponent
              formData={formData}
              updateFormData={updateFormData}
            />
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          {currentStep === steps.length - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={!isCurrentStepValid || isSubmitting}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Submit Application
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!isCurrentStepValid}
              className="flex items-center gap-2 disabled:opacity-50"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full relative left-0 bottom-[10px] flex align-center space-evenly flex-row">
        <div className="max-w-4xl mx-auto flex justify-between items-center px-4 text-sm text-gray-600 w-1/2">
          <span>
            &copy; {new Date().getFullYear()} {companyData.companyName}. All rights reserved.
          </span>
          <span>
            Powered by{" "}
            <a
              href="https://eraengines.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Era Engines
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default JobForm;