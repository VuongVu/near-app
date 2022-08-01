// @ts-check

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        formats: ['image/avif', 'image/webp'],
    },
    swcMinify: true,
    webpack: config => {
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        };

        return config;
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

module.exports = withBundleAnalyzer(nextConfig);
