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
            { value: "django-developer", label: "(Intern) DJango Developer - beginner/intermediate - (2 Positions)" },
            { value: "django-api-developer", label: "(Intern) DJango API Developer - beginner/intermediate - (1 Position)" },
        ],
        workType: [
            { value: "remote", label: "Remote" },
            { value: "hybrid", label: "Hybrid" },
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
