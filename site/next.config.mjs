import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Dev-only: without this, Next.js blocks cross-origin dev/HMR resources
  // (JS, HMR websocket) when the site is reached via a LAN IP instead of
  // localhost, which breaks hydration — the page looks served but nothing
  // is interactive. Add any other LAN IP/hostname you use to reach the dev
  // server here.
  allowedDevOrigins: ['192.168.1.13'],
};

export default withMDX(config);
