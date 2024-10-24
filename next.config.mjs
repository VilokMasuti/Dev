/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*', // Allowed hostname
        port: '', // No specific port
        pathname: '/**', // Allow all paths on this domain
      },
      {
        protocol: 'http',
        hostname: '*', // Allowed hostname
        port: '', // No specific port
        pathname: '/**', // Allow all paths on this domain
      },
      // You can add more domains here if needed
    ],
  },
}

export default nextConfig
