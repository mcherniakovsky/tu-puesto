/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
      },
      
};


export default nextConfig;
