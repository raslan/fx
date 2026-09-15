import { defineConfig } from 'tsup';

const shared = {
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  splitting: false,
  external: ['react'],
} as const;

export default defineConfig([
  {
    ...shared,
    entry: { index: 'src/core/index.ts' },
    // Framework-agnostic core bundle — no "use client" banner.
    clean: true,
  },
  {
    ...shared,
    entry: { 'react/index': 'src/react/index.ts' },
    // React consumers may import this from a Next.js App Router
    // server component graph; mark it client-only.
    banner: { js: '"use client";' },
    clean: false,
  },
]);
