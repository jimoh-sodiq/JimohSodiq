export interface Project {
    year: string
    title: string
    description: string
    tags: string[]
    images: string[]
    link?: string
}

export const projects: Project[] = [
    {
        title: "SimplifiedIQ",
        description: "AI-powered assessment platform for tamper-proof testing and certifications. Features automated grading, identity verification, and scalable delivery.",
        tags: ["Vue", "React", "Tauri", "Crxjs"],
        images: ["/projects/simplifiediq.png", "/projects/simplifiediq-2.png", "/projects/simplifiediq-3.png"],
        year: "2025"
    },
    {
        title: "Embervale",
        description: "A multi-platform and free Twitch RPG extension that gamifies the viewing experience. Allows viewers to quest together with streamers in an interactive overlay.",
        tags: ["Vue", "RPG", "Gaming"],
        images: ["/projects/embervale-1.png", "/projects/embervale-2.png", "/projects/embervale-3.png"],
        year: "2024"
    },
    {
        title: "Seamailer",
        description: "All-in-one email marketing platform to automate campaigns and scale revenue. Features drag-and-drop builder, audience segmentation, and automated funnels.",
        tags: ["Vue", "Node.js", "Automation"],
        images: ["/projects/seamailer-1.png", "/projects/seamailer-2.png", "/projects/seamailer-3.png"],
        year: "2024"
    },
    {
        title: "The Barakah Lifestyle NG",
        description: "Vibrant community fostering spiritual growth, personal development, and sisterhood among Muslim women. Provides a safe space for learning and growing in faith.",
        tags: ["Nuxt", "Typescript", "Ghost_cms"],
        images: ["/projects/tblt-1.png", "/projects/tblt-2.png", "/projects/tblt-3.png"],
        year: "2024"
    },
    {
        title: "Noja360",
        description: "An all-in-one business management solution. Features tools for customer tracking, invoicing, and employee oversight in a single integrated dashboard.",
        tags: ["Nuxt", "Typescript", "PWA"],
        images: ["/projects/noja360-1.png", "/projects/noja360-2.png", "/projects/noja360-3.png"],
        year: "2022"
    },
    {
        title: "Vue Patterns",
        description: "A comprehensive collection of essential patterns, tips, and best practices for Vue.js development. Provides practical examples and code snippets for common tasks.",
        tags: ["Vue.js", "Vitepress", "Typescript"],
        images: ["/projects/vuepatterns-1.png", "/projects/vuepatterns-2.png", "/projects/vuepatterns-3.png"],
        year: "2022"
    },
    {
        title: "Traq",
        description: "A comprehensive accounting solution designed to make financial management easy and effective for businesses.",
        tags: ["FINTECH", "ACCOUNTING", "SAAS", "WEB APP"],
        images: ["/projects/traq/hero.png", "/projects/traq/features.png"],
        year: "2021"
    },
]
