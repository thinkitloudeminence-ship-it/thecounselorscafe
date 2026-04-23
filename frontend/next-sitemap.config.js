/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://counselorscafe.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/api/*', '/admin/*', '/_next/*'] },
    ],
    additionalSitemaps: [
      'https://counselorscafe.com/sitemap.xml',
    ],
  },
  exclude: ['/404', '/500'],
  generateIndexSitemap: true,
  outDir: 'public',
};