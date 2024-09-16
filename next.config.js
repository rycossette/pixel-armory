/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.modules.push(__dirname);
    return config;
  },
  pageExtensions: ['js', 'jsx'], // Optional: if you want Next.js to recognize custom extensions like JSX
  trailingSlash: true, // Optional: to ensure URLs end with a slash (e.g., /about/)
  reactStrictMode: true, // Optional: enables React's Strict Mode in development for catching potential issues
  swcMinify: true, // Optional: enables SWC for faster builds and smaller bundles
};

module.exports = nextConfig;
