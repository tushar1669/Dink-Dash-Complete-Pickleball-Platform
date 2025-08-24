/** @type {import('next').NextConfig} */
const nextConfig = {
  // Do NOT use `output: 'export'` here — we want the Node server (stable in Bolt)
  eslint: { ignoreDuringBuilds: true },
  images: { unoptimized: true },
  webpack: (config, { dev }) => {
    if (dev) {
      // keep cache in memory to avoid ENOENT on ephemeral fs
      config.cache = { type: 'memory' };
    }
    return config;
  },
};

export default nextConfig;
