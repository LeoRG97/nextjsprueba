module.exports = {
  reactStrictMode: false,
  webpack5: false,
  images: {
    domains: ['ilovet-app.s3.us-east-2.amazonaws.com'],
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
};
