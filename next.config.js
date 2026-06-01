/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // static HTML export, served at the root of ryanmikula.com
  poweredByHeader: false,
  trailingSlash: true, // emit /path/index.html, which static hosts serve cleanly
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
