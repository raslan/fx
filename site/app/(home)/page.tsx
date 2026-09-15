import Link from 'next/link';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { TypewriterDemo } from '@/components/typewriter-demo';

export default function HomePage() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col items-center px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-fd-foreground sm:text-5xl">fx</h1>
      <p className="mt-4 max-w-xl text-lg text-fd-muted-foreground">
        currency math in JS and React, without the headache.
      </p>

      <div className="mt-8 w-full max-w-md text-left">
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
