
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X } from 'lucide-react';
import { JobFormData } from '../JobForm';

interface SkillsStepProps {
  formData: JobFormData;
  updateFormData: (updates: Partial<JobFormData>) => void;
}

const SkillsStep: React.FC<SkillsStepProps> = ({ formData, updateFormData }) => {
  const [newTechnicalSkill, setNewTechnicalSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [newLanguageProficiency, setNewLanguageProficiency] = useState('');

  const addTechnicalSkill = () => {
    if (newTechnicalSkill.trim() && !formData.technicalSkills.includes(newTechnicalSkill.trim())) {
      updateFormData({
        technicalSkills: [...formData.technicalSkills, newTechnicalSkill.trim()]
      });
      setNewTechnicalSkill('');
    }
  };

  const removeTechnicalSkill = (skill: string) => {
    updateFormData({
      technicalSkills: formData.technicalSkills.filter(s => s !== skill)
    });
  };

  const addSoftSkill = () => {
    if (newSoftSkill.trim() && !formData.softSkills.includes(newSoftSkill.trim())) {
      updateFormData({
        softSkills: [...formData.softSkills, newSoftSkill.trim()]
      });
      setNewSoftSkill('');
    }
  };

  const removeSoftSkill = (skill: string) => {
    updateFormData({
      softSkills: formData.softSkills.filter(s => s !== skill)
    });
  };

  const addLanguage = () => {
    if (newLanguage.trim() && newLanguageProficiency) {
      const existingLanguage = formData.languages.find(l => l.language === newLanguage.trim());
      if (!existingLanguage) {
        updateFormData({
          languages: [...formData.languages, {
            language: newLanguage.trim(),
            proficiency: newLanguageProficiency
          }]
        });
        setNewLanguage('');
        setNewLanguageProficiency('');
      }
    }
  };

  const removeLanguage = (language: string) => {
    updateFormData({
      languages: formData.languages.filter(l => l.language !== language)
    });
  };

  return (
    <div className="space-y-6">
      {/* Technical Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Technical Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newTechnicalSkill}
              onChange={(e) => setNewTechnicalSkill(e.target.value)}
              placeholder="Add a technical skill..."
              onKeyPress={(e) => e.key === 'Enter' && addTechnicalSkill()}
            />
            <Button onClick={addTechnicalSkill} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {formData.technicalSkills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {skill}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-red-600"
                  onClick={() => removeTechnicalSkill(skill)}
                />
              </Badge>
            ))}
          </div>
          
          {formData.technicalSkills.length === 0 && (
            <p className="text-gray-500 text-sm">No technical skills added yet.</p>
          )}
        </CardContent>
      </Card>

      {/* Soft Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Soft Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newSoftSkill}
              onChange={(e) => setNewSoftSkill(e.target.value)}
              placeholder="Add a soft skill..."
              onKeyPress={(e) => e.key === 'Enter' && addSoftSkill()}
            />
            <Button onClick={addSoftSkill} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {formData.softSkills.map((skill, index) => (
              <Badge key={index} variant="outline" className="flex items-center gap-1">
                {skill}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-red-600"
                  onClick={() => removeSoftSkill(skill)}
                />
              </Badge>
            ))}
          </div>
          
          {formData.softSkills.length === 0 && (
            <p className="text-gray-500 text-sm">No soft skills added yet.</p>
          )}
        </CardContent>
      </Card>

      {/* Languages */}
      <Card>
        <CardHeader>
          <CardTitle>Languages</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              placeholder="Language name..."
              className="flex-1"
            />
            <Select value={newLanguageProficiency} onValueChange={setNewLanguageProficiency}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Proficiency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="native">Native</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={addLanguage} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            {formData.languages.map((lang, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="font-medium">{lang.language}</span>
                <div className="flex items-center gap-2">
                  <Badge variant="default">{lang.proficiency}</Badge>
                  <X
                    className="w-4 h-4 cursor-pointer hover:text-red-600"
                    onClick={() => removeLanguage(lang.language)}
                  />
                </div>
              </div>
            ))}
          </div>
          
          {formData.languages.length === 0 && (
            <p className="text-gray-500 text-sm">No languages added yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillsStep;
