import Link from 'next/link';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { TypewriterDemo } from '@/components/typewriter-demo';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] w-full max-w-2xl flex-col justify-center px-6 py-16">
      <h1 className="font-mono text-6xl font-bold tracking-tight text-fd-foreground sm:text-7xl">
        fx
      </h1>
      <p className="mt-2 font-mono text-fd-muted-foreground">
        {'// currency math in JS and React, without the headache.'}
      </p>

      <div className="mt-8 max-w-sm">
        <Tabs items={['npm', 'pnpm', 'yarn', 'bun']}>
          <Tab value="npm">
            <code>npm install @aliraslan/fx</code>
          </Tab>
          <Tab value="pnpm">
            <code>pnpm add @aliraslan/fx</code>
          </Tab>
          <Tab value="yarn">
            <code>yarn add @aliraslan/fx</code>
          </Tab>
          <Tab value="bun">
            <code>bun add @aliraslan/fx</code>
          </Tab>
        </Tabs>
      </div>

      <Link
        href="/docs/getting-started"
        className="mt-8 w-fit rounded-md bg-fd-primary px-6 py-3 font-mono font-semibold text-fd-primary-foreground hover:opacity-90"
      >
        Get Started
      </Link>

      <div className="mt-16">
        <TypewriterDemo />
      </div>
    </main>
  );
}
