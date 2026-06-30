/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.counselorscafe.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/api/*', '/admin/*', '/_next/*'] },
    ],
    additionalSitemaps: [
      'https://www.counselorscafe.com/sitemap.xml',
    ],
  },
  exclude: ['/404', '/500'],
  generateIndexSitemap: true,
  outDir: 'public',
};