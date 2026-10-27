# Muhammad Hashir — Portfolio

A dark, film-grain portfolio for full-stack developer **Muhammad Hashir**
(GitHub: [mateir0](https://github.com/mateir0)), serving clients who buy
paid website/software builds and employers hiring remote full-stack developers.

## Stack

- **Next.js 15** (App Router) + **TypeScript** (strict)
- **Tailwind CSS v4**
- **Lenis** smooth scroll + **GSAP** (ScrollTrigger)
- Custom lightweight `<canvas>` film-grain + reveal engine (no Three.js, no WebGL)

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

## Content

All site copy lives in **`src/data/content.ts`** — editing that one file updates
the whole site (person, statements, projects, lab, services, record log, socials,
metadata).