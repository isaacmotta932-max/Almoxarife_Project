/** @type {import('next').NextConfig} */
const webpack = require('webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, { dev, isServer }) {
    config.plugins = config.plugins || [];
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.MY_FLAG': JSON.stringify('value')
      })
    );
    return config;
  }
}

module.exports = nextConfig;