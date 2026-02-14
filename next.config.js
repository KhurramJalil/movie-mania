/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'export',       // Required for GitHub Pages (Static Site Generation)
    basePath: '/movie-mania', // Change this to your actual repository name
    trailingSlash: true,  // Ensure trailing slash for GitHub Pages
    images: {
        unoptimized: true,    // Required for 'output: export'
        domains: ['image.tmdb.org', 'www.fillmurray.com', 'www.themoviedb.org'],
    },
};

module.exports = nextConfig;