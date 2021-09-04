const { sessionMiddleware, simpleRolesIsAuthorized } = require("blitz")

const cacheHeader = {
  key: "Cache-Control",
  value: "public, max-age3600",
}

module.exports = {
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
        source: "/rankings/*",
        headers: [cacheHeader],
      },
      {
        source: "/users/*",
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
