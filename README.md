# Tayseer Laz — portfolio

React + Vite + TypeScript. One page with full-screen case studies for Hader AI, Lancaster Hotels,
OmniSign and the Warehouse UI Kit. All copy lives in `src/content.ts`; screenshots live in `public/`.

```
pnpm install
./start-dev.sh      # or: pnpm dev
```

If the browser shows a white page or "site can't be reached", the dev server is not running.
Run `./start-dev.sh` in a terminal and leave that window open. The server binds to 127.0.0.1:5173,
which `localhost` resolves to.

Production builds render the homepage and `/work/<slug>/` case studies as HTML
from the existing React components, then hydrate them for interaction. Run:

```
pnpm build
pnpm check:seo
pnpm lint
pnpm preview
```

`src/seo.ts` is the route and metadata registry; project descriptions come from
`src/content.ts`. The build generates `dist/sitemap.xml` and the optional
`dist/llms.txt` index from that registry. Deploy the entire `dist/` folder,
including `.htaccess`, `404.html`, and the generated `work/` directories.
The existing main-branch deployment workflow already runs this build.

See [the SEO audit](docs/SEO-AUDIT.md) for evidence and outstanding factual
questions, and [the publicity plan](docs/PUBLICITY-PLAN.md) for profile drafts,
deployment checks and search/AI measurement instructions.
