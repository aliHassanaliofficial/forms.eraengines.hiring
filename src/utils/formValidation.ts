
import { JobFormData } from '@/components/JobForm';

export const validatePersonalInfo = (formData: JobFormData): boolean => {
  return !!(
    formData.firstName.trim() &&
    formData.lastName.trim() &&
    formData.dateOfBirth &&
    formData.gender
  );
};

export const validateContactInfo = (formData: JobFormData): boolean => {
  return !!(
    formData.email.trim() &&
    formData.phone.trim() &&
    formData.address.trim() &&
    formData.city.trim() &&
    formData.state.trim() &&
    formData.zipCode.trim() &&
    formData.linkedin.trim()
  );
};

export const validateExperience = (formData: JobFormData): boolean => {
  // Experience step is optional, so always return true
  return true;
};

export const validateEducation = (formData: JobFormData): boolean => {
  // Education step is optional, so always return true
  return true;
};

export const validateSkills = (formData: JobFormData): boolean => {
  // Skills step is optional, so always return true
  return true;
};

export const validateDocuments = (formData: JobFormData): boolean => {
  // Documents step is optional, so always return true
  if (!formData.resume && !formData.coverLetter) {
    return false; // At least one document must be uploaded
  }
  return true;
};

export const validateReview = (formData: JobFormData): boolean => {
  // Review step just needs all previous steps to be valid
  return validatePersonalInfo(formData) && validateContactInfo(formData);
};

export const getStepValidation = (stepIndex: number, formData: JobFormData): boolean => {
  switch (stepIndex) {
    case 0: return validatePersonalInfo(formData);
    case 1: return validateContactInfo(formData);
    case 2: return validateExperience(formData);
    case 3: return validateEducation(formData);
    case 4: return validateSkills(formData);
    case 5: return validateDocuments(formData);
    case 6: return validateReview(formData);
    default: return false;
  }
};
