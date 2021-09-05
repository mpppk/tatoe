const { sessionMiddleware, simpleRolesIsAuthorized } = require("blitz")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})
const cacheHeader = {
  key: "Cache-Control",
  value: "public, max-age3600",
}

const config = {
  middleware: [
    sessionMiddleware({
      isAuthorized: simpleRolesIsAuthorized,
    }),
  ],
  async headers() {
    return [
      {
        source: "/",
        headers: [cacheHeader],
      },
      {
        source: "/rankings/:ranking*",
        headers: [cacheHeader],
      },
      {
        source: "/users/:user*",
        headers: [cacheHeader],
      },
    ]
  },
  /* Uncomment this to customize the webpack config
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    return config
  },
  */
}

// module.exports = config
module.exports = withBundleAnalyzer(config)
