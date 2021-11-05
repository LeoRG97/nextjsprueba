module.exports = {
  reactStrictMode: false,
  webpack5: true,
  images: {
    domains: [
      'ilovet-app.s3.us-east-2.amazonaws.com',
      'everis-resources.s3.us-east-2.amazonaws.com',
    ],
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
};
