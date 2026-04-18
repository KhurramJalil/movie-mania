/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    //output: 'export',       // Required for GitHub Pages (Static Site Generation)
    basePath: '/movie-mania', // Change this to your actual repository name
    images: {
        unoptimized: true, // Keep this for your static export
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'image.tmdb.org',
                pathname: '/**', // Matches all paths on this host
            },
            {
                protocol: 'https',
                hostname: 'www.fillmurray.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'www.themoviedb.org',
                pathname: '/**',
            },
        ],
    },
};

module.exports = nextConfig;