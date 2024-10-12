import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Pulse',
        short_name: "Pulse",
        description: "Collaboration and project management SaaS",
        start_url: '/home',
        display: 'standalone',
        background_color: '#eaf3ff',
        theme_color: '#eaf3ff',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
            {
                "src": "/icon-192.png",
                "sizes": "192x192",
                "type": "image/png"
            },
        ],
    }
}