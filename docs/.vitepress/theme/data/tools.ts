export interface ToolItem {
    name: string
    desc: string
    stat: string
}

export interface ToolCategory {
    id: string
    title: string
    icon: string
    items: ToolItem[]
}

export const toolsData: ToolCategory[] = [
    {
        id: 'LANGUAGES_CORE',
        title: 'Languages_&_Core',
        icon: 'i-carbon-code',
        items: [
            { name: 'JavaScript', desc: 'The Web Core', stat: 'Versatility: MAX' },
            { name: 'TypeScript', desc: 'Type Safety Module', stat: 'Proficiency: 100%' },
            { name: 'Rust', desc: 'Solana Dev', stat: 'Performance: BLAZING' },
            { name: 'Go (Golang)', desc: 'Backend Systems', stat: 'Concurrency: HIGH' },
            { name: 'SQL', desc: 'Data Querying', stat: 'Complexity: MASTERED' }
        ]
    },
    {
        id: 'FRAMEWORKS_LIBS',
        title: 'Frameworks_&_Libs',
        icon: 'i-carbon-code-reference',
        items: [
            { name: 'Vue 3', desc: 'Frontend Core', stat: 'Reactivity: HIGH' },
            { name: 'Nuxt', desc: 'Fullstack Vue', stat: 'SEO: OPTIMIZED' },
            { name: 'Node.js', desc: 'Runtime Environment', stat: 'Scale: MASSIVE' },
            { name: 'Express.js', desc: 'Backend Framework', stat: 'Middleware: FLEXIBLE' },
            { name: 'Tailwind CSS', desc: 'Style Engine', stat: 'Velocity: MAX' },
            { name: 'React', desc: 'UI Library', stat: 'Popularity: HIGH' },
            { name: 'React Native (Expo)', desc: 'Mobile Apps', stat: 'Platform: CROSS' },
            { name: 'Tauri', desc: 'Desktop Apps', stat: 'Size: TINY' },
            { name: 'crxjs', desc: 'Web Extensions', stat: 'Integration: SEAMLESS' }
        ]
    },
    {
        id: 'HARDWARE',
        title: 'Hardware_Unit',
        icon: 'i-carbon-screen',
        items: [
            { name: 'MI Gaming Laptop', desc: 'Primary Battle Station', stat: 'Power: UNLEASHED' },
            { name: 'HP Probook 440 G5', desc: 'Portable Unit', stat: 'Mobility: HIGH' },
            { name: 'Eageat 2.4GHz Mouse', desc: 'Wireless Control', stat: 'Latency: LOW' },
            { name: 'Mech Keyboard Slim', desc: '2.4GHz Wireless', stat: 'Click: TACTILE' }
        ]
    },
    {
        id: 'SOFTWARE',
        title: 'Software_Stack',
        icon: 'i-carbon-gui',
        items: [
            { name: 'VS Code', desc: 'Code Editor', stat: 'Extensions: LOADED' },
            { name: 'Cursor', desc: 'AI-First Editor', stat: 'Intelligence: AGENTIC' },
            { name: 'Antigravity Pro', desc: 'Advanced Tooling', stat: 'Capability: LIMITLESS' },
            { name: 'Windows 11 / Linux', desc: 'OS Environment', stat: 'Stability: HYBRID' },
            { name: 'Chrome', desc: 'Web Browser', stat: 'DevTools: OPEN' },
            { name: 'Figma', desc: 'Design Tool', stat: 'Pixels: ALIGNED' }
        ]
    },
    {
        id: 'AUDIO_GEAR',
        title: 'Audio_Modules',
        icon: 'i-carbon-headset',
        items: [
            { name: 'Edifier W800BT Plus', desc: 'Over-Ear Audio', stat: 'Bass: DEEP' },
            { name: 'Redmi Buds 6 Play', desc: 'Compact Audio', stat: 'Portable: TRUE' }
        ]
    }
]
