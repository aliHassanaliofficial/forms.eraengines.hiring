
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Upload, FileText, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from "@/lib/utils";
import { JobFormData } from '../JobForm';

interface DocumentsStepProps {
  formData: JobFormData;
  updateFormData: (updates: Partial<JobFormData>) => void;
}

const DocumentsStep: React.FC<DocumentsStepProps> = ({ formData, updateFormData }) => {
  const handleFileUpload = (field: 'resume' | 'coverLetter', file: File | null) => {
    updateFormData({ [field]: file });
  };

  const removeFile = (field: 'resume' | 'coverLetter') => {
    updateFormData({ [field]: null });
  };

  return (
    <div className="space-y-6">
      {/* Job Information */}
      <Card>
        <CardHeader>
          <CardTitle>Position Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="desiredPosition">Desired Position *</Label>
              <br />
              <Label>Work Type Preference</Label>
              <Select value={formData.desiredPosition} onValueChange={(value) => updateFormData({ desiredPosition: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select work type" />
                </SelectTrigger>
                <SelectContent>
                  ----- MERN Stack -----
                  <SelectItem value="mern-developer">MERN Stack Developer (3 Positions)</SelectItem>
                  <SelectItem value="mern-designer">MERN Designer (2 Positions)</SelectItem>
                  <SelectItem value="mern-project-manager">MERN Project Manager (1 Positions)</SelectItem>
                  ----- Web Developers -----
                  <SelectItem value="frontend-developer">Frontend Developer (2 Positions)</SelectItem>
                  <SelectItem value="backend-developer">Backend Developer (2 Positions)</SelectItem>
                  <SelectItem value="fullstack-developer">Fullstack Developer (2 Positions)</SelectItem>
                  ----- Databases Developers -----
                  <SelectItem value="database-designer">Database Designer (1 Position)</SelectItem>
                  <SelectItem value="data-analyst">Data Analyst (1 Position)</SelectItem>
                  ----- Databases Developers -----
                  <SelectItem value="database-administrator">Database Designer (1 Position)</SelectItem>
                  <SelectItem value="data-analyst">Data Analyst (1 Position)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expectedSalary">Expected Salary</Label>
              <Input
                id="expectedSalary"
                value={formData.expectedSalary}
                onChange={(e) => updateFormData({ expectedSalary: e.target.value })}
                placeholder="EGP"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Availability Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.availabilityDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.availabilityDate ? format(formData.availabilityDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.availabilityDate}
                    onSelect={(date) => updateFormData({ availabilityDate: date })}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Work Type Preference</Label>
              <Select value={formData.workType} onValueChange={(value) => updateFormData({ workType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select work type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Upload */}
      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Resume Upload */}
          <div className="space-y-2">
            <Label>Resume/CV *</Label>
            {formData.resume ? (
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium">{formData.resume.name}</span>
                  <span className="text-xs text-gray-500">
                    ({(formData.resume.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
                <Button
                  onClick={() => removeFile('resume')}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">Upload your resume (PDF, DOC, DOCX)</p>
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileUpload('resume', e.target.files?.[0] || null)}
                  className="max-w-xs mx-auto"
                />
              </div>
            )}
          </div>

          {/* Cover Letter Upload */}
          <div className="space-y-2">
            <Label>Cover Letter (Optional)</Label>
            {formData.coverLetter ? (
              <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">{formData.coverLetter.name}</span>
                  <span className="text-xs text-gray-500">
                    ({(formData.coverLetter.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
                <Button
                  onClick={() => removeFile('coverLetter')}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">Upload your cover letter (PDF, DOC, DOCX)</p>
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileUpload('coverLetter', e.target.files?.[0] || null)}
                  className="max-w-xs mx-auto"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentsStep;
