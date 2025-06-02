
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { JobFormData } from '../JobForm';
import { format } from 'date-fns';

interface ReviewStepProps {
  formData: JobFormData;
  updateFormData: (updates: Partial<JobFormData>) => void;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ formData }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">Review Your Application</h3>
        <p className="text-gray-600">Please review all information before submitting</p>
      </div>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}
            </div>
            <div>
              <span className="font-medium">Date of Birth:</span> {formData.dateOfBirth ? format(formData.dateOfBirth, 'PPP') : 'Not provided'}
            </div>
            <div>
              <span className="font-medium">Gender:</span> {formData.gender || 'Not specified'}
            </div>
            <div>
              <span className="font-medium">Nationality:</span> {formData.nationality || 'Not provided'}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-medium">Email:</span> {formData.email}
            </div>
            <div>
              <span className="font-medium">Phone:</span> {formData.phone}
            </div>
            <div className="md:col-span-2">
              <span className="font-medium">Address:</span> {formData.address}, {formData.city}, {formData.state} {formData.zipCode}
            </div>
            {formData.linkedin && (
              <div>
                <span className="font-medium">LinkedIn:</span> {formData.linkedin}
              </div>
            )}
            {formData.portfolio && (
              <div>
                <span className="font-medium">Portfolio:</span> {formData.portfolio}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Work Experience */}
      <Card>
        <CardHeader>
          <CardTitle>Work Experience</CardTitle>
        </CardHeader>
        <CardContent>
          {formData.experiences.length === 0 ? (
            <p className="text-gray-500">No work experience provided</p>
          ) : (
            <div className="space-y-4">
              {formData.experiences.map((exp, index) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{exp.position}</h4>
                      <p className="text-gray-600">{exp.company}</p>
                      <p className="text-sm text-gray-500">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </p>
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-sm text-gray-700 mt-2">{exp.description}</p>
                  )}
                  {index < formData.experiences.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader>
          <CardTitle>Education</CardTitle>
        </CardHeader>
        <CardContent>
          {formData.education.length === 0 ? (
            <p className="text-gray-500">No education provided</p>
          ) : (
            <div className="space-y-4">
              {formData.education.map((edu, index) => (
                <div key={edu.id}>
                  <h4 className="font-medium">{edu.degree} in {edu.field}</h4>
                  <p className="text-gray-600">{edu.institution}</p>
                  <p className="text-sm text-gray-500">Graduated: {edu.graduationYear}</p>
                  {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                  {index < formData.education.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Skills & Languages</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Technical Skills</h4>
            <div className="flex flex-wrap gap-2">
              {formData.technicalSkills.length === 0 ? (
                <p className="text-gray-500 text-sm">No technical skills provided</p>
              ) : (
                formData.technicalSkills.map((skill, index) => (
                  <Badge key={index} variant="secondary">{skill}</Badge>
                ))
              )}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Soft Skills</h4>
            <div className="flex flex-wrap gap-2">
              {formData.softSkills.length === 0 ? (
                <p className="text-gray-500 text-sm">No soft skills provided</p>
              ) : (
                formData.softSkills.map((skill, index) => (
                  <Badge key={index} variant="outline">{skill}</Badge>
                ))
              )}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Languages</h4>
            {formData.languages.length === 0 ? (
              <p className="text-gray-500 text-sm">No languages provided</p>
            ) : (
              <div className="space-y-1">
                {formData.languages.map((lang, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{lang.language}</span>
                    <Badge variant="default">{lang.proficiency}</Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Position & Documents */}
      <Card>
        <CardHeader>
          <CardTitle>Position & Documents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-medium">Desired Position:</span> {formData.desiredPosition || 'Not specified'}
            </div>
            <div>
              <span className="font-medium">Expected Salary:</span> {formData.expectedSalary || 'Not specified'}
            </div>
            <div>
              <span className="font-medium">Availability:</span> {formData.availabilityDate ? format(formData.availabilityDate, 'PPP') : 'Not specified'}
            </div>
            <div>
              <span className="font-medium">Work Type:</span> {formData.workType || 'Not specified'}
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-2">
            <div>
              <span className="font-medium">Resume:</span> {formData.resume ? formData.resume.name : 'Not uploaded'}
            </div>
            <div>
              <span className="font-medium">Cover Letter:</span> {formData.coverLetter ? formData.coverLetter.name : 'Not uploaded'}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewStep;
