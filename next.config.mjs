/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: process.env.NEXT_PUBLIC_HOST_NAME,
            },
            {
                protocol: 'http',
                hostname: process.env.NEXT_PUBLIC_IMAGE_HOST_NAME,
            },
        ],
    },
};

export default nextConfig;
