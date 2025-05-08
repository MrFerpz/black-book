import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://xojkgyryuzebqbbahcbh.supabase.co/**')],
  },
  devIndicators: false
  /* config options here */
};

export default nextConfig;
