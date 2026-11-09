# Omnicord Documentation

The official documentation site for **Omnicord**, the ultimate Ben 10 themed Discord bot.
It lists every command, with usage, subcommands, examples and tips, so you never get lost using the bot.

**Live site:** https://docs.omnicord.site

[Support Server](https://discord.gg/bHDYB6MW5Y) • [Donate](https://ko-fi.com/omnicord)

---

## Tech Stack

- [Next.js](https://nextjs.org) (App Router) with [Static Export](https://nextjs.org/docs/app/guides/static-exports)
- [Fumadocs](https://fumadocs.dev) (UI, MDX and search)
- [Tailwind CSS v4](https://tailwindcss.com)
- Hosted on [Cloudflare](https://www.cloudflare.com), deployed automatically from GitHub

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

To produce the static site:

```bash
npm run build
```

The output goes to `out/`.

## Project Structure

```
fumadocs/
├─ app/
│  ├─ layout.tsx                 Root layout, fonts, site metadata
│  ├─ global.css                 Theme colors and styling
│  ├─ docs/                      Docs layout and pages
│  │  └─ [[...slug]]/page.tsx    Renders every docs page
│  ├─ embed/[[...slug]]/route.ts Static Discord embed JSON for each page
│  └─ api/search/route.ts        Search route handler
├─ components/                   Custom components (breadcrumb, search, MDX)
├─ content/docs/                 All documentation content (MDX)
│  ├─ getting-started/
│  └─ commands/
│     ├─ combat/
│     ├─ economy/
│     └─ ...
├─ lib/
│  ├─ source.ts                  Content source adapter
│  ├─ shared.ts                  Shared helpers and git config
│  └─ embed.ts                   Discord embed builder and breadcrumbs
└─ next.config.mjs
```

## Writing Docs

Every page is an `.mdx` file under `content/docs/`. Commands live in
`content/docs/commands/<category>/<command>.mdx`.

### Frontmatter

```mdx
---
title: .auction
description: List, bid on, and manage auctions for aliens and items with a full auction house system.
---
```

The `title` and `description` are used for the page header, search, SEO tags and
the Discord embed, so keep the description to one or two sentences (it is
trimmed to 400 characters in the embed).

### Adding a command

1. Create `content/docs/commands/<category>/<command>.mdx`.
2. Add the file name (without `.mdx`) to `pages` in that category's `meta.json`.
3. Run `npm run dev` and check the page and sidebar.

### Adding a category

1. Create a folder in `content/docs/commands/<category>/`.
2. Add an `index.mdx` (the category overview) and a `meta.json`:

```json
{
  "title": "Combat",
  "icon": "Swords",
  "pages": ["index", "arena", "battle"]
}
```

3. Add the folder name to `pages` in `content/docs/commands/meta.json`.

## Discord Link Previews

Pages use [Discord component embeds](https://docs.discord.com/developers/link-previews/component-embeds)
so links to the docs show a custom preview with the breadcrumb, title, description,
support links and page image.

How it works:

- `lib/embed.ts` builds the embed payload for a page (`buildEmbed`).
- `app/embed/[[...slug]]/route.ts` exports each payload as static JSON at
  `/embed/<page-path>/data.json` during the build.
- `app/docs/[[...slug]]/page.tsx` adds `<link rel="discord:component-embed">`
  pointing to that file in the page `<head>`.

Notes:

- Custom emoji IDs (`<:docs:...>`, `<:admin:...>`, and so on) are set in `lib/embed.ts`.
- Discord limits the payload to 3,000 bytes.
- Discord caches previews. When testing, add a new `?v=1`, `?v=2`, and so on to the link,
  and use the [Embed Debugger](https://discord.com/developers/embeds).
- Open Graph tags are set in `app/layout.tsx` as a fallback.

## Theming

Colors are defined as CSS variables in `app/global.css` (`--color-fd-*`) for both
light and dark mode. Edit those to change the look of the site. The font is Inter,
configured in `app/layout.tsx`.

## Contributing

Found a mistake or a missing command? Pull requests are welcome.

1. Fork the repo and create a branch.
2. Make your changes and run `npm run build` to check that it passes.
3. Open a pull request describing what changed.

You can also use the **Edit on GitHub** option on any docs page, or ask in the
[Support Server](https://discord.gg/bHDYB6MW5Y).

## Links

- Website: https://omnicord.site
- Docs: https://docs.omnicord.site
- Support: https://discord.gg/bHDYB6MW5Y
- Donate: https://ko-fi.com/omnicord