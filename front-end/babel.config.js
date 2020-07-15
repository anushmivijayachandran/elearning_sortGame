module.exports = function babelConfig(api) {
  api.cache.forever();
  return {
    babelrcRoots: [
      // Keep the root as a root
      ".",
      // Also consider monorepo packages "root" and load their .babelrc files.
      "./packages/*",
    ],
    presets: [
      [
        "@babel/env",
        {
          modules: false,
          useBuiltIns: "usage",
          targets: {
            browsers: ["> 1%"],
          },
        },
      ],
      "@babel/react",
    ],
    env: {
      test: {
        presets: [
          [
            "@babel/env",
            {
              useBuiltIns: "usage",
              targets: {
                browsers: ["> 1%"],
              },
            },
          ],
          "@babel/react",
        ],
      },
    },
  };
};
