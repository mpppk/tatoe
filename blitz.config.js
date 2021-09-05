const { sessionMiddleware, simpleRolesIsAuthorized } = require("blitz")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

const newCacheHeader = (maxAge) => {
  return {
    key: "Cache-Control",
    value: `public, max-age=${maxAge}`,
  }
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
        headers: [newCacheHeader(3600)],
      },
      {
        source: "/rankings/:ranking*",
        headers: [newCacheHeader(3600)],
      },
      {
        source: "/users/:user*",
        headers: [newCacheHeader(3600)],
      },
      {
        source: "/api/rankings/:queries*",
        headers: [newCacheHeader(60)],
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
