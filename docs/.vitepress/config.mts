
import { defineConfig } from 'vitepress'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
    vite: {
        envDir: resolve(__dirname, '../../')
    },
    appearance: false,
    head: [
        ['script', {}, "document.documentElement.classList.add('dark')"]
    ],
    title: "Jimoh Sodiq",
    description: "A premium personal portfolio for a fullstack engineer.",
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Projects', link: '/projects' },
            { text: 'Blog', link: '/blog/' },
            { text: 'Uses', link: '/uses' },
        ],
        // logo: '/logo.png',
        siteTitle: 'Jimoh Sodiq',
        socialLinks: [
            { icon: 'github', link: 'https://www.github.com/jimoh-sodiq' },
            { icon: 'x', link: 'https://x.com/jimohsodiq_' },
            { icon: 'linkedin', link: 'https://www.linkedin.com/in/jimoh-sodiq-1664951a6' }
        ]
    }
})
