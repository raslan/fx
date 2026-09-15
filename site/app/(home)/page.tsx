import Link from 'next/link';
import { TypewriterDemo } from '@/components/typewriter-demo';

export default function HomePage() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col items-center px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-fd-foreground sm:text-5xl">fx</h1>
      <p className="mt-4 max-w-xl text-lg text-fd-muted-foreground">
        currency math in JS and React, without the headache.
      </p>

      <pre className="mt-8 w-full max-w-md overflow-x-auto rounded-md border border-fd-border bg-fd-card p-4 text-left font-mono text-sm text-fd-card-foreground">
        <code>npm install @aliraslan/fx</code>
      </pre>

      <TypewriterDemo />

      <Link
        href="/docs/getting-started"
        className="rounded-md bg-fd-primary px-6 py-3 font-semibold text-fd-primary-foreground hover:opacity-90"
      >
        Get Started
      </Link>
    </main>
  );
}
