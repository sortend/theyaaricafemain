export const runtime = 'edge';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Enable the new app directory (default in Next 14)
  experimental: {
    appDir: true,
  },
  // Allow absolute imports via tsconfig paths
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { fs: false, net: false, tls: false };
    }
    return config;
  }
};

export default nextConfig;
