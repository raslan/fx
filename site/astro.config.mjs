import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import starlightTypeDoc, { typeDocSidebarGroup } from 'starlight-typedoc';

export default defineConfig({
  integrations: [
    starlight({
      title: '@raslan/fx',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/raslan/fx' },
      ],
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        {
          label: 'Guides',
          items: [
            { label: 'Getting Started', slug: 'getting-started' },
            { label: 'Expression Syntax', slug: 'concepts/expressions' },
          ],
        },
        typeDocSidebarGroup,
      ],
      plugins: [
        starlightTypeDoc({
          entryPoints: ['../src/core/index.ts', '../src/react/index.ts'],
          tsconfig: '../tsconfig.json',
        }),
      ],
    }),
  ],
});
