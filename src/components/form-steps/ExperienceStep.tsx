import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from 'lucide-react';
import { JobFormData } from '../JobForm';

interface ExperienceStepProps {
  formData: JobFormData;
  updateFormData: (updates: Partial<JobFormData>) => void;
}

const ExperienceStep: React.FC<ExperienceStepProps> = ({ formData, updateFormData }) => {
  const addExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    updateFormData({
      experiences: [...formData.experiences, newExperience]
    });
  };

  const removeExperience = (id: string) => {
    updateFormData({
      experiences: formData.experiences.filter(exp => exp.id !== id)
    });
  };

  // ✅ updated to allow updating one field OR multiple fields
  const updateExperience = (
    id: string,
    fieldOrUpdates: string | Partial<typeof formData.experiences[0]>,
    value?: any
  ) => {
    updateFormData({
      experiences: formData.experiences.map(exp => {
        if (exp.id !== id) return exp;

        if (typeof fieldOrUpdates === "string") {
          return { ...exp, [fieldOrUpdates]: value };
        } else {
          return { ...exp, ...fieldOrUpdates };
        }
      })
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Work Experience</h3>
        <Button onClick={addExperience} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {formData.experiences.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-gray-500 text-center">
              No work experience added yet. Click "Add Experience" to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {formData.experiences.map((experience, index) => (
            <Card key={experience.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-base">Experience #{index + 1}</CardTitle>
                <Button
                  onClick={() => removeExperience(experience.id)}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Company + Position */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Company Name *</Label>
                    <Input
                      value={experience.company}
                      onChange={(e) =>
                        updateExperience(experience.id, 'company', e.target.value)
                      }
                      placeholder="Company name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Position/Title *</Label>
                    <Input
                      value={experience.position}
                      onChange={(e) =>
                        updateExperience(experience.id, 'position', e.target.value)
                      }
                      placeholder="Job title"
                      required
                    />
                  </div>
                </div>

                {/* Start + End Dates */}
                <div
                  className={`grid grid-cols-1 ${!experience.current ? "md:grid-cols-2" : ""} gap-4`}
                >
                  <div className="space-y-2">
                    <Label>Start Date *</Label>
                    <Input
                      type="month"
                      value={experience.startDate}
                      onChange={(e) =>
                        updateExperience(experience.id, 'startDate', e.target.value)
                      }
                      required
                    />
                  </div>

                  {/* Hide End Date if current */}
                  {!experience.current && (
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input
                        type="month"
                        value={experience.endDate}
                        onChange={(e) =>
                          updateExperience(experience.id, 'endDate', e.target.value)
                        }
                      />
                    </div>
                  )}
                </div>

                {/* Current job checkbox */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`current-${experience.id}`}
                    checked={!!experience.current}
                    onCheckedChange={(checked) => {
                      const isChecked = checked === true;
                      updateExperience(experience.id, {
                        current: isChecked,
                        endDate: isChecked ? "" : experience.endDate, // clear if checked
                      });
                    }}
                  />
                  <Label htmlFor={`current-${experience.id}`}>I currently work here</Label>
                </div>

                {/* Job description */}
                <div className="space-y-2">
                  <Label>Job Description</Label>
                  <Textarea
                    value={experience.description}
                    onChange={(e) =>
                      updateExperience(experience.id, 'description', e.target.value)
                    }
                    placeholder="Describe your responsibilities and achievements..."
                    rows={3}
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

export default ExperienceStep;
