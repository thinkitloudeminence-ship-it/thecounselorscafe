// import { MetadataRoute } from 'next'

// export default function robots(): MetadataRoute.Robots {
//   return {
//     rules: {
//       userAgent: '*',
//       allow: '/',
//       disallow: ['/api/*', '/admin/*', '/_next/*'],
//     },
//     sitemap: 'https://counselorscafe.com/sitemap.xml',
//   }
// }

import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '/', // ❌ poori site block
    },
    sitemap: 'https://counselorscafe.com/sitemap.xml',
  }
}