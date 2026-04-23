import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CounselorsCafe - Career Counselling Platform',
    short_name: 'CounselorsCafe',
    description: 'India\'s most trusted career counselling platform connecting students with verified expert counselors',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#EAB308',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}