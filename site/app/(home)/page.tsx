import Link from 'next/link';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { Starfield } from '@/components/starfield';
import { TypewriterDemo } from '@/components/typewriter-demo';

export default function HomePage() {
  return (
    <main className="relative mx-auto flex min-h-[calc(100vh-3.5rem)] w-full max-w-2xl flex-col justify-center px-6 pb-16 pt-8 sm:py-16 lg:max-w-5xl">
      <Starfield />

      <div className="w-fit rounded-xl bg-fd-background/60 px-1 py-1 backdrop-blur-sm">
        <h1 className="font-mono text-6xl font-bold tracking-tight text-white sm:text-8xl">fx</h1>
        <p className="mt-2 font-mono text-fd-muted-foreground sm:text-xl">
          {'// currency math in JS and React, without the headache.'}
        </p>
      </div>

      <div className="mt-8 max-w-sm sm:text-lg">
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
        className="mt-6 w-fit rounded-md bg-fd-primary px-6 py-3 font-mono font-semibold text-fd-primary-foreground hover:opacity-90 sm:px-8 sm:py-4 sm:text-lg"
      >
        Get Started
      </Link>

      <div className="mt-10">
        <TypewriterDemo />
      </div>
    </main>
  );
}
