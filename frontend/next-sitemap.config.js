/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: 'https://workinkorea.vercel.app',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 1,
  exclude: ['/sign-in', '/onboarding/**'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/sign-in', '/onboarding/**'],
      },
    ],
  },
};
