const withThree = require('next-transpile-modules')([
  'three',
]);


module.exports = withThree({
  basePath: '/webgl-tweakin',
  assetPrefix: '/webgl-tweakin',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: "/_next/static/images",
          outputPath: "static/images/",
        }
      },
    });
    return config;
  },
//   exportTrailingSlash: true
});
