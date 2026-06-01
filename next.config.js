/** @type {import('next').NextConfig} */

// GitHub Pages serves a project site from https://<user>.github.io/<repo>/, so
// the build needs a base path of "/<repo>". The deploy workflow sets
// GITHUB_PAGES=true. Locally (and on a custom domain at the root) there is none.
// → Using a custom domain? Set GITHUB_PAGES unset / basePath '' and add a CNAME.
const repo = 'Portfolio'
const isPages = process.env.GITHUB_PAGES === 'true'

const nextConfig = {
  reactStrictMode: true,
  output: 'export', // static HTML export (GitHub Pages, Cloudflare Pages, Netlify…)
  poweredByHeader: false,
  basePath: isPages ? `/${repo}` : '',
  trailingSlash: true, // emits /path/index.html, which static hosts serve cleanly
  webpack: (config) => {
    // Windows + Node 22: webpack's persistent filesystem cache can't snapshot
    // resolved files (an fs.readlink regression, also patched by
    // scripts/fix-readlink.js), which prints a noisy build warning. Fall back to
    // the in-memory cache there. No effect on other platforms.
    if (process.platform === 'win32') config.cache = { type: 'memory' }
    return config
  },
}

module.exports = nextConfig
