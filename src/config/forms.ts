export interface FormConfig {
    id: string;
    title: string;
    companyName: string;
    companyWebsite: string;
    contactEmail: string;
    companyLogo: string;
    positions: {
        value: string;
        label: string;
        hasOther?: boolean;
    }[];
    workType: {
        value: string;
        label: string;
    }[];
    salary: {
        value: string;
        label: string;
    }[];
}

export const formsConfig: Record<string, FormConfig> = {
    "egi": {
        id: "egi",
        title: "Egypt Intelligence (EGI) Job Application Form",
        companyName: "Egypt Intelligence",
        companyWebsite: "https://egi.eraengines.com",
        contactEmail: "jobs@eraengines.com",
        companyLogo: "/EGILogo.png",
        positions: [
            { value: "AI-and-Data-Science-Instructor", label: "AI and Data Science Instructor" },
            { value: "CyberSecurity-Instructor", label: "Cyber Security Instructor (Red & Blue Team)" },
            { value: "other", label: "Other (For Future Available Positions)", hasOther: true },
        ],
        workType: [
            { value: "remotely", label: "Remotely (Cairo, Alexandria)" },
            { value: "Offline", label: "Offline(Alexandria)" },
        ],
        salary: [
            { value: "", label: "" }
        ],
    }
};

export const getFormConfig = (id: string): FormConfig | undefined => {
    return formsConfig[id];
};

export const defaultFormConfig: undefined = undefined;
