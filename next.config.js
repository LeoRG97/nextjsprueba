// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

module.exports = {
  reactStrictMode: false,
  webpack5: true,
  images: {
    domains: [
      'ilovet-app.s3.us-east-2.amazonaws.com',
      'everis-resources.s3.us-east-2.amazonaws.com',
      'main.d27nm0rha6zups.amplifyapp.com',
    ],
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    BASE_URL: process.env.BASE_URL,
    BUCKET_URL: process.env.BUCKET_URL,
  },
};
