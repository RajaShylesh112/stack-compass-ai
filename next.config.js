/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_API_URL || 'https://your-domain.replit.app'
      : 'http://localhost:5000',
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'production' 
          ? `${process.env.API_URL || 'http://localhost:5000'}/api/:path*`
          : 'http://localhost:5000/api/:path*',
      },
    ];
  },
  // Ensure proper network binding for Replit
  serverExternalPackages: [],
  // Force Next.js to bind to 0.0.0.0
  experimental: {
    serverComponentsExternalPackages: [],
  },
}

export default nextConfig