
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from 'lucide-react';
import { JobFormData } from '../JobForm';

interface EducationStepProps {
  formData: JobFormData;
  updateFormData: (updates: Partial<JobFormData>) => void;
}

const EducationStep: React.FC<EducationStepProps> = ({ formData, updateFormData }) => {
  const addEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      graduationYear: '',
      gpa: ''
    };
    updateFormData({
      education: [...formData.education, newEducation]
    });
  };

  const removeEducation = (id: string) => {
    updateFormData({
      education: formData.education.filter(edu => edu.id !== id)
    });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    updateFormData({
      education: formData.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Education</h3>
        <Button onClick={addEducation} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </Button>
      </div>

      {formData.education.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-gray-500 text-center">No education added yet. Click "Add Education" to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {formData.education.map((education, index) => (
            <Card key={education.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-base">Education #{index + 1}</CardTitle>
                <Button
                  onClick={() => removeEducation(education.id)}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Institution Name *</Label>
                    <Input
                      value={education.institution}
                      onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                      placeholder="University/School name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Degree *</Label>
                    <Input
                      value={education.degree}
                      onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                      placeholder="Bachelor's, Master's, PhD, etc."
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Field of Study *</Label>
                    <Input
                      value={education.field}
                      onChange={(e) => updateEducation(education.id, 'field', e.target.value)}
                      placeholder="Computer Science, Business, etc."
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Graduation Year *</Label>
                    <Input
                      type="number"
                      value={education.graduationYear}
                      onChange={(e) => updateEducation(education.id, 'graduationYear', e.target.value)}
                      placeholder="2024"
                      min="1950"
                      max="2030"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>GPA (Optional)</Label>
                  <Input
                    value={education.gpa}
                    onChange={(e) => updateEducation(education.id, 'gpa', e.target.value)}
                    placeholder="3.8/4.0"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationStep;
