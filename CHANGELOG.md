# Changelog

## [0.2.0](https://github.com/raslan/fx/compare/fx-v0.1.0...fx-v0.2.0) (2026-09-18)


### Features

* add ExpressionPlayground live-demo component ([d4d2922](https://github.com/raslan/fx/commit/d4d2922026eeeb278e13e5e326ab6ef523db1f1d))
* add generated Changelog page ([911c5f4](https://github.com/raslan/fx/commit/911c5f4a516cec68b982d10c95e1c72e117ada96))
* add landing page with live typewriter demo ([df12e92](https://github.com/raslan/fx/commit/df12e92725b3cd0f06fc4bdf896ec3183b66e8cb))
* add TanStack Table rates guide and RatesTable component ([3607c8f](https://github.com/raslan/fx/commit/3607c8f318dd087b7af5f515df261e2428ea9a78))
* **core:** add currency metadata and options list ([0672c58](https://github.com/raslan/fx/commit/0672c585341783adc3b219f56c5b484c22940241))
* **core:** add Dinero money math and formatting ([d1f98f4](https://github.com/raslan/fx/commit/d1f98f403afbe400f0f04f59167834e73bdda126))
* **core:** add provider-agnostic exchange-rate fetching ([650fcf6](https://github.com/raslan/fx/commit/650fcf6ab662f4b69748d03e3e294f5dce5f6622))
* **core:** add public barrel export for the core subpath ([76e4104](https://github.com/raslan/fx/commit/76e4104f62a543c08674a55ba8184c22fceb67c3))
* **core:** add shared domain types ([af1d6a2](https://github.com/raslan/fx/commit/af1d6a27e94405a0293a8e76924c09270264cfe8))
* **core:** port natural-language expression tokenizer/evaluator ([f481cc1](https://github.com/raslan/fx/commit/f481cc1ffba38f4b857f69a999b4a2f3129434ab))
* **core:** vendor hand-rolled ISO-4217 currency data table ([e67c4aa](https://github.com/raslan/fx/commit/e67c4aacd70b1d6d1f8ea1b1f3fbc76e455c36b9))
* polish landing hero visuals, fix duplicate docs nav link ([0165b7e](https://github.com/raslan/fx/commit/0165b7e3e83127afe2fb106f5c0b36fa7da9c5f1))
* **react:** add public barrel export for the react subpath ([d8b94ff](https://github.com/raslan/fx/commit/d8b94ff369e2ddca14f14e911ac35568d9c020b1))
* **react:** add zustand store with pluggable persistence adapter ([61e3f4b](https://github.com/raslan/fx/commit/61e3f4b56848a91685f8f219506552d712d1adf9))
* **react:** port useCurrency headless hook, fix override-currency refresh bug ([b4d0046](https://github.com/raslan/fx/commit/b4d0046e101fd5bcd55b6704c7a5bc0971ba3778))
* **react:** port useCurrency headless hook, fix override-currency refresh bug ([bee0801](https://github.com/raslan/fx/commit/bee0801089b3982f069e40a092fa434ff11218b1))
* **react:** port useDebounce hook ([88bb340](https://github.com/raslan/fx/commit/88bb3400bc520b984ee92b2c580f33d356749579))
* redesign landing page as a REPL-style hero ([75c374b](https://github.com/raslan/fx/commit/75c374bd803cc96b506cc9e8f6c0ab13e20c77e5))
* register MDX components (Tabs, Steps, ExpressionPlayground) ([27b0d1f](https://github.com/raslan/fx/commit/27b0d1fca41b725c99a576e220b73bc74b7329eb))
* scaffold Fumadocs docs site, remove Astro/Starlight ([39d266b](https://github.com/raslan/fx/commit/39d266bf3fea250715ef9e182f4e1c697239f944))
* wire typedoc-generated API reference into the Fumadocs content source ([f998831](https://github.com/raslan/fx/commit/f998831c61662ca94336e964a6fe509d385296b0))
* wire up the docs shell routes ([aff8466](https://github.com/raslan/fx/commit/aff8466159ff25ff9b73403fe673bf6fd8d0780f))


### Bug Fixes

* add homepage and bugs URL to package.json ([c74e04b](https://github.com/raslan/fx/commit/c74e04b13e6c7ebaec725685fc3c0aa317af13a6))
* add placeholder entry files so typecheck passes on a clean checkout ([247681a](https://github.com/raslan/fx/commit/247681a0a866bc5ea4748fafad7113014f9d222c))
* align root React devDependency with site's React 19, scope root vitest to src/ ([f11d2e5](https://github.com/raslan/fx/commit/f11d2e5fd7b48090469f23fc879bf5cd8c8a9f57))
* bump CI to Node 24, resolve pnpm/action-setup version conflict, add repository field ([da64cdf](https://github.com/raslan/fx/commit/da64cdfba4aedf7265435c6cb6a2c0dca532dfb3))
* give useDebounce's timer ref an explicit undefined initial value ([d23b2d9](https://github.com/raslan/fx/commit/d23b2d92b6853de4e2a11fbc7e8e72504b135428))
* landing page install snippet uses package-manager tabs ([b9de8ab](https://github.com/raslan/fx/commit/b9de8abc53708562de830b2dcb19467bd35554cb))
* pin @tanstack/react-table to v8, not v9's rewritten API ([afe57e7](https://github.com/raslan/fx/commit/afe57e77c0a90504d08fd22426cd7df506dd6c93))
* real theme/contrast/search/interactivity fixes, verified visually not just in the DOM ([35aea54](https://github.com/raslan/fx/commit/35aea54ccdd7a2ec20263be42c2a5eb1b9070c78))
* resolve tsup.config.ts type error against tsup's Options type ([d87be03](https://github.com/raslan/fx/commit/d87be0360d9e6f21c62742ab52142a6c7d7f4598))
* restore friendly currency names and controlled search input in RatesTable ([46b0d7e](https://github.com/raslan/fx/commit/46b0d7e9e5f056794fb9a3cad47a20fcd679caa8))
* restore test-file typecheck coverage lost by the typedoc tsconfig exclude ([05867d2](https://github.com/raslan/fx/commit/05867d22e640fcb15b31e940d123fabf8bf9d6fc))
* split content generation out of next build so Vercel deploys work ([6009f0c](https://github.com/raslan/fx/commit/6009f0c84e6a816d7bbe44a8272014e03731ae12))
* use the docs-family DocsLayout to match DocsPage ([a4ceb87](https://github.com/raslan/fx/commit/a4ceb87dae9a66d2c03385ae1aac74afc09a5c54))
* whole-branch review pass — workspace build, docs, types, lint, license ([aae37e5](https://github.com/raslan/fx/commit/aae37e5aa52b8a7f0552c4909b36e23923a2447c))
