export interface ProjectData {
    id: string;
    name: string;
    description: string;
    techStack: string[];
    links: {
        live?: string;
        code?: string;
    };
}

export interface PortfolioData {
    personal: {
        displayName: string;
        fullName: string;
        titles: string[];
        location: {
            city: string;
            country: string;
            coordinates: { lat: string; lng: string };
            timezone: string;
        };
        socials: Array<{
            name: string;
            url: string;
            icon: string;
        }>;
    };
    technologies: string[];
    focusAreas: string[];
    projects: ProjectData[];
}

const portfolio: PortfolioData = {
    personal: {
        displayName: "NKVTD",
        fullName: "TOME GJORGIEV",
        titles: [
            "B.Sc. in Software Engineering and Information Technologies @ FCSE",
        ],
        location: {
            city: "SKOPJE",
            country: "MK",
            coordinates: { lat: "41.9965° N", lng: "21.4314° E" },
            timezone: "Europe/Skopje",
        },
        socials: [
            {
                name: "GitHub",
                url: "https://github.com/nkvtd",
                icon: "LogoGithub",
            },
            {
                name: "Discord",
                url: "https://discord.com/users/357221068823330816",
                icon: "LogoDiscord",
            },
            {
                name: "Email",
                url: "mailto:gjorgievtome@outlook.com",
                icon: "Mail",
            },
            {
                name: "LinkedIn",
                url: "https://www.linkedin.com/in/tome-gjorgiev-988812274/",
                icon: "LogoLinkedin",
            },
            {
                name: "Steam",
                url: "https://steamcommunity.com/id/nvkvd",
                icon: "LogoSteam",
            },
        ],
    },
    technologies: [
        "GIT",
        "DOCKER",
        "KUBERNETES",
        "CLOUDFLARE",
        "POSTGRES",
        "NODEJS",
        "DJANGO",
        "SPRING BOOT",
        "ASP.NET",
        "VIKE",
        "VUE",
        "REACT",
        "TAILWIND",
    ],
    focusAreas: [
        "FULL-STACK DEVELOPMENT",
        "INFRASTRUCTURE AUTOMATION & DEVOPS",
        "CONTAINERIZATION & ORCHESTRATION",
        "RELATIONAL DATABASES & OBJECT-ORIENTED DESIGN",
    ],
    projects: [
        {
            id: "ekonstat",
            name: "EkonStat",
            description:
                "Tools and utilities for collecting online-available economic and financial data in Macedonia ",
            techStack: [
                "NODEJS",
                "POSTGRES",
                "DOCKER",
                "KUBERNETES",
                "CLOUDFLARE",
                "HONO",
                "DRIZZLE",
                "VIKE",
                "VUE",
                "TAILWIND",
            ],
            links: {
                live: "https://ekonstat.nkvtd.com/",
                code: "https://github.com/nkvtd/EkonStat-Core",
            },
        },
        {
            id: "pc-forge",
            name: "pc-forge",
            description:
                "Web application for creating computer builds with different components and compatibility matrices",
            techStack: [
                "NODEJS",
                "POSTGRES",
                "DOCKER",
                "VIKE",
                "HONO",
                "TELEFUNC",
                "DRIZZLE",
                "REACT",
                "MATERIAL UI",
            ],
            links: { code: "https://github.com/nkvtd/pc-forge" },
        },
        {
            id: "homepage",
            name: "Homepage",
            description: "The very website you are currently on!",
            techStack: ["NODEJS", "VIKE", "VUE", "TAILWIND"],
            links: { code: "https://github.com/nkvtd/homepage" },
        },
    ],
};

export function usePortfolio(): PortfolioData {
    return portfolio;
}
