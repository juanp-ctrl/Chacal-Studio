import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // reactCompiler: true, // Commenting out if not using experimental compiler, or keep if established. 
  // keeping existing config but adding images
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
