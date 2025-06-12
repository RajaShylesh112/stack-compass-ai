/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'vercel.app', 'vercel.com'],
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NEXT_PUBLIC_API_URL
          ? `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`
          : 'http://localhost:4000/api/:path*',
      },
    ];
  },
  experimental: {
    serverComponentsExternalPackages: ['@tanstack/react-query'],
  },
  compiler: {
    removeConsole: false,
  },
  output: 'standalone',
  // Disable static optimization for error pages
  trailingSlash: false,
  generateEtags: false,
};

export default nextConfig;