import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: produces a portable `out/` folder that Hostinger shared
  // hosting serves directly from public_html. No Node server needed. The
  // www -> apex redirect, HTTPS forcing, and HSTS are handled by .htaccess
  // (see public/.htaccess, shipped with the build).
  output: "export",
  poweredByHeader: false,
  images: {
    // Static export cannot use the on-demand image optimizer; all <Image>
    // usages already set `unoptimized`, this makes it the default.
    unoptimized: true,
  },
};

export default nextConfig;
