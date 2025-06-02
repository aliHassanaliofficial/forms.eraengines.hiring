
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import PersonalInfoStep from './form-steps/PersonalInfoStep';
import ContactInfoStep from './form-steps/ContactInfoStep';
import ExperienceStep from './form-steps/ExperienceStep';
import EducationStep from './form-steps/EducationStep';
import SkillsStep from './form-steps/SkillsStep';
import DocumentsStep from './form-steps/DocumentsStep';
import ReviewStep from './form-steps/ReviewStep';

export interface JobFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  dateOfBirth: Date | undefined;
  gender: string;
  nationality: string;
  
  // Contact Information
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  linkedin: string;
  portfolio: string;
  
  // Experience
  experiences: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  
  // Education
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    graduationYear: string;
    gpa: string;
  }>;
  
  // Skills
  technicalSkills: string[];
  softSkills: string[];
  languages: Array<{
    language: string;
    proficiency: string;
  }>;
  
  // Documents
  resume: File | null;
  coverLetter: File | null;
  
  // Job Specific
  desiredPosition: string;
  expectedSalary: string;
  availabilityDate: Date | undefined;
  workType: string;
}

const JobForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
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

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
  };

  const updateFormData = (updates: Partial<JobFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
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
      </div>
    );
  }

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Job Application</h1>
          <p className="text-gray-600">Complete all steps to submit your application</p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
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
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="w-4 h-4" />
              Submit Application
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="flex items-center gap-2"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobForm;
