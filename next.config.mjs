import withTwin from './utils/withTwin.mjs'

/**
 * @type {import('next').NextConfig}
 */
export default withTwin({
  reactStrictMode: true,
  env: {
    GITHUB_APP_CLIENT_SECRET: process.env.GITHUB_APP_CLIENT_SECRET,
    GITHUB_APP_CLIENT_ID: process.env.GITHUB_APP_CLIENT_ID,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL
  }
});