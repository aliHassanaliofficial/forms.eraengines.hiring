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
    "monumbrella-interns": {
        id: "monumbrellla-jobs",
        title: "Monumbrellla Technologies",
        companyName: "Monumbrellla Technologies",
        companyWebsite: "https://monumbrellla.com",
        contactEmail: "jobs@monumbrellla.com",
        companyLogo: "/monumbrellaLogo.png",
        positions: [
            { value: "django-developer", label: "(Intern) DJango Developer - beginner/intermediate" },
            { value: "django-api-developer", label: "(Intern) DJango API Developer - beginner/intermediate" },
            { value: "data-analyst", label: "(Intern) Data Analyst - beginner/intermediate" },
            { value: "data-scientist", label: "(Intern) Data Scientist - beginner/intermediate" },
            { value: "software-architect", label: "(Intern) Software Architect - beginner/intermediate" },
            { value: "software-engineer", label: "(Intern) Software Engineer - beginner/intermediate" },
            { value: "software-sales", label: "(Intern) Software Sales - beginner/intermediate" },
            { value: "software-sales-manager", label: "(Intern) Software Sales Manager - beginner/intermediate" },
        ],
        workType: [
            { value: "remote", label: "Remote (Cairo, Alexandria)" },
            { value: "hybrid", label: "Hybrid (Alexandria)" },
        ],
        salary: [
            { value: "disabled", label: "Disabled" }
        ],
    }
};

export const getFormConfig = (id: string): FormConfig | undefined => {
    return formsConfig[id];
};

export const defaultFormConfig: undefined = undefined;
