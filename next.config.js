/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org', 'www.fillmurray.com', 'www.themoviedb.org'],
  },
};

module.exports = nextConfig;
