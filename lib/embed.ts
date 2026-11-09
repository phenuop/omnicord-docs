import { source } from '@/lib/source';
import { getPageImageUrl } from '@/lib/shared';

export const SITE = 'https://docs.omnicord.site';

export type Segment = { title: string; url?: string };

export function buildBreadcrumbTrail(
  page: ReturnType<typeof source.getPage>
): Segment[] {
  if (!page) return [];

  const segments: Segment[] = [];
  const tree = source.pageTree;
  let nodes: any[] = tree.children;
  const urlParts = page.url.split('/').filter(Boolean);

  for (let i = 0; i < urlParts.length; i++) {
    const currentPart = '/' + urlParts.slice(0, i + 1).join('/');

    const match = nodes.find(
      (n: any) =>
        n.url === currentPart ||
        n.$ref?.folder === urlParts.slice(0, i + 1).join('/')
    );

    if (match) {
      segments.push({
        title: match.name,
        url: i === urlParts.length - 1 ? undefined : match.url,
      });
      if (match.children) nodes = match.children;
    }
  }
  if (segments.length === 0) {
    return [{ title: page.data.title }];
  }
  const last = segments[segments.length - 1];
  if (last.title !== page.data.title) {
    segments[segments.length - 1] = { title: page.data.title };
  }

  return segments;
}

export function embedJsonUrl(slugs: string[] = []) {
  return `${SITE}/embed${slugs.length ? '/' + slugs.join('/') : ''}/data.json`;
}

export function buildEmbed(page: NonNullable<ReturnType<typeof source.getPage>>) {
  const trail = buildBreadcrumbTrail(page).map((s) => s.title);
  const breadcrumb = ['Omnicord', ...trail].join(' > ');
  const link = `${SITE}${page.url}`;
  const description = (page.data.description ?? '').slice(0, 400);
  const image = new URL(getPageImageUrl(page).url, SITE).toString();

  return {
    component: {
      type: 17,
      accent_color: 5793266,
      components: [
        {
          type: 10,
          content:
            `-# <:admin:1568888770546372649>  ${breadcrumb}\n` +
            `<:docs:1569000806932287568>[Omnicord Documentation - ${page.data.title}](${link})\n` +
            description,
        },
        { type: 14, spacing: 1 },
        {
          type: 10,
          content:
            '-# <:discordlogo:1568996206338904128>[Support](https://discord.gg/bHDYB6MW5Y) • <:kofi:1568997776635727923>[Donate](https://ko-fi.com/omnicord)',
        },
        { type: 12, items: [{ media: { url: image } }] },
      ],
    },
  };
}