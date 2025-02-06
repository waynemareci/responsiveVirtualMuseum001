/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["192.168.2.45"],
    remotePatterns: [
      { protocol: "https", hostname: "i2.wp.com", port: "", pathname: "/**" },
      {
        protocol: "https",
        hostname: "hips.hearstapps.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "virtualmusem.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        port: "",
        pathname: "/images/**",
      },

      {
        protocol: "http",
        hostname: "192.168.2.45",
        port: "",
        pathname: "/**",
      },
    ],
  },
  serverExternalPackages: ["graphql"],
  
  env: {
    REACT_APP_AUTH0_DOMAIN: "dev-spxf3pmvngdhjouv.us.auth0.com",
    REACT_APP_AUTH0_CLIENT_ID: "YlqUnmoHJ1EpT8zgrt7aKPVYJ2fbRZGp",
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.experiments = {
      topLevelAwait: true,
      layers: true,
    };
    return config;
  },
};

export default nextConfig;
