/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_API_URL || 'https://your-domain.replit.app' // This can remain as a fallback for public URL
      : 'http://localhost:4000', // Changed for dev
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // For production, use NEXT_PUBLIC_API_URL. For dev, use localhost:4000.
        destination: process.env.NODE_ENV === 'production' 
          ? `${process.env.NEXT_PUBLIC_API_URL || 'https://your-domain.replit.app'}/api/:path*` // Use the public API URL for prod
          : 'http://localhost:4000/api/:path*', // Changed for dev
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